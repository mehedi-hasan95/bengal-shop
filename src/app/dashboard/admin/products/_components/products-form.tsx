"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductSchema } from "@/schema/admin-schema/admin-schema";
import { FormInput } from "@/components/common/form-input";
import { ImageUpload } from "@/components/custom/image-upload";
import { Textarea } from "@/components/ui/textarea";
import {
  CreateProductAction,
  DeleteProductAction,
  UpdateProductAction,
} from "@/actions/admin-action/admin-product-action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Brand, Category, ProductImage, Products } from "@prisma/client";
import { TitleLabel } from "@/components/common/title-label";
import { DeleteModal } from "@/components/common/delete-modal";
import { Loader, Trash } from "lucide-react";

interface ProductsFormProps {
  indititalData: (Products & { image: ProductImage[] }) | null;
  categories: Category[];
  brands: Brand[];
}
export const ProductsForm = ({
  indititalData,
  categories,
  brands,
}: ProductsFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const title = indititalData ? "Update Product" : "Create Product";
  const action = indititalData ? "Update" : "Create";
  const afterAction = indititalData ? "Updating" : "Creating";
  // 1. Define your form.
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: indititalData?.title || "",
      desc: indititalData?.desc || "",
      basePrice: indititalData?.basePrice || undefined,
      price: indititalData?.price || undefined,
      quantity: indititalData?.quantity || undefined,
      offer: indititalData?.offer || undefined,
      categoryId: indititalData?.categoryId || undefined,
      brandId: indititalData?.brandId || undefined,
      image: indititalData?.image || [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ProductSchema>) {
    startTransition(() => {
      indititalData
        ? UpdateProductAction(values, indititalData.id).then((data) => {
            if (data.success) {
              toast.success(data.success);
              router.replace("/dashboard/admin/products");
            }
            if (data.error) {
              toast.error(data.error);
            }
          })
        : CreateProductAction(values).then((data) => {
            if (data.success) {
              toast.success(data.success);
              router.replace("/dashboard/admin/products");
            }
            if (data.error) {
              toast.error(data.error);
            }
          });
    });
  }
  const deleteProduct = (id: string) => {
    startTransition(() => {
      DeleteProductAction(id).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.replace("/dashboard/admin/products");
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <div className="py-5">
      <div className="flex justify-between items-center py-5">
        <TitleLabel label={title} />
        {indititalData && (
          <DeleteModal
            onDelete={deleteProduct}
            id={indititalData.id}
            title={indititalData.title}
          >
            <Button variant={"destructive"}>
              <Trash className="mr-2 h-4 w-4" />
              Delete Product
            </Button>
          </DeleteModal>
        )}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormInput
            form={form}
            label="Product Name"
            name="title"
            disabled={isPending}
            placeholder="Apple"
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    placeholder="Tell us a little bit about product"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-3 gap-4">
            <FormInput
              form={form}
              label="Base Price"
              name="basePrice"
              disabled={isPending}
              placeholder="10.00"
              type="number"
            />
            <FormInput
              form={form}
              label="Sale Price"
              name="price"
              disabled={isPending}
              placeholder="9.99"
              type="number"
            />
            <FormInput
              form={form}
              label="Product Quantity"
              name="quantity"
              disabled={isPending}
              placeholder="100"
              type="number"
            />
          </div>
          <FormField
            control={form.control}
            name="offer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Offer</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Have any offer?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BUY_ONE_GET_ONE">
                      Buy One Get One
                    </SelectItem>
                    <SelectItem value="SPECIAL_OFFERS">
                      Special Offeer
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem key={item.id} value={item.url}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Brand</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((item) => (
                        <SelectItem key={item.id} value={item.url}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Cloudinary  */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Add Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={isPending}
                    value={field.value.map((image) => image.url)}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {isPending ? (
            <Button disabled>
              {afterAction}
              <Loader className="ml-2 h-4 w-4 animate-spin" />
            </Button>
          ) : (
            <Button type="submit">{action}</Button>
          )}
        </form>
      </Form>
    </div>
  );
};
