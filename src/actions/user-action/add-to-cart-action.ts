"use server";
import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { AddToCartSchema } from "@/schema/user-schema/user-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const AddToCartAction = async (
  values: z.infer<typeof AddToCartSchema>
) => {
  try {
    const currentUser = await CurrentUser();

    const validateField = AddToCartSchema.safeParse(values);
    if (!validateField.success) return { error: "Something went wrong" };
    const { price, productId, quantity, offer, title, image } =
      validateField.data;
    const totalPrice = price * quantity;
    await prismaDb.addToCart.create({
      data: {
        title,
        image,
        productId,
        quantity,
        price,
        totalPrice: totalPrice,
        offer,
        userId: currentUser?.id as string,
      },
    });
    revalidatePath("/cart");
    return { success: "Added to Cart Successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

// Individual User Cart

export const GetIndividualCartAction = async () => {
  const currentUser = await CurrentUser();
  if (!currentUser) {
    return null;
  }
  const data = await prismaDb.addToCart.findMany({
    where: {
      userId: currentUser.id,
    },
  });
  return data;
};

// Update Cart

export const UpdateIndividualCartAction = async (
  id: string,
  quantity: number
) => {
  try {
    const currentUser = await CurrentUser();
    await prismaDb.addToCart.update({
      where: {
        id,
        userId: currentUser?.id,
      },
      data: {
        quantity,
      },
    });
    revalidatePath("/cart");
    return { success: "Cart updated" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// Delete a perticuler cart
export const DeleteIndividualCartAction = async (id: string) => {
  try {
    const currentUser = await CurrentUser();
    await prismaDb.addToCart.delete({
      where: {
        id,
        userId: currentUser?.id,
      },
    });
    return { success: "Product delete successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
