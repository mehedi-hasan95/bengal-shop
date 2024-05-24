import { GetAllHeroCarouselAction } from "@/actions/admin-action/hero-carousel-action";
import { TitleLabel } from "@/components/common/title-label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HeroPage } from "./_component/hero-page";
import { format } from "date-fns";

const AdminHero = async () => {
  const data = await GetAllHeroCarouselAction();
  const heroData = data.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div>
      <div className="flex justify-between items-center">
        <TitleLabel label={`Total Hero Carousel (${data?.length})`} />
        <Link href={"/dashboard/admin/hero/new"}>
          <Button>New Carousel</Button>
        </Link>
      </div>
      <HeroPage data={heroData} />
    </div>
  );
};

export default AdminHero;
