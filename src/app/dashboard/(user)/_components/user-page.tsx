import { DataCard } from "@/components/custom/data-card";
import { Separator } from "@/components/ui/separator";
import { Activity, CreditCard, DollarSign } from "lucide-react";
import { MonthlyRevenueChart } from "@/components/custom/monthly-revenue-chart";
import { UserTotalRevenueAction } from "@/actions/user-action/user-dashboard-action";

export const UserDashboardPage = async () => {
  const { TotalRevenue, SalesCount, MonthlyGraphData } =
    await UserTotalRevenueAction();

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <DataCard
          label="Total Spend"
          icon={DollarSign}
          value={TotalRevenue}
          shouldFormat
        />
        <DataCard
          label="Total Item Purchase"
          icon={CreditCard}
          value={SalesCount}
        />
      </div>
      <Separator className="my-5" />
      <MonthlyRevenueChart
        data={MonthlyGraphData}
        label="Monthly Spend Statistics"
      />
    </div>
  );
};
