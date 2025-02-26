"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image"

import { StayPillOption } from "@/lib/enums";
import { StayType } from "@/types";
import { Options } from "@/lib/tempData";
import { GrayRoundButton } from "@/components/ui/Button";
import NotFound from "@/components/layout/NotFound";
import { StayHeader } from "@/app/stay/component";
import { ImagePopUp, Loading, PageHeader } from "@/components/layout";

const OptionDetailWrapper = ({option, index, onClickImage} : {option : StayType.Option , index : number, onClickImage : any}) => 
<div className={`w-full flex-shrink-0 border-0 border-0-red-500 flex justify-center`} key={`option-detail-wrapper-${index}`}>
    <div className="grid grid-cols-1 md:grid-cols-2  w-[810px] border-0 border-0-purple-500">
        <div className="relative w-full h-72 border-0 cursor-pointer overflow-hidden" onClick={onClickImage}>
            <Image 
                src={option.mainImg[0]}
                alt={`option1-detail-${index}`}
                fill
                className="hover:scale-105 hover:opacity-90 transition-transform duration-500 ease-in-out "
                style={{ objectFit: "cover" }}
            />
        </div>
        <div className="flex flex-col space-y-3 p-3" >
            <p className="text-xl font-bold">{option.name}</p>
            <p>{option.name}</p>
            <div className="text-sm text-gray-500">
                <div dangerouslySetInnerHTML={{__html: option.content}} />
            </div>
        </div>
    </div>
</div>

export default function OptionDetail(){
    const router = useRouter();
    const params = useParams();
    const { stayId, optionId } = params;

    const [index, setIndex] = useState(0);

    const [options, setOptions] = useState<StayType.Option[]>([]);

    //modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onCloseModal = useCallback(() => {
        setIsModalOpen(false);
    },[]);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    },[]);

    
    const renderedOptions = useMemo(() => {
        return options.map((option : StayType.Option, index : number) => (
            <OptionDetailWrapper key={`detail-${index}`} option={option} index={index} onClickImage={()=>openModal()}/>
        ));
    }, [options]);

    const handleReturnClick = useCallback(() => {
        if(typeof(stayId) == 'string'){
            router.push(`/stay/${stayId}/option`);
        }
    },[router, stayId]);

    
    useEffect(()=>{
        if(typeof(stayId) == 'string'){ //url check
            setOptions(Options);
        }

        if(typeof(optionId) == 'string' ){ //url check
            const id = parseInt(optionId);
            setIndex(id-1);
        }
    },[]); 

    //saebyeok
    const currentOption = options.find((e:StayType.Option) => e.id === index+1) || null;

    const renderedImages = useMemo(() => {
        return currentOption?.contentImgs.map((src : string, index : number) => (
        <div key={`content-image-${index}`} className="w-[300px] md:w-[810px] h-[300px] md:h-[600px] flex-shrink-0 relative border-0 border-0-green-500 overflow-hidden">
            <Image 
                src={src}
                alt={`content-image-${index}`}
                fill
                style={{ objectFit: "cover" }}
            />
        </div>
    ))}, [currentOption, index]);


    if(!currentOption) return <Loading />
    if(!(currentOption.contentImgs)) return <Loading />

    
   

    
    const totalSlides = currentOption.contentImgs.length;
   
    const handlePrev = () => {
        const prevIndex : number = (index - 1 + totalSlides ) % totalSlides;
        setIndex(prevIndex);
    }

    const handleNext = () => {  
        const nextIndex : number = (index + 1) % totalSlides;
        setIndex(nextIndex);
    }



 
    return(
        
        <div className="border-0 border-0-red-700 pb-10" >
            {/* Header */}
            <PageHeader src={currentOption.contentImgs[0]} title={currentOption.name} subTitle={currentOption.introduction} alt={"option1-detail-header"} />
            
            {/* stay list */}
            <div className="relative container  md:mx-auto  h-72  mt-10 overflow-hidden border-0 border-0-green-500   ">
                {/* image slider */}
                <div
                    className="transition-transform duration-1000 ease-in-out w-full flex flex-row group"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {renderedOptions}
                </div>

                {/* left arrow */}
                {index !== 0 && (
                    <div
                    className="hidden md:block cursor-pointer absolute left-0 top-1/2 -translate-y-1/2"
                    onClick={handlePrev}
                    >
                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21.5" cy="21.5" r="21" stroke="#4B5A62" />
                        <path d="M25.5 9.5L13 22L25.5 34.5" stroke="#4B5A62" />
                    </svg>
                    </div>
                )}

                {/* right arrow */}
                {index !== totalSlides - 1 && (
                    <div
                    className="hidden md:block cursor-pointer absolute right-0 top-1/2 -translate-y-1/2"
                    onClick={handleNext}
                    >
                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21.5" cy="21.5" r="21" transform="rotate(-180 21.5 21.5)" stroke="#4B5A62" />
                        <path d="M17.5 33.5L30 21L17.5 8.5" stroke="#4B5A62" />
                    </svg>
                    </div>
                )}

                {/* Dot indicators */}
                <div className="absolute flex md:hidden bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
                    {currentOption.contentImgs.map((_, idx) => (
                        <button
                        key={`option-dot-${idx}`}
                        onClick={() => setIndex(idx)}
                        className={`w-3 h-3 rounded-full ${index === idx ? "bg-white" : "bg-gray-500"}`}
                        ></button>
                    ))}
                </div>
            </div>

            {/* <hr className="max-w-[85rem] mt-10 mx-8 md:mx-auto" style={{border:'1px solid #4B5A62'}}/> */}

            {/* content images */}
            <div className="container mt-10 mx-auto border-0 space-y-10 border-0-red-500 flex flex-col items-center justify-center">
                {renderedImages}
            </div>


            {/* return button */}
            <div className="container px-5 md:mx-auto mt-10 border-0 border-red-400 flex justify-end">
                <GrayRoundButton btnName={"목록으로"} onClickFunction={handleReturnClick}/>
            </div>
           
           {/* Modal overlay for expanded image slider */}
            {isModalOpen && <ImagePopUp images={currentOption.contentImgs} onCloseModal={onCloseModal} />}

        </div>
    )
}