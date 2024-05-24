import { CurrentUserRole } from "@/lib/current-user";
import { AdminPage } from "./admin/_components/admin-page";
import { UserDashboardPage } from "./(user)/_components/user-page";

const DashboardPage = async () => {
  const userRole = await CurrentUserRole();
  return (
    <div className="text-xl md:text-2xl lg:text-3xl">
      {userRole === "USER" && <UserDashboardPage />}
      {userRole === "ADMIN" && <AdminPage />}
    </div>
  );
};

export default DashboardPage;
