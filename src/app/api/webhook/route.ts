import Stripe from "stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prismaDb } from "@/lib/prismaDb";
import { CurrentUser } from "@/lib/current-user";
import { revalidatePath } from "next/cache";

export const POST = async (req: NextRequest) => {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_KEY!
    );

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
      const currentUser = await CurrentUser();
      const orderData = JSON.parse(session?.metadata?.ids as string);
      const ids = orderData.map((order: any) => order.id);
      await prismaDb.order.updateMany({
        where: {
          id: { in: ids },
          userId: currentUser?.id,
        },
        data: {
          paid: true,
          paymentId: session.payment_intent as string,
        },
      });
      // Update add to product data
      const orderItems = await prismaDb.order.findMany({
        where: {
          id: { in: ids },
          userId: currentUser?.id,
        },
      });
      console.log(orderItems);
      for (const item of orderItems) {
        await prismaDb.products.update({
          where: {
            id: item.productId,
          },
          data: {
            sale: {
              increment: item.quantity,
            },
          },
        });
      }
      // Delete add to cart
      for (const item of orderItems) {
        await prismaDb.addToCart.deleteMany({
          where: {
            productId: item.productId,
            userId: currentUser?.id,
          },
        });
      }
    }
    revalidatePath("/");
    return new NextResponse("Order created", { status: 200 });
  } catch (err) {
    console.log("[webhooks_POST]", err);
    return new NextResponse("Failed to create the order", { status: 500 });
  }
};
