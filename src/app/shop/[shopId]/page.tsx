import { GetSingleProductAction } from "@/actions/admin-action/admin-product-action";
import { AddToCartButton } from "@/components/common/add-to-cart-button";
import { ImageTabs } from "@/components/common/product-component/image-tabs";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import ProductNotFound from "../_components/product-not-found";

const SinglePage = async ({ params }: { params: { shopId: string } }) => {
  const data = await GetSingleProductAction(params.shopId);
  if (!data) {
    return <ProductNotFound />;
  }
  return (
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ImageTabs images={data?.image as any} />
        </div>
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
            {data?.title}
          </h2>
          {/* Rattings to do  */}
          <p>Ratings to do</p>
          <div className="flex gap-2 items-center py-5">
            <h4 className="text-lg font-medium line-through">
              {formatter.format(data?.basePrice as number)}
            </h4>
            <h4 className="text-lg font-medium">
              {formatter.format(data?.price as number)}
            </h4>
          </div>
          <div>
            <AddToCartButton item={data as any} />
          </div>
          <Separator className="my-3" />
          <p>CATEGORY: {data?.category.title}</p>
          <p>BRAND: {data?.brand.title}</p>
        </div>
      </div>
      <Separator className="my-4" />
      <p>{data?.desc}</p>
    </div>
  );
};

export default SinglePage;
