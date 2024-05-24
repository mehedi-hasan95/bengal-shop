"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Card } from "@/components/ui/card";
import { Order } from "@prisma/client";
import { UpdateDeliveyStatus } from "@/schema/admin-schema/admin-schema";
import { useTransition } from "react";
import { UpdateDeliveryAction } from "@/actions/admin-action/update-delivery-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  initialData: Order | null;
}
export const DeliveryStatus = ({ initialData }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof UpdateDeliveyStatus>>({
    resolver: zodResolver(UpdateDeliveyStatus),
    defaultValues: {
      status: initialData?.status || undefined,
    },
  });
  function onSubmit(values: z.infer<typeof UpdateDeliveyStatus>) {
    startTransition(() => {
      UpdateDeliveryAction(values, initialData?.id as string).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.push("/dashboard/admin/purchase");
        } else {
          toast.error(data.error);
        }
      });
    });
  }
  return (
    <Card className="p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="ON_THE_WAY">On the Way</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
};
