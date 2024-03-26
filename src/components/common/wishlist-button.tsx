"use client";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddToWishList, ProductImage, Products } from "@prisma/client";
import { useTransition } from "react";
import {
  AddToWishListAction,
  DeleteWishListAction,
} from "@/actions/user-action/add-to-wishlist-action";
import { toast } from "sonner";

interface WishListProps {
  item: Products & { image: ProductImage[] };
  wish: AddToWishList[] | null;
}
export const WishListButton = ({ item, wish }: WishListProps) => {
  const inList = wish?.find((list) => list.productId === item.id);
  const [isPending, startTransition] = useTransition();

  const onWishList = () => {
    const data = {
      title: item.title,
      image: item.image[0].url,
      productId: item.id,
      price: item.price,
      offer: item.offer || undefined,
    };
    startTransition(() => {
      inList
        ? DeleteWishListAction(item.id).then((data) => {
            if (data.success) {
              toast.success(data.success);
            }
            if (data.error) {
              toast.error(data.error);
            }
          })
        : AddToWishListAction(data as any).then((data) => {
            if (data.success) {
              toast.success(data.success);
            }
            if (data.error) {
              toast.error(data.error);
            }
          });
    });
  };
  return (
    <div>
      <Button
        onClick={onWishList}
        variant={"ghost"}
        className="p-0"
        disabled={isPending}
      >
        {inList ? (
          <>
            <Heart className="fill-red-500 text-red-500" /> Added In WishList
          </>
        ) : (
          <>
            <Heart /> Add to WishList
          </>
        )}
      </Button>
    </div>
  );
};
