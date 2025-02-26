"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image"
import useSWR from "swr";

import { StayPillOption } from "@/lib/enums";
import { StayType } from "@/types";
import { Options, Rooms } from "@/lib/tempData";
import { GrayRoundButton, IndigoRoundButton } from "@/components/ui/Button";
import NotFound from "@/components/layout/NotFound";
import OptionPills from "../../component/OptionPills";
import { Loading, PageHeader } from "@/components/layout";
import { StayHeader } from "@/app/stay/component";


export default function RoomDetail(){
    const router = useRouter();
    const params = useParams();
    const { stayId, roomId } = params;

    const fetcher = (url : string) => {
        if(typeof(roomId) === 'string'){
            return Rooms.find(room => room.stayid?.toString() === stayId);
        }else{
            return url;
        }
    }

    const { data, error } = useSWR(`/api/rooms/${roomId}`, fetcher);

    const renderedMainImgs = useMemo(() => {
        return data?.mainImgs.map((src : string, index : number) => (
            <Image key={`room-image-${index}`} src={src} alt={`detail-image-${index}`} layout="intrinsic" width={992} height={334} style={{maxHeight:"600px", objectFit:"cover"}} />
        ));
    }, [data]);

    const handleReturnClick = useCallback(() => {
        router.push(`/stay/${stayId}/rooms`);
    },[]);


    if(error || typeof data === 'string'){
        return <NotFound onClickFunction={()=>router.push("/stay")} />
    }
    if(!data){
        return <Loading />
    }else{

    }





    return(
        
        <div className="border-0 border-0-red-700 pb-10" >
            {/* Header */}
            <PageHeader 
                src={data.mainImgs[0]} 
                title={data.name} 
                subTitle={data.introduction1} 
                alt={"stay-room-detail-header"} 
                showBtn={true}
                // 실시간 예약으로 이동하거나 네이버로 이동
                btnName="예약하기" 
                onClickBtn = {() => router.push(data.reserveLink || '/booking')}
            />

            {/* content */}
            <div className="container flex flex-col w-full  md:mx-auto   justify-center px-5 md:px-8 border-0 border-red-700 min-h-96 mt-10">
                <div
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            </div>

            {/* detail image list */}
            <div className="container flex flex-col w-full space-y-3 md:mx-auto items-center mt-10 justify-center px-5 md:px-8">
                {renderedMainImgs}
            </div>
            
            
            {/* return button */}
            <div className="mt-10 flex justify-end border-0 border-0-red-400 max-w-[85rem] mx-8 md:mx-auto">
                <IndigoRoundButton btnName={"목록으로"} onClickFunction={handleReturnClick}/>
            </div>
           
        </div>
    )
}