import { UserInfo } from "@/components/custom/user-info";
import { CurrentUser } from "@/lib/current-user";

const DashboardPage = async () => {
  const user = await CurrentUser();
  return (
    <div className="">
      <p>{user?.name}</p>
      <p>
        <UserInfo />
      </p>
    </div>
  );
};

export default DashboardPage;
