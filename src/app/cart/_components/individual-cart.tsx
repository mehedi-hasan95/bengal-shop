"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCart } from "@prisma/client";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface IndividualCartProps {
  item: AddToCart;
}
export const IndividualCart = ({ item }: IndividualCartProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const price = quantity * item.price;

  return (
    <div className="flex gap-6 items-center mb-5">
      <Image
        src={item.image}
        alt={item.title}
        height={500}
        width={500}
        className="h-16 w-16"
      />
      <h4 className="md:text-xl w-1/3 line-clamp-1">{item.title}</h4>
      <div className="flex gap-2 items-center">
        <Button
          variant={"ghost"}
          onClick={() => {
            decreaseQuantity();
          }}
          className="bg-white p-0 h-8 w-8 rounded-full"
        >
          <Minus className="w-4" />
        </Button>
        <Badge variant="outline" className="bg-white text-xl font-bold">
          {quantity}
        </Badge>
        <Button
          variant={"ghost"}
          onClick={() => {
            increaseQuantity();
          }}
          className="bg-white p-0 h-8 w-8 rounded-full"
        >
          <Plus className="w-4" />
        </Button>
      </div>
      <p className="md:text-xl">
        Total Price: {quantity} x {item.price} = {price}
      </p>
    </div>
  );
};
