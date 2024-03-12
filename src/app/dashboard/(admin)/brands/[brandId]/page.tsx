import { prismaDb } from "@/lib/prismaDb";
import { BrandForm } from "../_components/brand-form";

const BrandIdPage = async ({ params }: { params: { brandId: string } }) => {
  const data = await prismaDb.brand.findUnique({
    where: { id: params.brandId },
  });
  return (
    <div>
      <BrandForm initialData={data} />
    </div>
  );
};

export default BrandIdPage;
