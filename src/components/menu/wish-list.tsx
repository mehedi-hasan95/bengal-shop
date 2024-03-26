import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { GetAllWishlistAction } from "@/actions/user-action/add-to-wishlist-action";

export const WishList = async () => {
  const data = await GetAllWishlistAction();
  return (
    <Link href={"/wishlist"}>
      <Button variant={"ghost"} className="hover:bg-inherit relative p-0">
        <Heart className="h-5 w-5" />
        <div className="absolute -top-3 -right-5">
          <Badge variant={"destructive"}>{data ? data?.length : 0}</Badge>
        </div>
      </Button>
    </Link>
  );
};
