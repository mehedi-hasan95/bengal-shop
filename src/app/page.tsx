import { GetAllCategoryAction } from "@/actions/admin-action/admin-category-action";
import { GetAllProductAction } from "@/actions/admin-action/admin-product-action";
import { GetAllHeroCarouselAction } from "@/actions/admin-action/hero-carousel-action";
import { EmblaPage } from "@/components/carousel/emabl-page";
import { SingleProduct } from "@/components/common/product-component/single-product";
import { HomeCarousel } from "@/components/home-page/home-carousel";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const data = await GetAllHeroCarouselAction();
  const cat = await GetAllCategoryAction();
  const product = await GetAllProductAction();
  return (
    <main className="">
      <HomeCarousel data={data} />
      <EmblaPage data={cat} />
      <div className="container mx-auto px-6">
        <h2 className="font-semibold text-lg md:text-xl lg:text-2xl pb-5">
          Deals of the Week
          <Separator />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {product.map((item) => (
            <SingleProduct key={item.id} item={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
