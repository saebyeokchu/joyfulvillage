"use client"

import Image from "next/image"
import { useState } from "react";

import { LeftArrow, RightArrow } from "@/lib/svgs";

const FillImageTag = ({
    index,
    src,
} : {
    index : number,
    src : string,
}) => (
    <Image //400 X 250
        fill
        key={`cafe-image-${index}`} 
        className="object-cover" 
        src={src} 
        loader={()=>src} 
        alt=""
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
        />
)

// 숙소전체보기
export default function CafePage(){
    const [cafeIndex, setCafeIndex] = useState(0); // Start at first cloned slide

    const totalSlides = 2;

    const handlePrev = () => {
        if(cafeIndex > 0){
            setCafeIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
        }
    };

    const handleNext = () => {
        setCafeIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };
    
    return (
        <div className="md:mt-40 text-center border border-red-500 place-items-center">
            <div className="text-xl font-semibold">
                카페도천의 메뉴
            </div>
            <div className="mt-12 border border-red-500 grid grid-cols-2 grid-rows-1 w-[800px]">
                <div>
                    <p>COFFEE</p>
                    <div className="relative  md:block md:mt-6">
                        <button
                            className=" absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
                            onClick={(handlePrev)}
                            aria-label="Previous"
                        >
                            <LeftArrow />
                        </button>
                        <button
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
                            onClick={handleNext}
                            aria-label="Next"
                        >
                            <RightArrow />
                            {cafeIndex}
                        </button>

                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${cafeIndex * 100}%)`,
                            }}
                            >
                            <div className="w-[400px] h-[250px]">
                                <FillImageTag index={5} src={"/images/cafe-empty.png"} />
                            </div>
                            <div className="w-[400px] h-[250px]">
                                <FillImageTag index={5} src={"/images/cafe1.png"} />
                            </div>
                            <div className="w-[400px] h-[250px]">
                                <FillImageTag index={5} src={"/images/cafe-empty.png"} />
                            </div>
                        </div>
                        
                    </div>
                    <div className="mt-3 text-start leading-5">
                        <p className="text-xs ">
                            아메리카노, *카페라떼, 카푸치노, 바닐라라떼, 헤이즐넛 라떼, 카라멜마끼아또, 카페모카, 아포카토, 에스프레소
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}