"use client"

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image"

import { GrayRoundButton, IndigoRoundButton } from "@/components/ui/Button";
import { PageHeader, SomeErrorPage } from "@/components/layout";
import { StayType } from "@/types";
import { imgAddress } from "@/lib/const";


export default function RoomLayout({
    stayId,
    roomId,
    handleReturnClick,
    targetRoom
}:{
    stayId : string,
    roomId : string,
    handleReturnClick : () => void,
    targetRoom : StayType.Room
}){
    const router = useRouter();

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);

    const renderedMainImgs = useMemo(() => {
        if(targetRoom?.mainImgs){
            return targetRoom!.mainImgs.map((src : string, index : number) => (
                <div key={`room-detail-${index}`} className="relative w-full h-[300px] md:h-[880px] flex-shrink-0">
                    <Image key={`room-image-${index}`} loader={()=>imgAddress + src} src={imgAddress + src} alt={`detail-image-${index}`} fill style={{objectFit:"cover"}} />
                </div>
            ));
        }
    }, [targetRoom]);

    if(!targetRoom){
        return <SomeErrorPage onClickFunction={() => router.push("/")} error={"잘못된 접근입니다."} />
    }


    return(
        <div className="border-0 border-0-red-700 pb-20" >
            {/* Header */}
            {targetRoom.mainImgs && <PageHeader 
                src={imgAddress + targetRoom.mainImgs[0]}
                title={targetRoom.name}
                alt={"stay-room-detail-header"}
                showBtn={true}
                // 실시간 예약으로 이동하거나 네이버로 이동
                btnName={targetRoom.btnName}
                onClickBtn={() => router.push(targetRoom.reserveLink || '/booking')} subTitle1={""}            />}

            {/* content */}
            <div className="container flex flex-col space-y-11 w-full  pt-20 px-5 md:px-14 md:mx-auto  justify-center border-0 border-red-700 text-joyful-indigo ">

                <div>
                    <p className="font-bold">{targetRoom.name}</p>
                    <p className="mt-6">{targetRoom.structure}</p>

                    <p className="mt-9">{targetRoom.introduction1}</p>
                    <p>{targetRoom.introduction2}</p>
                </div>

                <hr className="w-full h-1 mt-11" style={{backgroundColor:"$E6E2D8"}}/>

                <div
                    dangerouslySetInnerHTML={{ __html: targetRoom.content }}
                />

                <hr className="w-full h-1 mt-11" style={{backgroundColor:"$E6E2D8"}}/>

                {/* detail image list */}
                <div className="w-full border-0 border-red-500">
                    {renderedMainImgs}
                </div>
            </div>

            {/* return button */}
            <div className="mt-20 flex justify-end border-0 border-0-red-400 container px-5 md:px-14 md:mx-auto">
                <IndigoRoundButton btnName={"목록으로"} onClickFunction={handleReturnClick}/>
            </div>
            
           
        </div>
    )
}