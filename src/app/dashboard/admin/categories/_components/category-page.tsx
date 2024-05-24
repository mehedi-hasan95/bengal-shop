import { DataTable } from "@/components/common/data-table";
import { CategoryTypes, categoryColumns } from "./category-columns";

interface CategoryPageProps {
  data: CategoryTypes[];
}
export const CategoryTable = ({ data }: CategoryPageProps) => {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={categoryColumns} data={data} searchKey="title" />
    </div>
  );
};
