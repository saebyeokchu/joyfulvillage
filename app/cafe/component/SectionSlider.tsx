import { LeftArrow, RightArrow } from "@/lib/svgs";
import { useState } from "react";
import Image from "next/image"
import { useSwipeable } from "react-swipeable";

interface SectionSliderProps {
    title : string;
    images : string[];
    menus : string;
    slideWidth? : number;
    slideHeight? : number;
}

const SectionSlider = ({
    title,
    images,
    menus,
    slideWidth = 400,
    slideHeight = 250
}:SectionSliderProps) => {
const [index, setIndex] = useState(0);
  const totalSlides = images.length;

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % totalSlides);
  };

  
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true, // optional, allows swipe using mouse events
  });

  return (
    <div>
        <p>{title}</p>
        <div 
            className="relative flex flex-row overflow-hidden mt-6 w-[400px] h-[250px]"
            {...swipeHandlers}
        >
            {/* Left arrow */}
            { totalSlides > 1 && index > 0 && <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
                onClick={handlePrev}
                aria-label="Previous"
            >
                <LeftArrow />
            </button> }

            {/* Right arrow */}
            { totalSlides > 1 && index < totalSlides && <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
                onClick={handleNext}
                aria-label="Next"
            >
                <RightArrow />
            </button> }

            {/* Slider container */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                // Assuming each slide is 400px wide
                style={{ transform: `translateX(-${index * slideWidth}px)` }}
            >
                {images.map((imgSrc, i) => (
                    <div
                    key={i}
                    className="relative flex-shrink-0 w-[400px] h-[250px]"
                    // style={{ width: slideWidth, height: slideHeight }}
                    >
                        <Image
                            src={imgSrc}
                            alt={`${title} ${i}`}
                            fill
                            className="object-cover"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
                        />
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-3 text-start leading-5 text-xs w-[400px]">
            {menus}
        </div>
    </div>
  )

}

export default SectionSlider;