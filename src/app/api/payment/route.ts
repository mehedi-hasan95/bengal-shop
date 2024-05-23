import { OrderData } from "@/lib/order-data";
import { stripe } from "@/lib/stripe";
import { AddToCart } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data } = body;
    const createOrder = (await OrderData(data)) as any;

    const paymantIntent = await stripe.checkout.sessions.create({
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
