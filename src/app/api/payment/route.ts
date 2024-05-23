import { CurrentUser } from "@/lib/current-user";
import { OrderData } from "@/lib/order-data";
import { prismaDb } from "@/lib/prismaDb";
import { stripe } from "@/lib/stripe";
import { AddToCart } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await CurrentUser();
    const userId = currentUser?.id as string;
    if (!currentUser) {
      return new NextResponse("Unauthorize User", { status: 401 });
    }
    const body = await req.json();
    const { data } = body;
    if (!data || data.length === 0) {
      return new NextResponse("Product is required", { status: 400 });
    }
    const createOrder = (await OrderData(data)) as any;

    // Find is login customer is in list?
    let stripeCustomer = await prismaDb.stripeCustomer.findUnique({
      where: {
        userId,
      },
      select: { stripeCustomerId: true },
    });
    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: currentUser.email!,
      });
      stripeCustomer = await prismaDb.stripeCustomer.create({
        data: {
          userId,
          stripeCustomerId: customer.id,
        },
      });
    }
    const paymantIntent = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      mode: "payment",
      line_items: data.map((item: AddToCart) => ({
        quantity: item.quantity,
        price_data: {
          currency: "USD",
          unit_amount: item.price * 100,
          product_data: {
            name: item.title,
          },
        },
      })),

      success_url: `${process.env.NEXT_PUBLIC_URL}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL_FUCK}`,
      metadata: {
        ids: JSON.stringify(createOrder.map((item: any) => ({ id: item }))),
      },
    });
    return NextResponse.json({ url: paymantIntent.url });
  } catch (error) {
    console.error("Error updating quantity:", error);
    return NextResponse.json({ msg: "error" });
  }
}
