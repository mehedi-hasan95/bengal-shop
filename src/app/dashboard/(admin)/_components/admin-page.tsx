import { GetTotalRevenueAction } from "@/actions/admin-action/admin-dashboard-action";
import { DataCard } from "@/components/custom/data-card";
import { Separator } from "@/components/ui/separator";
import { Activity, CreditCard, DollarSign } from "lucide-react";
import { MonthlyRevenueChart } from "./monthly-revenue-chart";

export const AdminPage = async () => {
  const { TotalRevenue, SalesCount, TotalProduct, MonthlyGraphData } =
    await GetTotalRevenueAction();
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <DataCard
          label="Total Revenue"
          icon={DollarSign}
          value={TotalRevenue}
          shouldFormat
        />
        <DataCard
          label="Total Item Sale"
          icon={CreditCard}
          value={SalesCount}
        />
        <DataCard label="Total Product" icon={Activity} value={TotalProduct} />
      </div>
      <Separator className="my-5" />
      <MonthlyRevenueChart data={MonthlyGraphData} />
    </div>
  );
};
