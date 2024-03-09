import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export const HomeCarousel = () => {
  return (
    <div className="container mx-auto px-6">
      <Carousel>
        <CarouselContent>
          <CarouselItem>Mehedi</CarouselItem>
          <CarouselItem>Hasan</CarouselItem>
          <CarouselItem>Titu</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
