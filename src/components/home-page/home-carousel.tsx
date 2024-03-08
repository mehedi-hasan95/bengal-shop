import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const HomeCarousel = () => {
  return (
    <div className="container mx-auto px-6">
      <Carousel opts={{ loop: true }}>
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
