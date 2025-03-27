"use client"

import { imgAddress } from "@/lib/const";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Loading } from "../layout";

const Card = ({
  name, 
  address,
  children, 
  images,
  onClickImage,
  wrapperId,
  alt,
  bgColor = 'bg-transparent',
  hideImg = false,
  showBorder = false
} : Readonly<{
  name: string;
  address: string;
  children: React.ReactNode; 
  images: string[];
  onClickImage: any;
  wrapperId: string;
  alt: string;
  bgColor?: string;
  hideImg? : boolean;
  showBorder ?: boolean;
}>) => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false); //click loading
  const totalSlides = images.length;

  const onClickCardImg = () => {
    setIsLoading(true);
    onClickImage();
    setIsLoading(false);
  }

  // Wrap each image in a container that fills 100% of the slider width
  const renderedOptions = useMemo(() => {
    console.log(images);
    return images && images.length > 0 ? images.map((src: string, idx: number) => (
      <div 
        key={`stay-image-${idx}`} 
        className="relative w-full h-full flex-shrink-0 overflow-hidden"
      >
        <Image
          onClick={onClickCardImg}
          fill
          className="object-cover cursor-pointer duration-1000 transition-all ease-in-out hover:scale-105 hover:opacity-50"
          src={imgAddress + src}
          loader={()=>imgAddress + src}
          alt={alt || "stay1"}
          // priority
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
        />
      </div> 
    )) : [];
  }, [images, onClickImage, alt]);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  if(isLoading){
    return <div className="h-screen"><Loading /></div>
  }

  return ( 
    <div className={`md:h-fit ${showBorder && 'border border-slate-500'} ${bgColor}`} key={`stay-${wrapperId}`}>
      {/* Slider Container */}
      {!hideImg && <div className="relative w-full h-[200px] md:h-[270px] overflow-hidden group border-0 border-green-500">
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
        {images.length > 1 && <div className="absolute flex md:hidden bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
          {images.map((_, idx) => (
            <button
              key={`dot-${idx}`}
              onClick={() => setIndex(idx)}
              className={`w-3 h-3 rounded-full ${index === idx ? "bg-white" : "bg-gray-500"}`}
            ></button>
          ))}
        </div>}
      </div>}

      <div className="mt-3 text-joyful-indigo">
        <p className="font-bold text-xl font-arita">{name}</p>
        <p className="mt-1 text-xs  font-arita">{address}</p>

        <div className="mt-5 max-w-[427px] korean-text text-sm/6">
          {children}
        </div>
    </div>
    </div>
  );
};

export default Card;
