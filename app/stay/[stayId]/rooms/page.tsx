"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { StayPillOption } from "@/lib/enums";
import { roomService, stayService } from "@/service";
import { imgAddress } from "@/lib/const";
import { Loading, RoomsLayout, SomeErrorPage } from "@/components/layout";


export default function StayRooms(){
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const params = useParams();
    const { stayId } = params;

    if(typeof stayId !== "string"){
        return <SomeErrorPage onClickFunction={()=>router.push("/stay")} error={"잘못된 접근입니다."} />;
    }

    const onReturnClick = useCallback(() => {
        router.push(`/stay`);
    },[router, stayId]);


    const stay = stayService.GetById(stayId as string);
    const { processedData , error , mutate } = roomService.GetByStayId(stayId as string);

    const targetStay = useMemo(()=>stay?.targetStay,[stay]);

    if (error || stay?.targetStayError) {
        console.log(error)
        return (
            <SomeErrorPage onClickFunction={() => router.push("/stay")} error={error.message} />
        );
    }

    if(!processedData){
        return <div className="h-screen"><Loading /></div>
    }

    if(isLoading){
        return <div className="h-screen"><Loading /></div>;
    }

    return(
        // <div className="border-0 border-0-red-700 pb-20 " > 
        //     {/* Header */}
        //     { <PageHeader 
        //         src={targetStay.mainImgs && targetStay.mainImgs.length > 0 && ( imgAddress + targetStay.mainImgs[0] )} 
        //         title={ targetStay && targetStay.name} 
        //         subTitle1={ targetStay && targetStay.introduction1 } 
        //         subTitle2={targetStay.introduction2} 
        //         alt={"rooms-header"} /> }

        //     {/* pills */}
        //     {stay.targetStay && stay.targetStay.optionAvailable && renderedOptions }

        //     {/* stay list */}
        //     {/* <div className="container py-20 px-5 md:px-14 md:mx-auto grid grid-cols-1 items-start justify-center md:grid-cols-3 gap-x-5 gap-y-14  min:h-[2034px]">{children}</div> */}
        //    <div className={`container px-5 md:px-14 md:mx-auto grid grid-cols-1 items-start justify-center md:grid-cols-3 gap-x-5 gap-y-14  min:h-[2034px] ${!stay.targetStay.optionAvailable && 'mt-20'} border-0 border-red-500`}>
        //         {renderedRooms}
        //     </div>

        //     {/* return button */}
        //     {/* <div className="mt-10 flex justify-end border-0 border-0-red-400 max-w-[85rem] mx-8 md:mx-auto">
        //         <IndigoRoundButton btnName={"목록으로"} onClickFunction={handleReturnClick}/>
        //     </div> */}
        //     <div className="mt-10">
        //         <BackButtonWrapper btnName={"목록으로"} onBtnClickFunction={handleReturnClick} />
        //     </div>
        // </div>
        <RoomsLayout 
            stayId={stayId}
            pageHeaderParams={{
                src: targetStay.mainImgs && targetStay.mainImgs.length > 0 && (imgAddress + targetStay.mainImgs[0]),
                title: targetStay && targetStay.name,
                subTitle1: targetStay && targetStay.introduction1,
                subTitle2: targetStay.introduction2,
                alt: "rooms-header"
            }}
            optionParams={{
                pills: [{
                    targetVal: StayPillOption.rooms,
                    name: '객실',
                    onClickFunction: () => { setIsLoading(true); router.push(`/stay/${stayId}/rooms`); },
                }, {
                    targetVal: StayPillOption.option,
                    name: '옵션',
                    onClickFunction: () => { setIsLoading(true); router.push(`/stay/${stayId}/option`); },
                }],
                currentPill: StayPillOption.rooms,
                optionAvailable: targetStay.optionAvailable
            }}
            onReturnClick={onReturnClick} stayName={stay.targetStay.name} processedData={processedData} targetStay={targetStay}        />
    )
}