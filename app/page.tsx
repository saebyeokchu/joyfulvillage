"use client"

import { useEffect, useRef, useState } from "react";
import { GetHomeintrodcutionContent, GetHomeMainImgContent, GetHomeSpaceContent } from "../service/homeService";
import { useJoyfulContext } from "@/context/JoyfulContext";
import { GetHomeData } from "@/lib/api/Home";

const images = [
    "/system/home/mainImg.jpg",
    "/images/2025_01_31_17_56_28.jpg",
    "/images/2025_01_31_18_55_13.jpg",
  ];

export default function Home(){

    const joyfulContext = useJoyfulContext();
    const [ mainImgContent, setMainImgContent ] = useState<[string,string,string]>(["","",""]);
    const [ introdcutionContent, setIntrodcutionContent ] = useState<string>("");
    const [ spaceContents, setSpaceContents ] = useState<[string,string,string]>(["","",""]);

    const [index, setIndex] = useState(1); // Start at the first real slide
    const [fade, setFade] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setAutoPlay();
        const homeDataUpdated : string | null =  localStorage.getItem("joyfulhomedataupdated");
        //update when page reloaded
        if(true){
            GetHomeData().then(response => {
                if(response.status == 200){
                    GetHomeMainImgContent(response.data, setMainImgContent);
                    GetHomeintrodcutionContent(response.data, setIntrodcutionContent);
                    GetHomeSpaceContent(response.data, setSpaceContents);
                }
            });
        }
    }, [])

    const setAutoPlay = () => {
        intervalRef.current = setInterval(handleNext, 6000); // Auto-slide every 3 seconds
        return () => clearInterval(intervalRef.current!); // Cleanup on unmount
    }


    // Handle next image with fade effect
    const handleNext = () => {
        setFade(true);
        setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false);
        }, 500); // Halfway fade duration
    };

    // Handle previous image with fade effect
    const handlePrev = () => {
        setFade(true);
        setTimeout(() => {
        setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        setFade(false);
        }, 500);
    };


    return (
        <div className="flex flex-col bg-point border border-red-700 w-full overflow-y-hidden overflow-hidden h-screen" >

            {/* main image*/}
            <div className="absolute inset-0 flex items-center justify-center">
                {images.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt=""
                    className={`absolute w-full h-full object-cover transition-opacity ease-in-out duration-1000 ${
                    i === index ? "opacity-100" : "opacity-0"
                    }`}
                />
                ))}
            </div>
            

            <button
                className="absolute left-4 top-1/2 -translate-y-1/2  text-white p-3 rounded-full text-3xl"
                onClick={handlePrev}
            >
                ❮
            </button>

            {/* Right Arrow */}
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2  text-white p-3 rounded-full text-3xl"
                onClick={handleNext}
            >
                ❯
            </button>

        </div>  
    )
}