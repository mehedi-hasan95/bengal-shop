import { prismaDb } from "@/lib/prismaDb";
import { ProductsForm } from "../_components/products-form";

const ProductsId = async ({ params }: { params: { productsId: string } }) => {
  const data = await prismaDb.products.findUnique({
    where: {
      id: params.productsId,
    },
    include: {
      image: true,
    },
  });
  return (
    <div>
      <ProductsForm indititalData={data} />
    </div>
  );
};

export default ProductsId;
