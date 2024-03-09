"use client";

import { HeroSchema } from "@/schema/admin-schema/admin-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormInput } from "@/components/common/form-input";
import { ImageUpload } from "@/components/custom/image-upload";
export const HeroForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof HeroSchema>>({
    resolver: zodResolver(HeroSchema),
    defaultValues: {
      save: "",
      desc: "",
      image: "",
      link: "",
      title: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof HeroSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormInput
          form={form}
          label="Carousel Title"
          name="title"
          placeholder="Carousel Title"
        />
        <FormInput
          form={form}
          label="Carousel Description"
          name="desc"
          placeholder="Carousel Description"
        />
        <FormInput
          form={form}
          label="Page Link"
          name="link"
          type="url"
          placeholder="Page Link"
        />
        <FormInput
          form={form}
          label="How much save"
          name="save"
          placeholder="How much save"
        />
        {/* Image field  */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carousel Image</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
