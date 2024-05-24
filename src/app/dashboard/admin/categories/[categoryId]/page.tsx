import { prismaDb } from "@/lib/prismaDb";
import { CategoryForm } from "../_components/category-form";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const data = await prismaDb.category.findUnique({
    where: { id: params.categoryId },
  });
  return (
    <div>
      <CategoryForm initialData={data} />
    </div>
  );
};

export default CategoryPage;
