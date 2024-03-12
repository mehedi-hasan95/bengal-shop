import { GetAllCategoryAction } from "@/actions/admin-action/admin-category-action";
import { TitleLabel } from "@/components/common/title-label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CategoryTable } from "./_components/category-page";

const AdminCategories = async () => {
  const data = await GetAllCategoryAction();
  return (
    <div>
      <div className="flex justify-between items-center">
        <TitleLabel label={`Total Categories (${data?.length})`} />
        <Link href={"/dashboard/categories/new"}>
          <Button>New Category</Button>
        </Link>
      </div>
      <CategoryTable data={data} />
    </div>
  );
};

export default AdminCategories;
