import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
    NextButton,
    PrevButton,
    usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Link from "next/link";
import { Category } from "@prisma/client";
import Image from "next/image";
import { TitleLabel } from "../common/title-label";

type PropType = {
    slides: Category[];
    options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [scrollProgress, setScrollProgress] = useState(0);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

    const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
        const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
        setScrollProgress(progress * 100);
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onScroll(emblaApi);
        emblaApi.on("reInit", onScroll);
        emblaApi.on("scroll", onScroll);
    }, [emblaApi, onScroll]);

    return (
        <div className="container mx-auto px-6">
            <div className="flex justify-between items-center">
                <TitleLabel label="Search by Category " />
                <div className="embla__buttons">
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>
            </div>
            <div className="embla__progress">
                <div
                    className="embla__progress__bar"
                    style={{
                        transform: `translate3d(${scrollProgress}%,0px,0px)`,
                    }}
                />
            </div>
            <div className="embla__viewport mt-10" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((item) => (
                        <div
                            className="flex justify-between items-center min-w-40 gap-20 mx-1 bg-red-300"
                            key={item.id}
                        >
                            <Link
                                href={item.url}
                                className="flex flex-col items-center w-full bg-gray-200 py-3 hover:bg-theme_green"
                            >
                                <Image
                                    src={item.image}
                                    alt=""
                                    height={500}
                                    width={500}
                                    className="h-20 w-auto"
                                />
                                <p>{item.title}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className="embla__controls">
                
            </div> */}
        </div>
    );
};

export default EmblaCarousel;
