import menu from "@/app/dashboard/admin/_components/admin-menu.json";
import { AdminMenuItems } from "./AdminMenuItems";
import { DashboardHome } from "./dashboard-home";
export const DashboardHomeMenu = () => {
  return (
    <div className="flex flex-col gap-y-4 mr-3">
      <DashboardHome />
      {menu.map((item) => (
        <AdminMenuItems href={item.url} name={item.name} key={item.url} />
      ))}
    </div>
  );
};
