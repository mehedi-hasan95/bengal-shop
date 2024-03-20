"use client";
import {
  DeleteIndividualCartAction,
  UpdateIndividualCartAction,
} from "@/actions/user-action/add-to-cart-action";
import { DeleteModal } from "@/components/common/delete-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddToCart } from "@prisma/client";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface IndividualCartProps {
  item: AddToCart;
}
export const IndividualCart = ({ item }: IndividualCartProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState(item.quantity);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    updateQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateQuantity(quantity - 1);
    }
  };
  const price = quantity * item.price;

  // Update existing cart
  const updateQuantity = (newQuantity: number) => {
    startTransition(() => {
      UpdateIndividualCartAction(item.id, newQuantity).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };

  // Delete single cart
  const deleteSingleCart = () => {
    startTransition(() => {
      DeleteIndividualCartAction(item.id).then((data) => {
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
    <div className="flex gap-6 items-center mb-5 justify-between">
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
          // disabled={isPending}
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
          // disabled={isPending}
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
      <DeleteModal onDelete={deleteSingleCart} id={item.id} title={item.title}>
        <Trash className="h-5 w-5 cursor-pointer" />
      </DeleteModal>
    </div>
  );
};
