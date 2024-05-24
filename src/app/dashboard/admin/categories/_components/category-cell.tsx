"use client";

import { useTransition } from "react";
import { CategoryTypes } from "./category-columns";
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

interface CategoryCellProps {
  data: CategoryTypes;
}
export const CategoryCell = ({ data }: CategoryCellProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const DeleteCategory = (id: string) => {
    startTransition(() => {
      DeleteCategoryAction(id).then((data) => {
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
        <DropdownMenuLabel>Category Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-x-1 cursor-pointer">
          <Link
            href={`/dashboard/categories/${data.id}`}
            className="flex items-center gap-x-1 cursor-pointer"
          >
            <Edit className="h-4 w-4" /> Edit Category
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-x-1 cursor-pointer"
          asChild
        >
          <DeleteModal
            id={data.id}
            title={data.title}
            onDelete={DeleteCategory}
          >
            <Button variant={"destructive"} disabled={isPending} size={"sm"}>
              <Trash className="mr-2 h-4 w-4" />
              Delete Category
            </Button>
          </DeleteModal>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
