import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { Order, Products } from "@prisma/client";

type OrderWithProduct = Order & {
  product: Products;
};

interface GraphData {
  name: string;
  total: number;
}
const groupByOrder = (orders: OrderWithProduct[]) => {
  const grouped: { [productTitle: string]: number } = {};
  orders.forEach((order) => {
    const productTtile = order.product.title;
    if (!grouped[productTtile]) {
      grouped[productTtile] = 0;
    }
    grouped[productTtile] += order.product.price;
  });
  return grouped;
};

export const ProductRevenueActon = async () => {
  try {
    const currentUser = await CurrentUser();
    const orders = await prismaDb.order.findMany({
      where: {
        product: {
          ownerId: currentUser?.id,
        },
        paid: true,
      },
      include: {
        product: true,
      },
    });
    const groupedEarnings = groupByOrder(orders);
    const ProductRevenueData = Object.entries(groupedEarnings).map(
      ([productTitle, total]) => ({
        name: productTitle,
        total,
      })
    );
    const AdminTotalRevenue = ProductRevenueData.reduce(
      (acc, curr) => acc + curr.total,
      0
    );
    const AdminTotalSale = orders.length;

    // Revenue Graph
    const monthlyRevenue: { [key: number]: number } = {};
    for (const order of orders) {
      const month = order.createdAt.getMonth();
      let revenueForOrder = 0;
      revenueForOrder += order.price;

      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
    }

    const AdminMonthlyGraphData: GraphData[] = [
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
      AdminMonthlyGraphData[parseInt(month)].total =
        monthlyRevenue[parseInt(month)];
    }

    // Total Products
    // Total Product
    const AdminTotalProduct = await prismaDb.products.count({
      where: {
        ownerId: currentUser?.id,
      },
    });
    return {
      ProductRevenueData,
      AdminTotalRevenue,
      AdminTotalSale,
      AdminMonthlyGraphData,
      AdminTotalProduct,
    };
  } catch (error) {
    return {
      ProductRevenueData: [],
      AdminMonthlyGraphData: [],
      AdminTotalRevenue: 0,
      AdminTotalSale: 0,
      AdminTotalProduct: 0,
    };
  }
};
