"use client";

import { AddToCartAction } from "@/actions/user-action/add-to-cart-action";
import { ProductImage, Products } from "@prisma/client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { Badge } from "../ui/badge";

interface AddToCartProps {
  item: Products & { image: ProductImage[] };
}
export const AddToCartButton = ({ item }: AddToCartProps) => {
  const [isPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState<number>(1);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addCart = (id: string) => {
    startTransition(() => {
      const values = {
        productId: id,
        quantity: quantity,
        price: item.price,
        offer: item.offer || undefined,
        title: item.title,
        image: item.image[0].url,
      };
      AddToCartAction(values).then((data) => {
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
      <div className="flex gap-2 pb-5 items-center">
        <Button
          variant={"ghost"}
          onClick={decreaseQuantity}
          className="bg-white p-0 h-8 w-8 rounded-full"
        >
          <Minus className="w-4" />
        </Button>
        <Badge variant="outline" className="bg-white text-xl font-bold">
          {quantity}
        </Badge>
        <Button
          variant={"ghost"}
          onClick={increaseQuantity}
          className="bg-white p-0 h-8 w-8 rounded-full"
        >
          <Plus className="w-4" />
        </Button>
      </div>
      {/* Add to cart  */}

      <Button
        disabled={isPending}
        onClick={() => addCart(item.id)}
        variant={"ghost"}
        className="bg-theme border-none outline-none text-white hover:text-black"
      >
        Add to Cart
      </Button>
    </div>
  );
};
