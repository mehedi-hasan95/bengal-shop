import { GetAllCategoryAction } from "@/actions/admin-action/admin-category-action";
import { GetAllHeroCarouselAction } from "@/actions/admin-action/hero-carousel-action";
import { EmblaPage } from "@/components/carousel/emabl-page";
import { HomeCarousel } from "@/components/home-page/home-carousel";

export default async function Home() {
    const data = await GetAllHeroCarouselAction();
    const cat = await GetAllCategoryAction();
    return (
        <main className="">
            <HomeCarousel data={data} />
            <EmblaPage data={cat} />
        </main>
    );
}
