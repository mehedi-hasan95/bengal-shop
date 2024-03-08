import { CurrentUser } from "@/lib/current-user";
import { UserInfo } from "../custom/user-info";
import { CartButton } from "./cart-button";
import { WishList } from "./wish-list";
import { LoginButton } from "../auth/login-button";
import { Button } from "../ui/button";

export const Account = async () => {
  const currentUser = await CurrentUser();
  return (
    <div className="flex justify-between gap-6">
      <WishList />
      <CartButton />
      {currentUser ? (
        <UserInfo />
      ) : (
        <LoginButton>
          <Button variant="secondary">Login</Button>
        </LoginButton>
      )}
    </div>
  );
};
