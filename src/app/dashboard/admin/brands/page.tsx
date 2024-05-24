import { TitleLabel } from "@/components/common/title-label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BrandTable } from "./_components/brand-table";
import { format } from "date-fns";
import { GetAllBrandAction } from "@/actions/admin-action/admin-brand-action";

const AdminCategories = async () => {
  const data = await GetAllBrandAction();
  const brandData = data.map((item) => ({
    id: item.id,
    title: item.title,
    url: item.url,
    image: item.image,
    createdAt: format(item.createdAt, "do MMMM, yyyy"),
  }));
  return (
    <div>
      <div className="flex justify-between items-center">
        <TitleLabel label={`Total Brands (${data?.length})`} />
        <Link href={"/dashboard/admin/brands/new"}>
          <Button>New Brand</Button>
        </Link>
      </div>
      <BrandTable data={brandData} />
    </div>
  );
};

export default AdminCategories;
