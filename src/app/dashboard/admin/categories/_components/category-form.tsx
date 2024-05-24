"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategorySchema } from "@/schema/admin-schema/admin-schema";
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
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import {
  CreateCategoryAction,
  DeleteCategoryAction,
  UpdateCategoryAction,
} from "@/actions/admin-action/admin-category-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Category } from "@prisma/client";
import { TitleLabel } from "@/components/common/title-label";
import { Loader2 } from "lucide-react";
import { DeleteModal } from "@/components/common/delete-modal";

interface CategoryFormProps {
  initialData: Category | null;
}
export const CategoryForm = ({ initialData }: CategoryFormProps) => {
  const title = initialData ? "Update Category" : "Create Category";
  const action = initialData ? "Update" : "Create";
  const afterAction = initialData ? "Updating" : "Createing";
  const router = useRouter();
  const [name, setName] = useState<string | null>("");
  const [isPending, startTransition] = useTransition();
  // 1. Define your form.
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: initialData || {
      title: "",
      image: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof CategorySchema>) {
    // Convert slug
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
    const slug = slugify(values.url as string);
    const data = {
      title: values.title,
      url: slug,
      image: values.image,
    };

    startTransition(() => {
      initialData
        ? UpdateCategoryAction(data, initialData.id).then((data) => {
            if (data.success) {
              toast.success(data.success);
              router.replace("/dashboard/admin/categories");
            }
            if (data.error) {
              toast.error(data.error);
            }
          })
        : CreateCategoryAction(data).then((data) => {
            if (data.success) {
              toast.success(data.success);
              router.replace("/dashboard/admin/categories");
            }
            if (data.error) {
              toast.error(data.error);
            }
          });
    });
  }

  const DeleteCategory = (id: string) => {
    startTransition(() => {
      DeleteCategoryAction(id).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.replace("/dashboard/admin/categories");
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <TitleLabel label={title} />
        {initialData && (
          <DeleteModal
            onDelete={DeleteCategory}
            id={initialData?.id as string}
            title={initialData?.title as string}
          >
            <Button>Delete Category</Button>
          </DeleteModal>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Category Title"
                    {...field}
                    defaultValue={initialData?.title}
                    value={setName(field.value) as any}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Url</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Category url"
                    {...field}
                    defaultValue={name as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Image field  */}
          <FormField
            disabled={isPending}
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
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
              {afterAction}
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button type="submit">{action}</Button>
          )}
        </form>
      </Form>
    </div>
  );
};
