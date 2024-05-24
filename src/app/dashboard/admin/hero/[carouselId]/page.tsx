import { HeroForm } from "../../_components/carousel-form";
import { prismaDb } from "@/lib/prismaDb";

const HeroCarouselId = async ({
  params,
}: {
  params: { carouselId: string };
}) => {
  const data = await prismaDb.heroCarousel.findUnique({
    where: {
      id: params.carouselId,
    },
  });

  return (
    <div className="pb-10">
      <HeroForm initianData={data} />
    </div>
  );
};

export default HeroCarouselId;
