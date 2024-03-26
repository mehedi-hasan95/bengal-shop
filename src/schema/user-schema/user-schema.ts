import { Offer } from "@prisma/client";
import * as z from "zod";

export const AddToCartSchema = z.object({
  productId: z.string().min(2, {
    message: "productId Name is required",
  }),
  title: z.string().min(2, {
    message: "productId Name is required",
  }),
  image: z.string().min(2, {
    message: "productId Name is required",
  }),
  price: z.coerce.number().min(1, {
    message: "Sale price is required",
  }),
  quantity: z.coerce.number().min(1, {
    message: "Product quantity is required",
  }),
  offer: z.enum([Offer.BUY_ONE_GET_ONE, Offer.SPECIAL_OFFERS]).optional(),
});

export const AddToWishListSchema = z.object({
  productId: z.string().min(2, {
    message: "productId Name is required",
  }),
  title: z.string().min(2, {
    message: "productId Name is required",
  }),
  image: z.string().min(2, {
    message: "productId Name is required",
  }),
  price: z.coerce.number().min(1, {
    message: "Sale price is required",
  }),
  offer: z.enum([Offer.BUY_ONE_GET_ONE, Offer.SPECIAL_OFFERS]).optional(),
});
