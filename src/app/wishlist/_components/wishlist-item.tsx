"use client";
import { DeleteWishListAction } from "@/actions/user-action/add-to-wishlist-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddToWishList } from "@prisma/client";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface WishListItemProps {
  wish: AddToWishList;
}
export const WishListItem = ({ wish }: WishListItemProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onDelete = () => {
    startTransition(() => {
      DeleteWishListAction(wish.productId).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.refresh();
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <Card>
      <Link href={`/shop/${wish.productId}`}>
        <CardHeader>
          <Image src={wish.image} alt={wish.title} height={500} width={500} />

          <CardTitle className="pt-4 line-clamp-2">{wish.title}</CardTitle>
        </CardHeader>
      </Link>
      <CardContent>
        <Button onClick={onDelete} disabled={isPending} variant={"outline"}>
          <Heart className="text-red-500 fill-red-500 h-5 w-5 mr-2" /> Added in
          WishList
        </Button>
      </CardContent>
    </Card>
  );
};
