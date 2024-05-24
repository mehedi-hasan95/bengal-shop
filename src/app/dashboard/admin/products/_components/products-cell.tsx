"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { DeleteModal } from "@/components/common/delete-modal";
import { ProductsTypes } from "./products-columns";
import { DeleteProductAction } from "@/actions/admin-action/admin-product-action";

interface ProductCellProps {
  data: ProductsTypes;
}
export const ProductsCell = ({ data }: ProductCellProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const DeleteProduct = (id: string) => {
    startTransition(() => {
      DeleteProductAction(id).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.refresh();
        }
        if (data.error) {
          toast.error(data?.error);
        }
      });
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Products Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-x-1 cursor-pointer">
          <Link
            href={`/dashboard/admin/products/${data.id}`}
            className="flex items-center gap-x-1 cursor-pointer"
          >
            <Edit className="h-4 w-4" /> Edit Products
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-x-1 cursor-pointer"
          asChild
        >
          <DeleteModal id={data.id} title={data.title} onDelete={DeleteProduct}>
            <Button variant={"destructive"} disabled={isPending} size={"sm"}>
              <Trash className="mr-2 h-4 w-4" />
              Delete Product
            </Button>
          </DeleteModal>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
