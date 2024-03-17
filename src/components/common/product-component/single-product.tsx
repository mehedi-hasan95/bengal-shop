"use client";

import { AddToCartAction } from "@/actions/user-action/add-to-cart-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatter } from "@/lib/utils";
import { ProductImage, Products } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface SingleProductProps {
  item: Products & { image: ProductImage[] };
}
export const SingleProduct = ({ item }: SingleProductProps) => {
  const [isPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const onClick = (id: string) => {
    startTransition(() => {
      const values = {
        productId: id,
        quantity: quantity,
        price: item.price,
        offer: item.offer,
        title: item.title,
        image: item.image[0].url,
      };
      AddToCartAction(values as any).then((data) => {
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
    <div key={item.id} className="relative">
      <div className="relative group">
        <Image
          src={item.image[0]?.url}
          alt={item.title}
          height={500}
          width={500}
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 hover:opacity-100 flex justify-center items-center flex-col">
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
            onClick={() => onClick(item.id)}
            variant={"ghost"}
            className="bg-theme border-none outline-none text-white hover:text-black"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="absolute top-3 right-2 z-40">
        <Badge>{((item?.basePrice as any) / item.price).toFixed(2)} %</Badge>
      </div>
      <div className="text-center">
        <p>Rattings</p>
        <h4 className="text-xl font-medium">{item.title}</h4>
        <div className="flex gap-2 items-center justify-center">
          <h4 className="text-lg font-medium">
            {formatter.format(item.price)}
          </h4>{" "}
          <h4 className="text-lg font-medium line-through">
            {formatter.format(item.basePrice as number)}
          </h4>
        </div>
      </div>
    </div>
  );
};
