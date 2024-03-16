import { DataTable } from "@/components/common/data-table";
import { ProductsColumns, ProductsTypes } from "./products-columns";

interface ProductsPageProps {
  data: ProductsTypes[];
}
export const ProductsTable = ({ data }: ProductsPageProps) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={ProductsColumns} data={data} searchKey="title" />
    </div>
  );
};
