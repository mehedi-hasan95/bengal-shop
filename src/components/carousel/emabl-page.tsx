"use client";

import { Category } from "@prisma/client";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

interface EmblaPageProps {
    data: Category[];
}
export const EmblaPage = ({ data }: EmblaPageProps) => {
    const OPTIONS: EmblaOptionsType = { dragFree: true };
    // const SLIDE_COUNT = data;
    return (
        <div className="py-20">
            <EmblaCarousel slides={data} options={OPTIONS} />;
        </div>
    );
};
