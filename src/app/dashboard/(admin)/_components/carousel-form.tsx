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
import { FormInput } from "@/components/common/form-input";
import { ImageUpload } from "@/components/custom/image-upload";
import { useTransition } from "react";
import {
  CreateHeroCarouselAction,
  UpdateHeroCarouselAction,
} from "@/actions/admin-action/hero-carousel-action";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { HeroCarousel } from "@prisma/client";
import { TitleLabel } from "@/components/common/title-label";

interface HeroFormProps {
  initianData: HeroCarousel | null;
}
export const HeroForm: React.FC<HeroFormProps> = ({ initianData }) => {
  const title = initianData ? "Update Carousel" : "Create Carousel";
  const action = initianData ? "Update" : "Create";
  const afterAction = initianData ? "Updateing" : "Creating";
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof HeroSchema>>({
    resolver: zodResolver(HeroSchema),
    defaultValues: initianData || {
      save: "",
      desc: "",
      image: "",
      link: "",
      title: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof HeroSchema>) {
    startTransition(() => {
      initianData
        ? UpdateHeroCarouselAction(values, initianData?.id).then((data) => {
            if (data.success) {
              toast.success(data.success);
            }
            if (data.error) {
              toast.error(data.error);
            }
          })
        : CreateHeroCarouselAction(values).then((data) => {
            if (data.success) {
              toast.success(data.success);
            }
            if (data.error) {
              toast.error(data.error);
            }
          });
    });
  }
  return (
    <div>
      <TitleLabel label={title} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormInput
            disabled={isPending}
            form={form}
            label="Carousel Title"
            name="title"
            placeholder="Carousel Title"
          />
          <FormInput
            disabled={isPending}
            form={form}
            label="Carousel Description"
            name="desc"
            placeholder="Carousel Description"
          />
          <FormInput
            disabled={isPending}
            form={form}
            label="Page Link"
            name="link"
            type="url"
            placeholder="Page Link"
          />
          <FormInput
            disabled={isPending}
            form={form}
            label="How much save"
            name="save"
            placeholder="How much save"
          />
          {/* Image field  */}
          <FormField
            disabled={isPending}
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carousel Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={isPending}
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isPending ? (
            <Button disabled>
              {afterAction} <Loader2 className="h-4 w-4 ml-2 animate-spin" />
            </Button>
          ) : (
            <Button type="submit">{action}</Button>
          )}
        </form>
      </Form>
    </div>
  );
};
