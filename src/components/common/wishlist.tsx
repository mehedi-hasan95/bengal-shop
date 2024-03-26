"use client";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductImage, Products } from "@prisma/client";
import { useTransition } from "react";
import { AddToWishListAction } from "@/actions/user-action/add-to-wishlist";
import { toast } from "sonner";

interface WishListProps {
  item: Products & { image: ProductImage[] };
}
export const WishList = ({ item }: WishListProps) => {
  const [isPending, startTransition] = useTransition();
  const data = {
    title: item.title,
    image: item.image[0].url,
    productId: item.id,
    price: item.price,
    offer: item.offer,
  };
  const onWishList = () => {
    startTransition(() => {
      AddToWishListAction(data as any).then((data) => {
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
        <Heart /> Add to WishList
      </Button>
    </div>
  );
};
