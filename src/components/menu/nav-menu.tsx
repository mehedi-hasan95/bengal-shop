import { PrimaryMenu } from "./primary-menu";
import { SeconderyMenu } from "./secondery-menu/secondery-menu";

export const NavMenu = () => {
  return (
    <div className="py-5">
      <PrimaryMenu />
      <SeconderyMenu />
    </div>
  );
};
