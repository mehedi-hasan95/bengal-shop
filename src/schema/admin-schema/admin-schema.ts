import { Offer } from "@prisma/client";
import * as z from "zod";

export const HeroSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required",
  }),
  desc: z
    .string()
    .min(2, {
      message: "Desc must be longer than 2 characters.",
    })
    .max(160, {
      message: "Desc must not be longer than 160 characters.",
    }),
  link: z.string().min(2, {
    message: "Link is required",
  }),
  save: z.string().min(1, {
    message: "Short Title",
  }),
  image: z.string().min(2, {
    message: "Image is required",
  }),
});

export const CategorySchema = z.object({
  title: z.string().min(2, {
    message: "Title is required",
  }),
  url: z.string().min(2, {
    message: "Link is required",
  }),
  image: z.string().min(2, {
    message: "Image is required",
  }),
});

export const BrandSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required",
  }),
  url: z.string().min(2, {
    message: "Link is required",
  }),
  image: z.string().min(2, {
    message: "Image is required",
  }),
});

export const ProductSchema = z.object({
  title: z.string().min(2, {
    message: "Product Name is required",
  }),
  desc: z.string().min(2, {
    message: "Description is required",
  }),
  basePrice: z.coerce
    .number()
    .min(1, {
      message: "Input Base price",
    })
    .optional(),
  price: z.coerce.number().min(1, {
    message: "Sale price is required",
  }),
  quantity: z.coerce.number().min(1, {
    message: "Product quantity is required",
  }),
  offer: z.enum([Offer.BUY_ONE_GET_ONE, Offer.SPECIAL_OFFERS]).optional(),
  categoryId: z.string(),
  brandId: z.string(),
  image: z.object({ url: z.string() }).array(),
});
