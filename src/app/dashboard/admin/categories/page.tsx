import { GetAllCategoryAction } from "@/actions/admin-action/admin-category-action";
import { TitleLabel } from "@/components/common/title-label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CategoryTable } from "./_components/category-page";
import { format } from "date-fns";

const AdminCategories = async () => {
  const data = await GetAllCategoryAction();
  const categoryData = data.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.url,
    image: item.image,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <div className="flex justify-between items-center">
        <TitleLabel label={`Total Categories (${data?.length})`} />
        <Link href={"/dashboard/admin/categories/new"}>
          <Button>New Category</Button>
        </Link>
      </div>
      <CategoryTable data={categoryData} />
    </div>
  );
};

export default AdminCategories;
