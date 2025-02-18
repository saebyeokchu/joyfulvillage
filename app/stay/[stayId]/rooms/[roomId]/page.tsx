"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image"
import useSWR from "swr";

import { StayPillOption } from "@/lib/enums";
import { StayType } from "@/types";
import { Options, Rooms } from "@/lib/tempData";
import { GrayRoundButton } from "@/components/ui/Button";
import NotFound from "@/components/layout/NotFound";
import OptionPills from "../../component/OptionPills";
import { Loading } from "@/components/layout";
import { StayHeader } from "@/app/stay/component";


export default function RoomDetail(){
    const router = useRouter();
    const params = useParams();
    const { stayId, roomId } = params;

    const fetcher = (url : string) => {
        if(typeof(roomId) === 'string'){
            return Rooms.find(room => room.id?.toString() === roomId);
        }else{
            return url;
        }
    }

    const { data, error } = useSWR(`/api/rooms/${roomId}`, fetcher);

    if(error || typeof data === 'string'){
        return <NotFound onClickFunction={()=>router.push("/stay")} />
    }
    if(!data){
        return <Loading />
    }

    return(
        
        <div className="border border-red-700" >

            {/* Room Detail Header */}
            <div className="relative">
                <StayHeader 
                    src={data.mainImgs[0]} 
                    title={data.name} 
                    subTitle={data.introduction} 
                    alt={"stay-room-detail"} />
                
                {/* reservation button floating on the appropriate position */}
                {/* position: absolute;
                width: 104.05px;
                height: 104.05px;
                left: 1275.7px;
                top: 274px; */}
                <div className="absolute  right-5 top-52 w-28 h-28 text-center text-white rounded-full pt-11 cursor-pointer" style={{backgroundColor : '#6E8653E5'}}>
                    <span className="">예약하기</span>
                </div>
            </div>
             
            

            {/* stay list */}
            <div className="max-w-[85rem] mx-auto grid gird-cols-1 items-center justify-center md:grid-cols-3 gap-16 md:gap-12 mb-10  ">
            </div>
           
        </div>
    )
}