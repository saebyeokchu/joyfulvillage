"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image"

import { StayType } from "@/types";
import { BackButtonWrapper, ImagePopUp, Loading, PageHeader, SomeErrorPage } from "@/components/layout";
import { imgAddress } from "@/lib/const";
import { optionService } from "@/service";
import OptionLayout from "@/components/layout/OptionLayout";


export default function OptionDetail() {
    const router = useRouter();
    const params = useParams();
    const { stayId, optionId } = params;

    if(typeof optionId !== "string" ){
      return <SomeErrorPage onClickFunction={() => router.push("/")} error={"잘못된 접근입니다."} />
    }
  
    // Fetch options via custom hook (or SWR)
    const { options, optionsError } = optionService.GetByStayId(stayId as string);

    const handleReturnClick = useCallback(() => {
      if (typeof stayId === "string") {
        router.push(`/stay/${stayId}/option`);
      }
    }, [router, stayId]);
  
    // Determine loading state without returning early
    const isLoading = !options;

    if(optionsError){
        return <SomeErrorPage onClickFunction={() => router.push("/")} error={optionsError.message} />
    }

    if(isLoading){
      return <div className="h-screen"><Loading /></div>;
    }
  
    return (
      <OptionLayout 
        optionId={optionId} 
        options={options} 
        handleReturnClick={handleReturnClick} 
      />
      // <div className="border-0 pb-10">
      //   {optionsError ? (
      //     <SomeErrorPage onClickFunction={() => router.push("/admin")} error={optionsError.message} />
      //   ) : isLoading ? (
      //     <div className="h-screen">
      //       <Loading />
      //     </div>
      //   ) : (
      //     <>
      //       {/* Header */}
      //       <PageHeader
      //         src={imgAddress + targetOption.contentImgs[0]}
      //         title={targetOption.name}
      //         subTitle1={targetOption.introduction}
      //         alt={"option1-detail-header"}
      //       />
  
      //       {/* Stay list */}
      //       <div className="relative container  py-20 px-5 md:px-14 md:mx-auto h-72 mt-10 overflow-hidden">
      //         <div
      //           className="transition-transform duration-1000 ease-in-out w-full flex flex-row group"
      //           style={{ transform: `translateX(-${index * 100}%)` }}
      //         >
      //           {renderedOptions}
      //         </div>
  
      //         {/* Left arrow */}
      //         {index !== 0 && (
      //           <div
      //             className="hidden md:block cursor-pointer absolute left-0 top-1/2 translate-y-5"
      //             onClick={handlePrev}
      //           >
      //             <svg
      //               width="43"
      //               height="43"
      //               viewBox="0 0 43 43"
      //               fill="none"
      //               xmlns="http://www.w3.org/2000/svg"
      //             >
      //               <circle cx="21.5" cy="21.5" r="21" stroke="#4B5A62" />
      //               <path d="M25.5 9.5L13 22L25.5 34.5" stroke="#4B5A62" />
      //             </svg>
      //           </div>
      //         )}
  
      //         {/* Right arrow */}
      //         {index !== totalSlides - 1 && (
      //           <div
      //             className="hidden md:block cursor-pointer absolute right-0 top-1/2 translate-y-5"
      //             onClick={handleNext}
      //           >
      //             <svg
      //               width="43"
      //               height="43"
      //               viewBox="0 0 43 43"
      //               fill="none"
      //               xmlns="http://www.w3.org/2000/svg"
      //             >
      //               <circle
      //                 cx="21.5"
      //                 cy="21.5"
      //                 r="21"
      //                 transform="rotate(-180 21.5 21.5)"
      //                 stroke="#4B5A62"
      //               />
      //               <path d="M17.5 33.5L30 21L17.5 8.5" stroke="#4B5A62" />
      //             </svg>
      //           </div>
      //         )}
  
      //         {/* Dot indicators (mobile) */}
      //         <div className="absolute flex md:hidden bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
      //           {options[index].contentImgs.map((_: any, i: number) => (
      //             <button
      //               key={`option-dot-${i}`}
      //               onClick={() => setIndex(i)}
      //               className={`w-3 h-3 rounded-full ${index === i ? "bg-white" : "bg-gray-500"}`}
      //             ></button>
      //           ))}
      //         </div>
      //       </div>
  
      //       {/* Content images */}
      //       <div className="container mt-20 px-5 md:px-14 mx-auto flex flex-col items-center justify-center space-y-10">
      //         {renderedImages}
      //       </div>
  
      //       {/* Return button */}
      //       <div className="container px-5 md:mx-auto mt-20 flex justify-end">
      //         <BackButtonWrapper btnName={"목록으로"} onBtnClickFunction={handleReturnClick} />
      //       </div>
  
      //       {/* Modal overlay for expanded image slider */}
      //       {isModalOpen && <ImagePopUp images={options[index].contentImgs} onCloseModal={onCloseModal} />}
      //     </>
      //   )}
      // </div>
    );
  }