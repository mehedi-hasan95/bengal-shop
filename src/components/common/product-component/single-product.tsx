"use client";

import { AddToCartAction } from "@/actions/user-action/add-to-cart-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatter } from "@/lib/utils";
import { AddToWishList, ProductImage, Products } from "@prisma/client";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { ProductModal } from "./product-modal";
import { Minus, Plus } from "lucide-react";

interface SingleProductProps {
  item: Products & { image: ProductImage[] };
  wish: AddToWishList[] | null;
}
export const SingleProduct = ({ item, wish }: SingleProductProps) => {
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
          <Button
            disabled={isPending}
            onClick={() => addCart(item.id)}
            variant={"ghost"}
            className="bg-theme border-none outline-none text-white hover:text-black"
          >
            Add to Cart
          </Button>
        </div>

        {/* Modal  */}
        <div className="absolute bottom-3 z-40 w-full opacity-0 group-hover:opacity-100 group-hover:bg-theme">
          <ProductModal
            products={item}
            images={item.image}
            onCart={addCart}
            quantity={quantity}
            setQuantity={setQuantity as any}
            wish={wish}
          >
            <Button
              className="w-full hover:bg-theme_green text-white"
              variant={"ghost"}
            >
              View Details
            </Button>
          </ProductModal>
        </div>
      </div>
      <div className="absolute top-3 right-2 z-40">
        <Badge>
          -
          {(
            (((item?.basePrice as number) - item.price) /
              (item?.basePrice as number)) *
            100
          ).toFixed(0)}{" "}
          %
        </Badge>
      </div>
      <div className="text-center">
        <p>Rattings</p>
        <h4 className="text-xl font-medium">{item.title}</h4>
        <div className="flex gap-2 items-center justify-center">
          <h4 className="text-lg font-medium line-through">
            {formatter.format(item.basePrice as number)}
          </h4>
          <h4 className="text-lg font-medium">
            {formatter.format(item.price)}
          </h4>
        </div>
      </div>
    </div>
  );
};
