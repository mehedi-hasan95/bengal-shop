import { CurrentUser } from "@/lib/current-user";
import { prismaDb } from "@/lib/prismaDb";
import { format } from "date-fns";
import { PurchaseData } from "./_components/purchase-data";

const UserPurchase = async () => {
  const currentUser = await CurrentUser();
  if (!currentUser) {
    return { error: "Something went wrong" };
  }
  const data = await prismaDb.order.findMany({
    where: {
      paid: true,
      userId: currentUser.id,
    },
  });
  const formatData = data.map((item) => ({
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
