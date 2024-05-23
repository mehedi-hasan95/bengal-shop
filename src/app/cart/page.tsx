import { GetIndividualCartAction } from "@/actions/user-action/add-to-cart-action";
import CartSummery from "./_components/cart-summery";

const CartPage = async () => {
  const data = await GetIndividualCartAction();

  return <CartSummery data={data} />;
};

export default CartPage;
