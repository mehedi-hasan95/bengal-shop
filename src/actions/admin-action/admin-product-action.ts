"use server";

import { CurrentUserRole } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { ProductSchema } from "@/schema/admin-schema/admin-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateProductAction = async (
  values: z.infer<typeof ProductSchema>
) => {
  try {
    const currentUser = await CurrentUserRole();
    if (currentUser !== "ADMIN") return { error: "Unauthorize user" };
    const validateField = ProductSchema.safeParse(values);
    if (!validateField.success) return { error: "Something went wrong" };
    const {
      title,
      desc,
      basePrice,
      price,
      quantity,
      offer,
      image,
      categoryId,
      brandId,
    } = validateField.data;
    await prismaDb.products.create({
      data: {
        title,
        desc,
        basePrice,
        price,
        quantity,
        offer,
        categoryId,
        brandId,
        image: {
          createMany: {
            data: [...image.map((image: { url: string }) => image)],
          },
        },
      },
    });
    revalidatePath("/");
    revalidatePath("/dashboard/products");
    return { success: "Product Created Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const UpdateProductAction = async (
  values: z.infer<typeof ProductSchema>,
  id: string
) => {
  try {
    const currentUser = await CurrentUserRole();
    if (currentUser !== "ADMIN") return { error: "Unauthorize user" };
    const validateField = ProductSchema.safeParse(values);
    if (!validateField.success) return { error: "Something went wrong" };
    const {
      title,
      desc,
      basePrice,
      price,
      quantity,
      offer,
      image,
      categoryId,
      brandId,
    } = validateField.data;
    await prismaDb.products.update({
      where: { id },
      data: {
        image: {
          deleteMany: {},
        },
      },
    });
    await prismaDb.products.update({
      where: { id },
      data: {
        title,
        desc,
        basePrice,
        price,
        quantity,
        offer,
        categoryId,
        brandId,
        image: {
          createMany: {
            data: [...image.map((image: { url: string }) => image)],
          },
        },
      },
    });
    revalidatePath("/");
    revalidatePath("/dashboard/products");
    return { success: "Product Updated Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const DeleteProductAction = async (id: string) => {
  try {
    const currentUser = await CurrentUserRole();
    if (currentUser !== "ADMIN") return { error: "Unauthorize user" };
    await prismaDb.products.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/dashboard/products");
    return { success: "Product Delete Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const GetAllProductAction = async () => {
  const data = await prismaDb.products.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      image: true,
    },
  });
  return data;
};

export const GetSingleProductAction = async (id: string) => {
  const data = await prismaDb.products.findUnique({
    where: {
      id,
    },
    include: {
      image: true,
      category: {
        select: {
          title: true,
        },
      },
      brand: {
        select: {
          title: true,
        },
      },
    },
  });
  return data;
};
