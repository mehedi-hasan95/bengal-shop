import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { format } from "date-fns";
import { PurchaseData } from "./_components/purchase-data";

const UserPurchase = async () => {
  const data = await prismaDb.order.findMany({
    where: {
      paid: true,
    },
  });
  const formatData = data.map((item) => ({
    id: item.id,
    title: item.title,
    quantity: item.quantity,
    price: item.price,
    status: item.status,
    image: item.img,
    offer: item.offer,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <PurchaseData data={formatData as any} />
    </div>
  );
};

export default UserPurchase;
