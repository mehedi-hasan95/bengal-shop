import { FormatPrice } from "@/lib/format-price";
import { prismaDb } from "@/lib/prismaDb";
import Image from "next/image";
import { DeliveryStatus } from "../_components/delivery-status";

const PurchaseId = async ({ params }: { params: { purchaseId: string } }) => {
  const data = await prismaDb.order.findUnique({
    where: {
      id: params.purchaseId,
      paid: true,
    },
  });
  console.log(typeof data?.price);
  return (
    <div className="space-y-3">
      <Image src={data?.img || "/vercel.svg"} alt="" height={120} width={120} />
      <h2>
        <span className="font-semibold">Product Name: </span>
        {data?.title}
      </h2>
      <h2>
        <span className="font-semibold">Payment Id: </span>
        {data?.paymentId}
      </h2>
      <h2>
        <span className="font-semibold">Quantity: </span>
        {data?.quantity}
      </h2>
      <h2>
        <span className="font-semibold">Price: </span>
        {FormatPrice(data?.price || 0)}
      </h2>
      <DeliveryStatus initialData={data} />
    </div>
  );
};

export default PurchaseId;
