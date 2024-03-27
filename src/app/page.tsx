import { GetAllBrandAction } from "@/actions/admin-action/admin-brand-action";
import { GetAllCategoryAction } from "@/actions/admin-action/admin-category-action";
import { GetAllHeroCarouselAction } from "@/actions/admin-action/hero-carousel-action";
import { BuyGetOfferAction } from "@/actions/admin-action/offer-action";
import { GetAllWishlistAction } from "@/actions/user-action/add-to-wishlist-action";
import { EmblaPage } from "@/components/carousel/emabl-page";
import { SingleProduct } from "@/components/common/product-component/single-product";
import { HomeCarousel } from "@/components/home-page/home-carousel";
import { PopulerBrands } from "@/components/home-page/populer-brands";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const data = await GetAllHeroCarouselAction();
  const cat = await GetAllCategoryAction();
  const product = await BuyGetOfferAction();
  const brands = await GetAllBrandAction();
  const wish = await GetAllWishlistAction();
  return (
    <main className="">
      <HomeCarousel data={data} />
      <EmblaPage data={cat} />
      <div className="container mx-auto px-6">
        <h2 className="font-semibold text-lg md:text-xl lg:text-2xl pb-5">
          Deals of the Week
          <Separator />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {product.map((item) => (
            <SingleProduct key={item.id} item={item} wish={wish} />
          ))}
        </div>
      </div>
      <div className="container mx-auto px-6 py-10">
        <h2 className="font-semibold text-lg md:text-xl lg:text-2xl pb-5">
          Populer Brands
          <Separator className="my-2" />
        </h2>
        <PopulerBrands brands={brands} />
      </div>
    </main>
  );
}
