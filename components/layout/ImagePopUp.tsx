"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image"

import { StayType } from "@/types";
import { imgAddress } from "@/lib/const";

export default function ImagePopUp({
    images,
    onCloseModal
}:{
    images? : string[],
    onCloseModal : any
}){

    //modal state
    const [modalIndex, setModalIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalPrev = () => {
        if(images){
            setModalIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    }

    const handleModalNext = () => {
        if(images){
            setModalIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
    }

    if(!images){
        return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-[80vw] h-[80vh] bg-white">
                잘못된 접근입니다.
            </div>
        </div>
    }

 
    return(
        // Modal overlay for expanded image slider
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative w-[80vw] h-[80vh] bg-white">
                {/* Close button */}
                <div className="absolute top-2 right-2 z-10">
                <button 
                    onClick={onCloseModal}
                    className="text-white bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center"
                >
                    X
                </button>
                </div>
                {/* Slider container */}
                <div className="relative h-full overflow-hidden">
                <div
                    className="flex transition-transform duration-1000 ease-in-out h-full"
                    style={{ transform: `translateX(-${modalIndex * 100}%)` }}
                >
                    {images.map((src: string, index : number) => (
                    <div key={`modal-${index}`} className="w-full flex-shrink-0 relative">
                        <Image 
                        loader={()=>src}
                        src={src}
                        alt={`modal-image-${index}`}
                        fill
                        style={{ objectFit: "contain" }}
                        />
                    </div>
                    ))}
                </div>
                {/* Modal left arrow */}
                { modalIndex != 0 && <button 
                    onClick={handleModalPrev} 
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2"
                >
                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="21.5" cy="21.5" r="21" stroke="#000"/>
                    <path d="M25.5 9.5L13 22L25.5 34.5" stroke="#000"/>
                    </svg>
                </button> }
                {/* Modal right arrow */}
                { modalIndex != ( images.length - 1 ) && <button 
                    onClick={handleModalNext} 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2"
                >
                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="21.5" cy="21.5" r="21" transform="rotate(-180 21.5 21.5)" stroke="#000"/>
                    <path d="M17.5 33.5L30 21L17.5 8.5" stroke="#000"/>
                    </svg>
                </button> }
                </div>
                {/* Dot indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, idx) => (
                    <button
                    key={`dot-${idx}`}
                    onClick={() => setModalIndex(idx)}
                    className={`w-3 h-3 rounded-full ${modalIndex === idx ? "bg-white" : "bg-gray-500"}`}
                    ></button>
                ))}
                </div>
            </div>
        </div>

    )
}