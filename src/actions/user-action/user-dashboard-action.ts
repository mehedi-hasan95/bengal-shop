import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";

interface GraphData {
  name: string;
  total: number;
}
export const UserTotalRevenueAction = async () => {
  try {
    const currentUser = await CurrentUser();
    const paidOrders = await prismaDb.order.findMany({
      where: {
        userId: currentUser?.id,
        paid: true,
      },
    });
    // Calculate the revenue
    const TotalRevenue = paidOrders.reduce((total, order) => {
      return total + order.price;
    }, 0);

    // Sales count
    const SalesCount = await prismaDb.order.count({
      where: {
        userId: currentUser?.id,
        paid: true,
      },
    });

    // Revenue Graph
    const monthlyRevenue: { [key: number]: number } = {};
    for (const order of paidOrders) {
      const month = order.createdAt.getMonth();
      let revenueForOrder = 0;
      revenueForOrder += order.price;

      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    const MonthlyGraphData: GraphData[] = [
      { name: "Jan", total: 0 },
      { name: "Feb", total: 0 },
      { name: "Mar", total: 0 },
      { name: "Apr", total: 0 },
      { name: "May", total: 0 },
      { name: "Jun", total: 0 },
      { name: "Jul", total: 0 },
      { name: "Aug", total: 0 },
      { name: "Sep", total: 0 },
      { name: "Oct", total: 0 },
      { name: "Nov", total: 0 },
      { name: "Dec", total: 0 },
    ];
    for (const month in monthlyRevenue) {
      MonthlyGraphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
    }

    return { TotalRevenue, SalesCount, MonthlyGraphData };
  } catch (error) {
    return { TotalRevenue: 0, SalesCount: 0, MonthlyGraphData: [] };
  }
};
