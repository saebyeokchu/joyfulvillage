"use client"

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { BreadCrumbs, Card, OutlineBadgeGreen } from "@/components/ui";
import { StayPillOption } from "@/lib/enums";
import { StayType } from "@/types";
import { BackButtonWrapper, Loading, OptionPills, PageHeader, SomeErrorPage } from "@/components/layout";


export default function RoomsLayout({
    stayId,
    stayName,
    processedData,
    targetStay,
    pageHeaderParams,
    optionParams,
    onReturnClick
}:{
    stayId : string,
    stayName : string,
    processedData : any,
    targetStay : any,
    pageHeaderParams : {
        src : string,
        title : string,
        subTitle1 : string,
        subTitle2? : string,
        alt : string
    },
    optionParams : {
        pills : {
            targetVal : StayPillOption,
            name : string,
            onClickFunction : ()=>void
        }[],
        currentPill : StayPillOption,
        optionAvailable : boolean
    },
    onReturnClick : ()=>void
}){
    const router = useRouter();
    
    if(!processedData){
        return <div className="h-screen"><Loading /></div>
    }

    //use swr and fetch for getting a data
    const renderedRooms = useMemo(() => {
        return processedData.map((room : StayType.Room, index : number) => (
            <Card 
                key={`stay-wrapper-room-${index}`}
                name={room.name}
                address={room.structure}
                images={room.mainImgs} 
                wrapperId={room.id!.toString()}
                onClickImage={()=>router.push(`/stay/${stayId}/rooms/${room.id}`)} 
                alt="stay-1-1"
            >
                {stayName && !stayName.startsWith("숲스테이") && room.introduction1}
            </Card> 
        ));
    }, [router, processedData]);

    const renderedOptions = useMemo(() => {
        if (!targetStay) return [];
        return <OptionPills pills={optionParams.pills} currentPill={optionParams.currentPill} />
      }, [router, targetStay]);


    return(
        <div className="border-0 border-0-red-700 pb-20 " > 
            {/* Header */}
            { <PageHeader 
                src={pageHeaderParams.src}
                title={ pageHeaderParams.title}  
                subTitle1={ pageHeaderParams.subTitle1 } 
                subTitle2={pageHeaderParams.subTitle2} 
                alt={pageHeaderParams.alt} /> }

            {/* pills */}
            {optionParams.optionAvailable && renderedOptions }

            {/* stay list */}
            {/* <div className="container py-20 px-5 md:px-14 md:mx-auto grid grid-cols-1 items-start justify-center md:grid-cols-3 gap-x-5 gap-y-14  min:h-[2034px]">{children}</div> */}
           <div className={`container px-5 md:px-14 md:mx-auto grid grid-cols-1 items-start justify-center md:grid-cols-3 gap-x-5 gap-y-14  min:h-[2034px] ${!optionParams.optionAvailable && 'mt-20'} border-0 border-red-500`}>
                {renderedRooms}
            </div>

            {/* return button */}
            {/* <div className="mt-10 flex justify-end border-0 border-0-red-400 max-w-[85rem] mx-8 md:mx-auto">
                <IndigoRoundButton btnName={"목록으로"} onClickFunction={handleReturnClick}/>
            </div> */}
            <div className="mt-10">
                <BackButtonWrapper btnName={"목록으로"} onBtnClickFunction={onReturnClick} />
            </div>
        </div>
    )
}