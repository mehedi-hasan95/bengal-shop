"use server";
import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { AddToWishListSchema } from "@/schema/user-schema/user-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const AddToWishListAction = async (
  values: z.infer<typeof AddToWishListSchema>
) => {
  try {
    const currentUser = await CurrentUser();
    if (!currentUser) {
      return { error: "Please login first" };
    }
    const validateField = AddToWishListSchema.safeParse(values);
    if (!validateField.success) return { error: "Something went wrong" };
    const { image, price, productId, title, offer } = validateField.data;
    await prismaDb.addToWishList.create({
      data: {
        title,
        image,
        productId,
        price,
        offer,
        userId: currentUser?.id as string,
      },
    });
    revalidatePath("/wishlist");
    return { success: "Added to Wishlist Successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const GetAllWishlistAction = async () => {
  const currentUser = await CurrentUser();
  if (!currentUser) {
    return null;
  }
  const data = await prismaDb.addToWishList.findMany({
    where: {
      userId: currentUser.id,
    },
  });
  return data;
};

export const DeleteWishListAction = async (id: string) => {
  try {
    const currentUser = await CurrentUser();
    if (!currentUser) {
      return { error: "Please login first" };
    }
    await prismaDb.addToWishList.deleteMany({
      where: {
        productId: id,
        userId: currentUser.id,
      },
    });
    revalidatePath("/wishlist");
    return { success: "Remove from Wishlist Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
