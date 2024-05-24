"use server";
import { CurrentUserRole } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { BrandSchema } from "@/schema/admin-schema/admin-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const CreateBrandAction = async (
  values: z.infer<typeof BrandSchema>
) => {
  try {
    const currentUser = await CurrentUserRole();
    if (currentUser !== "ADMIN") return { error: "Unauthorize user" };
    const validateField = BrandSchema.safeParse(values);
    if (!validateField.success) return { error: "Something went wrong" };
    await prismaDb.brand.create({
      data: values,
    });
    revalidatePath("/");
    revalidatePath("/dashboard/admin/brands");
    return { success: "Brand Created Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const UpdateBrandAction = async (
  values: z.infer<typeof BrandSchema>,
  id: string
) => {
  try {
    const currentUser = await CurrentUserRole();
    if (currentUser !== "ADMIN") return { error: "Unauthorize user" };
    const validateField = BrandSchema.safeParse(values);
    if (!validateField.success) return { error: "Something went wrong" };
    await prismaDb.brand.update({
      where: { id },
      data: {
        ...values,
      },
    });
    revalidatePath("/");
    revalidatePath("/dashboard/admin/brands");
    return { success: "Brand Updated Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const DeleteBrandAction = async (id: string) => {
  try {
    const currentUser = await CurrentUserRole();
    if (currentUser !== "ADMIN") return { error: "Unauthorize user" };
    await prismaDb.brand.delete({
      where: { id },
    });
    revalidatePath("/");
    revalidatePath("/dashboard/admin/brands");
    return { success: "Brands Delete Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const GetAllBrandAction = async () => {
  const data = await prismaDb.brand.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};

// Find brands
export const GetBrandProductCountAction = async () => {
  const data = await prismaDb.brand.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      title: "asc",
    },
  });
  return data;
};

export const GetSingleBrandProducts = async (slug: string) => {
  try {
    const data = await prismaDb.products.findMany({
      where: {
        brandId: slug,
      },
      include: {
        image: true,
      },
      orderBy: {
        title: "asc",
      },
    });
    return data;
  } catch (error) {
    return null;
  }
};
