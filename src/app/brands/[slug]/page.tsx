import { GetSingleBrandProducts } from "@/actions/admin-action/admin-brand-action";
import { GetAllWishlistAction } from "@/actions/user-action/add-to-wishlist-action";
import NotFound from "@/app/not-found";
import { SingleProduct } from "@/components/common/product-component/single-product";
import { Button } from "@/components/ui/button";
import { prismaDb } from "@/lib/prismaDb";
import Link from "next/link";

const CategorySlug = async ({ params }: { params: { slug: string } }) => {
  const brand = await prismaDb.brand.findUnique({
    where: {
      url: params.slug,
    },
  });
  const data = await GetSingleBrandProducts(params.slug);

  const wish = await GetAllWishlistAction();
  if (!brand) {
    return <NotFound />;
  }
  if (!data?.length) {
    return (
      <section className="flex items-center p-16 dark:bg-gray-50 dark:text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
          <div className="max-w-md text-center">
            <p className="text-2xl font-semibold md:text-3xl">
              Sorry, this Brand have no product.
            </p>
            <p className="mt-4 mb-8 dark:text-gray-600">
              But dont worry, you can find plenty of other things on our
              homepage.
            </p>
            <Link href={"/"}>
              <Button>Back to Homepage</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }
  return (
    <div className="container mx-auto px-6 grid md:grid-cols-3 lg:grid-cols-4 gap-5">
      {data?.map((item) => (
        <SingleProduct item={item} key={item.id} wish={wish} />
      ))}
    </div>
  );
};

export default CategorySlug;
