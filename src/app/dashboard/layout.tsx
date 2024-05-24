import { CurrentUserRole } from "@/lib/current-user";
import { DashboardHomeMenu } from "./admin/_components/DashboardHomeMenu";
import { UserDashboardMenu } from "./(user)/_components/user-dashboard-menu";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const userRole = await CurrentUserRole();
  return (
    <section className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="md:w-1/4 border-b md:border-b-0 md:border-r">
          {userRole === "ADMIN" ? <DashboardHomeMenu /> : <UserDashboardMenu />}
        </div>
        <div className="md:w-3/4">{children}</div>
      </div>
    </section>
  );
}
