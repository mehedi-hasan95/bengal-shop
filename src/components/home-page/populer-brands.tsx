"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { Brand } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface PopulerBrandsProps {
  brands: Brand[];
}
export const PopulerBrands = ({ brands }: PopulerBrandsProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        AutoScroll({
          playOnInit: true,
          stopOnMouseEnter: true,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        {brands.map((item) => (
          <CarouselItem
            key={item.id}
            className="md:basis-1/4 lg:basis-1/4 flex justify-between"
          >
            <Link href={`/brands/${item.url}`}>
              <Image
                src={item.image}
                alt=""
                height={500}
                width={500}
                className="h-20 w-20"
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
