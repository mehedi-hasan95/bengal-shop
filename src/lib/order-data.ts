import { AddToCart } from "@prisma/client";
import { CurrentUser } from "./current-user";
import { prismaDb } from "./prismaDb";

export async function OrderData(data: AddToCart[]) {
  try {
    const currentUser = await CurrentUser();
    const processedOrders = [];
    for (const item of data) {
      const processedOrder = await prismaDb.order.upsert({
        where: {
          cartId: item.id,
        },
        update: {
          quantity: item.quantity,
          productId: item.productId,
          userId: currentUser?.id as string,
          offer: item.offer,
          price: item.price,
          expires: new Date(new Date().getTime() + 3600 * 100),
          img: item.image,
        },
        create: {
          cartId: item.id,
          quantity: item.quantity,
          productId: item.productId,
          userId: currentUser?.id as string,
          offer: item.offer,
          price: item.price,
          expires: new Date(new Date().getTime() + 3600 * 100),
          title: item.title,
          img: item.image,
        },
      });
      processedOrders.push(processedOrder.id);
    }
    return processedOrders;
  } catch (error) {
    return { error: "none" };
  }
}
