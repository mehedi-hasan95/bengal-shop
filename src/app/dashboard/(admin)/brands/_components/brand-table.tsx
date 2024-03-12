import { DataTable } from "@/components/common/data-table";
import { BrandTypes, brandColumns } from "./brand-columns";

interface BrandTableProps {
  data: BrandTypes[];
}
export const BrandTable = ({ data }: BrandTableProps) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={brandColumns} data={data} searchKey="title" />
    </div>
  );
};
