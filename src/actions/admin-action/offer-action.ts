"use server";

import { prismaDb } from "@/lib/prismaDb";

export const SpecialOfferAction = async () => {
  const data = await prismaDb.products.findMany({
    where: {
      offer: "SPECIAL_OFFERS",
    },
    include: {
      image: true,
    },
  });
  return data;
};

export const BuyGetOfferAction = async () => {
  const data = await prismaDb.products.findMany({
    where: {
      offer: "BUY_ONE_GET_ONE",
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      image: true,
    },
  });
  return data;
};
