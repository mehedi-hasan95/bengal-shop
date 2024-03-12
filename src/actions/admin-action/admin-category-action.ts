"use server";
import { CurrentUserRole } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { CategorySchema } from "@/schema/admin-schema/admin-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateCategoryAction = async (
  values: z.infer<typeof CategorySchema>
) => {
  try {
    const currentUser = await CurrentUserRole();
    if (currentUser !== "ADMIN") return { error: "Unauthorize user" };
    const validateField = CategorySchema.safeParse(values);
    if (!validateField.success) return { error: "Something went wrong" };
    await prismaDb.category.create({
      data: values,
    });
    revalidatePath("/");
    revalidatePath("/dashboard/categories");
    return { success: "Category Created syccessfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const UpdateCategoryAction = async (
  values: z.infer<typeof CategorySchema>,
  id: string
) => {
  try {
    const currentUser = await CurrentUserRole();
    if (currentUser !== "ADMIN") return { error: "Unauthorize user" };
    const validateField = CategorySchema.safeParse(values);
    if (!validateField.success) return { error: "Something went wrong" };
    await prismaDb.category.update({
      where: { id },
      data: {
        ...values,
      },
    });
    revalidatePath("/");
    revalidatePath("/dashboard/categories");
    return { success: "Category Updated syccessfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const DeleteCategoryAction = async (id: string) => {
  try {
    const currentUser = await CurrentUserRole();
    if (currentUser !== "ADMIN") return { error: "Unauthorize user" };
    await prismaDb.category.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/dashboard/categories");
    return { success: "Category Delete syccessfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const GetAllCategoryAction = async () => {
  const data = await prismaDb.category.findMany({
    orderBy: {
      title: "asc",
    },
  });
  return data;
};
