
"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import NotFound from "@/components/layout/NotFound";
import { Loading, PageHeader, SomeErrorPage } from "@/components/layout";
import { roomService } from "@/service";
import RoomLayout from "@/components/layout/RoomLayout";
import { LayoutType } from "@/lib/enums";
import OptionLayout from "@/components/layout/OptionLayout";
import { StayType } from "@/types";

const RoomToOptionType = (rooms : StayType.Room[]) : StayType.Option[] => {
    return rooms.map((room : StayType.Room) : StayType.Option => {
        return {
            id : room.id!,
            name : room.name,
            introduction : room.introduction2 ? room.introduction1 + " " + room.introduction2 : room.introduction1,
            mainImgs : room.mainImgs,
            content : room.content,
            reserveLink : room.reserveLink,
            reserveNumber : room.reserveNumber,
            stay_id : room.stay_id,
        }
    })
}


export default function RoomDetail(){
    const router = useRouter();
    const params = useParams();
    const { stayId, roomId } = params;

    const goToRoomList = () => router.push(`/stay/${stayId}/rooms`);

    if(typeof roomId !== 'string' || typeof stayId !== 'string'){
        return <SomeErrorPage onClickFunction={goToRoomList} error={"잘못된 접근입니다."} />
    }

    const { processedData , error , mutate } = roomService.GetByStayId(stayId as string);

    if (error) {
        return (
            <SomeErrorPage onClickFunction={goToRoomList} error={error.message} />
        );
    }

    const { targetRoom , targetRoomError , targetRoomMutate  } = roomService.GetById(roomId as string);

    if (targetRoomError) {
        return (
            <SomeErrorPage onClickFunction={() => router.push("/")} error={targetRoomError.message} />
        );
    }

    const handleReturnClick = useCallback(() => {
        router.push(`/stay/${stayId}/rooms`);
    },[]);


    if(targetRoomError || typeof targetRoom === 'string'){
        return <NotFound onClickFunction={()=>router.push("/stay")} />
    }

    if(!targetRoom){
        return <div className="h-screen"><Loading /></div>
    }

    console.log("targetRoom",targetRoom);

    return(
        targetRoom.layout == LayoutType.room ? <RoomLayout 
            stayId={stayId} 
            roomId={roomId} 
            handleReturnClick={handleReturnClick} 
            targetRoom={targetRoom}        
        /> :
            <OptionLayout 
                optionId={roomId} 
                options={RoomToOptionType(processedData)} 
                handleReturnClick={handleReturnClick} 
                showBtn={true}
            />
        // <div className="border-0 border-0-red-700 pb-16" >
        //     {/* Header */}
        //     {targetRoom.mainImgs && <PageHeader 
        //         src={imgAddress + targetRoom.mainImgs[0]}
        //         title={targetRoom.name}
        //         alt={"stay-room-detail-header"}
        //         showBtn={true}
        //         // 실시간 예약으로 이동하거나 네이버로 이동
        //         btnName="예약하기"
        //         onClickBtn={() => router.push(targetRoom.reserveLink || '/booking')} subTitle1={""}            />}

        //     {/* content */}
        //     <div className="container flex flex-col space-y-11 w-full  pt-20 px-5 md:px-14 md:mx-auto  justify-center border-0 border-red-700 text-joyful-indigo ">

        //         <div>
        //             <p className="font-bold">{targetRoom.name}</p>
        //             <p className="mt-6">{targetRoom.structure}</p>

        //             <p className="mt-9">{targetRoom.introduction1}</p>
        //             <p>{targetRoom.introduction2}</p>
        //         </div>

        //         <hr className="w-full h-1 mt-11" style={{backgroundColor:"$E6E2D8"}}/>

        //         <div
        //             dangerouslySetInnerHTML={{ __html: targetRoom.content }}
        //         />

        //         <hr className="w-full h-1 mt-11" style={{backgroundColor:"$E6E2D8"}}/>

        //         {/* detail image list */}
        //         <div className="w-full border-0 border-red-500">
        //             {renderedMainImgs}
        //         </div>
        //     </div>

        //     {/* return button */}
        //     <div className="mt-20 flex justify-end border-0 border-0-red-400 container px-5 md:px-14 md:mx-auto">
        //         <IndigoRoundButton btnName={"목록으로"} onClickFunction={handleReturnClick}/>
        //     </div>
            
           
        // </div>
    )
}