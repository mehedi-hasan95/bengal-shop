import { Account } from "./account";
import { Logo } from "./logo";
import { Search } from "./search";

export const PrimaryMenu = () => {
  return (
    <div className="container mx-auto px-6 flex justify-between items-center">
      <Logo />
      <Search />
      <Account />
    </div>
  );
};
