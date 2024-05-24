import { DataCard } from "@/components/custom/data-card";
import { Separator } from "@/components/ui/separator";
import { Activity, CreditCard, DollarSign } from "lucide-react";
import { ProductRevenueActon } from "@/actions/admin-action/product-revenue-action";
import { MonthlyRevenueChart } from "@/components/custom/monthly-revenue-chart";

export const AdminPage = async () => {
  const {
    ProductRevenueData,
    AdminTotalRevenue,
    AdminTotalSale,
    AdminMonthlyGraphData,
    AdminTotalProduct,
  } = await ProductRevenueActon();

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <DataCard
          label="Total Revenue"
          icon={DollarSign}
          value={AdminTotalRevenue}
          shouldFormat
        />
        <DataCard
          label="Total Item Sale"
          icon={CreditCard}
          value={AdminTotalSale}
        />
        <DataCard
          label="Total Product"
          icon={Activity}
          value={AdminTotalProduct}
        />
      </div>
      <Separator className="my-5" />
      <MonthlyRevenueChart
        data={AdminMonthlyGraphData}
        label="Monthly Earning Statistics"
      />
      <Separator className="my-10 md:my-16" />
      <MonthlyRevenueChart
        data={ProductRevenueData}
        label="Product Earning Statistics"
      />
    </div>
  );
};
