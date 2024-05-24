import menu from "./user-menu.json";
import { DashboardHome } from "./dashboard-home";
import { UserMenuItems } from "./UserMenuItems";
export const UserDashboardMenu = () => {
  return (
    <div className="flex flex-col gap-y-4 mr-3">
      <DashboardHome />
      {menu.map((item) => (
        <UserMenuItems href={item.url} name={item.name} key={item.url} />
      ))}
    </div>
  );
};
