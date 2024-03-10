"use client";

import { useTransition } from "react";
import { HeroCarousel } from "./hero-columns";
import { useOrigin } from "@/hooks/use-origin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit3, Eye, MoreHorizontal, Trash } from "lucide-react";
import Link from "next/link";
import { DeleteModal } from "@/components/common/delete-modal";
import { DeleteHeroCarouselAction } from "@/actions/admin-action/hero-carousel-action";

interface HeroCellProps {
  data: HeroCarousel;
}
export const HeroCell: React.FC<HeroCellProps> = ({ data }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const origin = useOrigin();
  const url = `${origin}/shop/${data.id}`;
  const onCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success(`${url} is copied`);
  };

  //   Delete
  const HandleDelete = (id: string) => {
    startTransition(() => {
      DeleteHeroCarouselAction(id).then((data) => {
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
        <DropdownMenuLabel>Hotel Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-x-1 cursor-pointer"
          onClick={onCopy}
        >
          <Copy className="h-4 w-4" />
          <p>Hotel Link</p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={`/shop/${data.id}`}
            className="flex items-center gap-x-1 cursor-pointer"
          >
            <Eye className="h-4 w-4" /> View Hotel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-x-1 cursor-pointer">
          <Link
            href={`/dashboard/hero/${data.id}`}
            className="flex items-center gap-x-1 cursor-pointer"
          >
            <Edit3 className="h-4 w-4" /> Edit Hotel
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-x-1 cursor-pointer"
          asChild
        >
          <DeleteModal id={data.id} title={data.title} onDelete={HandleDelete}>
            <Button variant={"destructive"} disabled={isPending} size={"sm"}>
              <Trash className="mr-2 h-4 w-4" />
              Delete Hotel
            </Button>
          </DeleteModal>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
