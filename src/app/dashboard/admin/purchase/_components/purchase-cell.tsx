import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { PurchaseTypes } from "./purchase-columns";

interface CategoryCellProps {
  data: PurchaseTypes;
}
export const PurchaseCell = ({ data }: CategoryCellProps) => {
  console.log(data);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Purchase Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-x-1 cursor-pointer">
          <Link
            href={`/dashboard/admin/purchase/${data.id}`}
            className="flex items-center gap-x-1 cursor-pointer"
          >
            <Edit className="h-4 w-4" /> Update Purchase
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
