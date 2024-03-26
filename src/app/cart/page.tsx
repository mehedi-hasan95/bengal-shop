import { GetIndividualCartAction } from "@/actions/user-action/add-to-cart-action";
import { IndividualCart } from "./_components/individual-cart";
import { TitleLabel } from "@/components/common/title-label";
import { Button } from "@/components/ui/button";
import { formatter } from "@/lib/utils";
import { Empty } from "@/components/common/empty";

const CartPage = async () => {
  const data = await GetIndividualCartAction();
  const totalPrice = data?.reduce((total, item) => {
    return total + Number(item.price * item.quantity);
  }, 0);

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
        <Button disabled={(totalPrice as number) < 1}>Checkout</Button>
      </div>
    </div>
  );
};

export default CartPage;
