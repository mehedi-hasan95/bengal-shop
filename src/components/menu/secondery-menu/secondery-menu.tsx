import { CategoryMenu } from "./category-menu";
import { SeconderyMenuList } from "./secondery-menu-list";
import { SpecialOffer } from "./special-offer";

export const SeconderyMenu = () => {
  return (
    <div className="container mx-auto px-6 py-5 flex justify-between items-center gap-x-5">
      <CategoryMenu />
      <SeconderyMenuList />
      <SpecialOffer />
    </div>
  );
};
