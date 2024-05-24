"use server";
import { CurrentUserRole } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { UpdateDeliveyStatus } from "@/schema/admin-schema/admin-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const UpdateDeliveryAction = async (
  values: z.infer<typeof UpdateDeliveyStatus>,
  id: string
) => {
  try {
    const currentUser = await CurrentUserRole();
    if (currentUser !== "ADMIN") return { error: "Unauthorize user" };
    await prismaDb.order.update({
      where: {
        id,
      },
      data: {
        status: values.status,
      },
    });

    revalidatePath("/");
    revalidatePath("/dashboard/admin/purchase");
    return { success: "Delivery Status Update Successfully" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
