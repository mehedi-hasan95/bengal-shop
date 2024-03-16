import { TitleLabel } from "@/components/common/title-label";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "./_components/products-page";
import { GetAllProductAction } from "@/actions/admin-action/admin-product-action";
import { format } from "date-fns";
import { ProductsTypes } from "./_components/products-columns";
import { formatter } from "@/lib/utils";

const ProductsPage = async () => {
  const data = await GetAllProductAction();
  const productData = data.map((item) => ({
    id: item.id,
    title: item.title,
    // price: item.price,
    price: formatter.format(item.price),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <div className="flex justify-between items-center">
        <TitleLabel label={`Total Products (0)`} />
        <Link href={`/dashboard/products/new`}>
          <Button>Create Products</Button>
        </Link>
      </div>
      <ProductsTable data={productData} />
    </div>
  );
};

export default ProductsPage;
