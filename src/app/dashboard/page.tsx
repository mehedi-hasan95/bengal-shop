import { CurrentUserRole } from "@/lib/current-user";
import { AdminPage } from "./(admin)/_components/admin-page";

const DashboardPage = async () => {
  const userRole = await CurrentUserRole();
  return (
    <div className="text-xl md:text-2xl lg:text-3xl">
      {userRole === "ADMIN" && <AdminPage />}
    </div>
  );
};

export default DashboardPage;
