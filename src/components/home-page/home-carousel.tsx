"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { HeroCarousel } from "@prisma/client";

interface HomeCarouselProps {
  data: HeroCarousel[];
}
export const HomeCarousel = ({ data }: HomeCarouselProps) => {
  return (
    <div className="container mx-auto px-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {data.map((item) => (
            <CarouselItem
              key={item.id}
              className="grid grid-cols-5 gap-5 relative bg-theme_green rounded-xl justify-between items-center px-5 md:px-8 lg:px-12 pt-4 md:pt-8 lg:pt-10"
            >
              <div className="col-span-3">
                <h3 className="text-xl md:text-2xl lg:text-3xl text-theme pb-5">
                  Save up to {item.save}% off
                </h3>
                <h2 className="text-2xl md:text-4xl lg:text-7xl font-bold">
                  {item.title}
                </h2>
                <p className="text-xl text-slate-500 py-5 max-w-xl line-clamp-2">
                  {item.desc}
                </p>
                <div className="py-10">
                  <Link
                    href={item.link}
                    className="bg-theme hover:bg-green-700 text-white px-10 py-3 rounded-full"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
              <Image
                src={item.image}
                alt={item.title}
                height={500}
                width={500}
                className="col-span-2 max-h-[560px]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
