import { prismaDb } from "@/lib/prismaDb";
import { ProductsForm } from "../_components/products-form";
import { GetAllCategoryAction } from "@/actions/admin-action/admin-category-action";
import { GetAllBrandAction } from "@/actions/admin-action/admin-brand-action";

const ProductsId = async ({ params }: { params: { productsId: string } }) => {
  const data = await prismaDb.products.findUnique({
    where: {
      id: params.productsId,
    },
    include: {
      image: true,
    },
  });
  const categories = await GetAllCategoryAction();
  const brands = await GetAllBrandAction();
  return (
    <div>
      <ProductsForm
        indititalData={data}
        categories={categories}
        brands={brands}
      />
    </div>
  );
};

export default ProductsId;
