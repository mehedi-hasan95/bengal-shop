"use client";

import { useTransition } from "react";
import { BrandTypes } from "./brand-columns";
import { useRouter } from "next/navigation";
import { DeleteCategoryAction } from "@/actions/admin-action/admin-category-action";
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
import { DeleteBrandAction } from "@/actions/admin-action/admin-brand-action";

interface BrandCellProps {
  data: BrandTypes;
}
export const BrandCell = ({ data }: BrandCellProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const DeleteBrand = (id: string) => {
    startTransition(() => {
      DeleteBrandAction(id).then((data) => {
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
        <DropdownMenuLabel>Brand Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-x-1 cursor-pointer">
          <Link
            href={`/dashboard/categories/${data.id}`}
            className="flex items-center gap-x-1 cursor-pointer"
          >
            <Edit className="h-4 w-4" /> Edit Brand
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-x-1 cursor-pointer"
          asChild
        >
          <DeleteModal id={data.id} title={data.title} onDelete={DeleteBrand}>
            <Button variant={"destructive"} disabled={isPending} size={"sm"}>
              <Trash className="mr-2 h-4 w-4" />
              Delete Brand
            </Button>
          </DeleteModal>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
