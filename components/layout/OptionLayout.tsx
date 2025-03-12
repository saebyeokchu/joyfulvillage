"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image"

import { StayType } from "@/types";
import { BackButtonWrapper, ImagePopUp, Loading, PageHeader, SomeErrorPage } from "@/components/layout";
import { imgAddress } from "@/lib/const";
import { optionService } from "@/service";


//saebyeok 여기 로직 보충 필요
const OptionDetailWrapper = ({option, index, onClickImage} : {option : StayType.Option , index : number, onClickImage : any}) => 
<div className={`w-full flex-shrink-0 border-0 border-0-red-500 flex justify-center`} key={`option-detail-wrapper-${index}`}>
    <div className="grid grid-cols-1 md:grid-cols-2  w-[810px] border-0 border-0-purple-500">
        <div className="relative w-full h-72 border-0 cursor-pointer overflow-hidden" onClick={onClickImage}>
            <Image 
                loader={()=>imgAddress + option.mainImgs[0]}
                src={imgAddress + option.mainImgs[0]}
                alt={`option1-detail-${index}`}
                fill
                className="hover:scale-105 hover:opacity-90 transition-transform duration-500 ease-in-out "
                style={{ objectFit: "cover" }}
            />
        </div>
        <div className="flex flex-col ml-4" >
            <p className="text-xl font-bold font-pretendard">{option.name}</p>
            <p className="font-pretendard mt-3">{option.introduction}</p>
            <div className="mt-6 text-gray-500">
                <div dangerouslySetInnerHTML={{__html: option.content}} />
            </div>
        </div>
    </div>
</div>


const OptionLayout = ({
  optionId,
  options,
  handleReturnClick,
}:{
  optionId : string,
  options : StayType.Option[],
  handleReturnClick : any
 
}) => {
    // Always call hook to set index
    const [index, setIndex] = useState(0);
    const [targetOptionId, setTargetOptionId] = useState(typeof optionId === "string" ? parseInt(optionId) : 0);

    // Process options regardless of loading state.
    const renderedOptions = useMemo(() => {
      return options
        ? options.map((o: StayType.Option, i: number) => (
            <OptionDetailWrapper
                key={`detail-${i}`}
                option={o}
                index={i} 
                onClickImage={undefined}            />
          ))
        : [];
    }, [options]);
  
    // Compute targetOption from options and index
    const targetOption = useMemo(() => {
      let target : StayType.Option | null = null;
      options.map((o: StayType.Option, i : number) => {
        if(o.id == targetOptionId) {
          target = o;
          setIndex(i);
        }
      })
      return options ? options.find((o: StayType.Option, i : number) => o.id == targetOptionId) : undefined;
    }, [options, targetOptionId]);
  
    // Transform images if targetOption is available
    const renderedImages = useMemo(() => {
      return targetOption && targetOption.mainImgs
        ? targetOption.mainImgs.map((src: string, i: number) => (
            <div
              key={`content-image-${i}`}
              className="w-[300px] md:w-[810px] h-[300px] md:h-[600px] flex-shrink-0 relative overflow-hidden"
            >
              <Image
                loader={()=>imgAddress + src}
                src={imgAddress + src}
                alt={`content-image-${i}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ))
        : [];
    }, [targetOption]);
  
    // Compute totalSlides safely
    const totalSlides = options ? options.length : 0;
  
    const handlePrev = () => {
      if (totalSlides > 0) {
        const prevIndex = (index - 1 + totalSlides) % totalSlides;
        // setIndex(prevIndex);

        //find targetoptionid
        setTargetOptionId(options.find((o: StayType.Option, i : number) => i == prevIndex )?.id || 0);
      }
    };
  
    const handleNext = () => {
      if (totalSlides > 0) {
        const nextIndex = (index + 1) % totalSlides;
        // setIndex(nextIndex);

        setTargetOptionId(options.find((o: StayType.Option, i : number) => i == nextIndex)?.id || 0);
      }
    };
  
    // Determine loading state without returning early
    const NoTargetOption = !targetOption;

    if(NoTargetOption){
      return <SomeErrorPage onClickFunction={handleReturnClick} error={"잘못된 접근입니다."} />
    }
  
    return (
      <div className="border-0 pb-20">
          <>
            {/* Header */}
            <PageHeader
              src={imgAddress + targetOption.mainImgs[0]}
              title={targetOption.name}
              subTitle1={targetOption.introduction}
              alt={"option1-detail-header"}
            />
  
            {/* Stay list */}
            <div className="relative container  py-20 px-5 md:px-14 md:mx-auto h-72 mt-10 overflow-hidden">
              <div
                className="transition-transform duration-1000 ease-in-out w-full flex flex-row group"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {renderedOptions}
              </div>
  
              {/* Left arrow */}
              {index !== 0 && (
                <div
                  className="hidden md:block cursor-pointer absolute left-0 top-1/2 translate-y-5"
                  onClick={handlePrev}
                >
                  <svg
                    width="43"
                    height="43"
                    viewBox="0 0 43 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="21.5" cy="21.5" r="21" stroke="#4B5A62" />
                    <path d="M25.5 9.5L13 22L25.5 34.5" stroke="#4B5A62" />
                  </svg>
                </div>
              )}
  
              {/* Right arrow */}
              {index !== totalSlides - 1 && (
                <div
                  className="hidden md:block cursor-pointer absolute right-0 top-1/2 translate-y-5"
                  onClick={handleNext}
                >
                  <svg
                    width="43"
                    height="43"
                    viewBox="0 0 43 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="21.5"
                      cy="21.5"
                      r="21"
                      transform="rotate(-180 21.5 21.5)"
                      stroke="#4B5A62"
                    />
                    <path d="M17.5 33.5L30 21L17.5 8.5" stroke="#4B5A62" />
                  </svg>
                </div>
              )}
  
              {/* Dot indicators (mobile) */}
              <div className="absolute flex md:hidden bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
                {options[index].mainImgs.map((_: any, i: number) => (
                  <button
                    key={`option-dot-${i}`}
                    onClick={() => setIndex(i)}
                    className={`w-3 h-3 rounded-full ${index === i ? "bg-white" : "bg-gray-500"}`}
                  ></button>
                ))}
              </div>
            </div>
  
            {/* Content images */}
            <div className="container mt-20 px-5 md:px-14 mx-auto flex flex-col items-center justify-center space-y-10">
              {renderedImages}
            </div>
  
            {/* Return button */}
            <div className="container px-5 md:mx-auto mt-20 flex justify-end">
              <BackButtonWrapper btnName={"목록으로"} onBtnClickFunction={handleReturnClick} />
            </div>
          </>
      </div>
    );
}

export default OptionLayout;