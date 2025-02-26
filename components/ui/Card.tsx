"use client"

import Image from "next/image";
import { useMemo, useState } from "react";

const Card = ({
  name, 
  address,
  children, 
  images,
  onClickImage,
  wrapperId,
  alt,
  bgColor = 'bg-transparent'
} : Readonly<{
  name: string;
  address: string;
  children: React.ReactNode; 
  images: string[];
  onClickImage: React.MouseEventHandler<HTMLDivElement>;
  wrapperId: string;
  alt: string;
  bgColor?: string;
}>) => {
  const [index, setIndex] = useState(0);
  const totalSlides = images.length;

  // Wrap each image in a container that fills 100% of the slider width
  const renderedOptions = useMemo(() => {
    return images.map((src: string, idx: number) => (
      <div 
        key={`stay-image-${idx}`} 
        className="relative w-full h-full flex-shrink-0 overflow-hidden"
      >
        <Image
          onClick={onClickImage}
          fill
          className="object-cover cursor-pointer duration-1000 transition-all ease-in-out hover:scale-105 hover:opacity-50"
          src={src}
          alt={alt || "stay1"}
          priority
        />
      </div>
    ));
  }, [images, onClickImage, alt]);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  return ( 
    <div className={`md:h-fit border-0 ${bgColor}`} key={`stay-${wrapperId}`}>
      {/* Slider Container */}
      <div className="relative w-full h-[200px] md:h-[270px] overflow-hidden group border-0 border-green-500">
        {/* Slider Inner Container */}
        <div
          className="relative transition-transform duration-1000 ease-in-out h-full w-full flex"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {renderedOptions}
        </div>

        {/* Left Arrow */}
        {index !== 0 && (
          <div
            className="hidden cursor-pointer md:group-hover:block absolute left-0 top-1/2 -translate-y-1/2"
            onClick={handlePrev}
          >
            <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="21.5" cy="21.5" r="21" stroke="#fff"/>
              <path d="M25.5 9.5L13 22L25.5 34.5" stroke="#fff"/>
            </svg>
          </div>
        )}

        {/* Right Arrow */}
        {index !== totalSlides - 1 && (
          <div
            className="hidden cursor-pointer md:group-hover:block absolute right-0 top-1/2 -translate-y-1/2"
            onClick={handleNext}
          >
            <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="21.5" cy="21.5" r="21" transform="rotate(-180 21.5 21.5)" stroke="#fff"/>
              <path d="M17.5 33.5L30 21L17.5 8.5" stroke="#fff"/>
            </svg>
          </div>
        )}

        {/* Dot Indicators for Mobile */}
        <div className="absolute flex md:hidden bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
          {images.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              onClick={() => setIndex(idx)}
              className={`w-3 h-3 rounded-full ${index === idx ? "bg-white" : "bg-gray-500"}`}
            ></button>
          ))}
        </div>
      </div>

      <div className="mt-5 text-joyful-indigo">
        <p className="font-bold text-xl font-pretendard">{name}</p>
        <p className="mt-4 text-sm  font-pretendard">{address}</p>

        <div className="mt-8 max-w-[427px] korean-text text-sm/5">
        {children}
        </div>
    </div>
    </div>
  );
};

export default Card;
