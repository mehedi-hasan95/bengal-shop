import { CurrentUser } from "@/lib/current-user";

const DashboardPage = async () => {
  const currentUser = await CurrentUser();
  return (
    <div className="text-xl md:text-2xl lg:text-3xl">
      Howdy {currentUser?.name}
    </div>
  );
};

export default DashboardPage;
