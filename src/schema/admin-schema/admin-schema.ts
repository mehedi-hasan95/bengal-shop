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
    message: "Enter Discount",
  }),
  image: z.string().min(2, {
    message: "Image is required",
  }),
});
