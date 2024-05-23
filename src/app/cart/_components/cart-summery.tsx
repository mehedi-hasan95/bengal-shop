"use client";

import { TitleLabel } from "@/components/common/title-label";
import { Button } from "@/components/ui/button";
import { formatter } from "@/lib/utils";
import { Empty } from "@/components/common/empty";
import { AddToCart } from "@prisma/client";
import { IndividualCart } from "./individual-cart";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY!);
interface Props {
  data: AddToCart[] | null;
}
const CartSummery = ({ data }: Props) => {
  const totalPrice = data?.reduce((total, item) => {
    return total + Number(item.price * item.quantity);
  }, 0);

  const onCart = async () => {
    try {
      const fuck = { data };
      // const stripe = await stripePromise()
      const response = await fetch("/api/payment", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fuck),
      });

      const result = await response.json();
      if (result) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="container mx-auto px-6 grid grid-cols-3 gap-10">
      <div className="col-span-2">
        {!data?.length && <Empty title="No product in Cart" />}
        {data?.map((item) => (
          <IndividualCart item={item as any} key={item.id} />
        ))}
      </div>
      <div className="col-span-1">
        <TitleLabel label="Order Summery" />
        <h2 className="text-xl py-5">
          Total Price:{" "}
          <span className="font-bold">
            {formatter.format(totalPrice?.toFixed(2) as any)}
          </span>
        </h2>
        <Button onClick={onCart} disabled={(totalPrice as number) < 1}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummery;
