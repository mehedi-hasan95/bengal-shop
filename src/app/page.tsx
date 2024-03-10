import { GetAllHeroCarouselAction } from "@/actions/admin-action/hero-carousel-action";
import { HomeCarousel } from "@/components/home-page/home-carousel";

export default async function Home() {
  const data = await GetAllHeroCarouselAction();
  return (
    <main className="">
      <HomeCarousel data={data} />
    </main>
  );
}
