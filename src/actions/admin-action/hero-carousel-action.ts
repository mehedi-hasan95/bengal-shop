"use server";
import { CurrentUserRole } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { HeroSchema } from "@/schema/admin-schema/admin-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateHeroCarouselAction = async (
  values: z.infer<typeof HeroSchema>
) => {
  try {
    const userRole = await CurrentUserRole();
    if (userRole !== "ADMIN") return { error: "Unauthorize User" };
    const validateFields = HeroSchema.safeParse(values);
    if (!validateFields.success) return { error: "Something went wrong" };

    await prismaDb.heroCarousel.create({
      data: values,
    });
    revalidatePath("/");
    revalidatePath("/dashboard/admin/hero");
    return { success: "Hero Carousel Created Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const UpdateHeroCarouselAction = async (
  values: z.infer<typeof HeroSchema>,
  id: string
) => {
  try {
    const userRole = await CurrentUserRole();
    if (userRole !== "ADMIN") return { error: "Unauthorize User" };
    const validateFields = HeroSchema.safeParse(values);
    if (!validateFields.success) return { error: "Something went wrong" };
    await prismaDb.heroCarousel.update({
      where: {
        id,
      },
      data: {
        ...values,
      },
    });
    revalidatePath("/");
    revalidatePath("/dashboard/admin/hero");
    return { success: "Hero Carousel Update Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const DeleteHeroCarouselAction = async (id: string) => {
  try {
    const userRole = await CurrentUserRole();
    if (userRole !== "ADMIN") return { error: "Unauthorize User" };
    await prismaDb.heroCarousel.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
    revalidatePath("/dashboard/admin/hero");
    return { success: "Hero Carousel Delete Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const GetAllHeroCarouselAction = async () => {
  const data = await prismaDb.heroCarousel.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};
