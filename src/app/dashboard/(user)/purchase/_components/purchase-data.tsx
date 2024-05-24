import { DataTable } from "@/components/common/data-table";
import { PurchaseColumns, PurchaseTypes } from "./purchase-columns";

interface Props {
  data: PurchaseTypes[];
}
export const PurchaseData = ({ data }: Props) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={PurchaseColumns} data={data} searchKey="title" />
    </div>
  );
};
