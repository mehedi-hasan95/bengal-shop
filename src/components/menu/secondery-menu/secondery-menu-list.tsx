import menues from "@/utility/menu-list.json";
import { SeconderyMenuItem } from "./seconder-menu-item";
export const SeconderyMenuList = () => {
  return (
    <div className="flex gap-x-8 items-center">
      {menues.map((item) => (
        <SeconderyMenuItem href={item.url} name={item.name} key={item.id} />
      ))}
    </div>
  );
};
