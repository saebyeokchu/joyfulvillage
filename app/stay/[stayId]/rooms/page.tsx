"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image"

import { SoksoError } from "@/lib/messages";
import { BreadCrumbs, Card, OutlineBadgeGreen } from "@/components/ui";
import { Sokso } from "@/types/sokso";
import { useSoksoContext } from "@/context/SoksoContext";
import { OpenWindow } from "@/lib/common";
import { soksoService } from "@/service";
import Header from "../../component/StayHeader";
import StayWrapper from "../../component/StayWrapper";
import { StayPillOption } from "@/lib/enums";
import { Rooms, Stays } from "@/lib/tempData";
import { StayType } from "@/types";
import { GrayRoundButton, IndigoRoundButton } from "@/components/ui/Button";
import { BackButtonWrapper, Loading, OptionPills, PageHeader } from "@/components/layout";
import useSWR from "swr";
import { getFetcher } from "@/lib/fetcher";
import { Cafe } from "@/types/Types";
import AdminWrapper from "@/app/admin/component/AdminWrapper";


function SoksoList({
    parentSokso,
    soksos,
}:{
    parentSokso : Sokso,
    soksos : Sokso[]
}){
    const router = useRouter();
    const soksoContext = useSoksoContext();

    const onClickGoToDetail = (sokso : Sokso) => {
        if(!sokso.soksoDetail_Id){
            window.alert(SoksoError.noSoksoDetail);
            return;
        }else{
            if(parentSokso && sokso){
                soksoContext.currentSokso.setSokso(sokso);
                soksoContext.parentSokso.setSokso(parentSokso)
                // soksoContext.currentSoksoDetail.setSoksoDetail(soksoDetail);
                router.push(`${parent}/${sokso.id}`);
            }
        }
    }

    return (
        <>
            {/* head breadcrumble */}
            <BreadCrumbs crumbs={[{title:'숙소',link:'/sokso'},{ title: (parentSokso && parentSokso.name)  || '' ,link:'/'}]} />

            {/* title */}
            <div className="flex w-full text-center justify-center content-center mt-5 md:mt-0">
                <p className="text-3xl font-bold">{parentSokso && parentSokso.name}</p>
            </div>

            {/* Mobile opitions */}
            <div className="flex flex-row md:hidden space-x-3 w-full justify-center mt-3">
                <OutlineBadgeGreen name={"객실"} />
                <OutlineBadgeGreen name={"옵션"} />
            </div>

            <div className="min-h-[38rem] mt-14 md:mt-28">
                <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
                    { soksos.length > 0 && soksos.map( (sokso : Sokso, index : number) => 
                        <div key={`sokso-wrapper-${index}`} className="group flex flex-col h-full items-center text-center">
                            {/* image part */}
                            <div className="w-80 h-64 border-0">
                                <Image className="object-cover" src={"/images/"+sokso.mainImg} width={350} height={230} alt={`sokso-main-image-${index}`} />
                                <p className="w-full h-8 flex cursor-pointer" >
                                    <span className="mx-auto pt-2 text-xs bg-white w-1/2" onClick={()=>sokso.reserveLink && OpenWindow(sokso.reserveLink)}>예약하기</span>
                                    <span className="mx-auto pt-2 text-xs bg-green w-1/2 text-white" onClick={()=> onClickGoToDetail(sokso)}>상세보기</span>
                                </p>
                            </div>
                            {/* explanation part */}
                            <div className="mt-1 w-80 flex flex-col " >
                                <span className="text-lg">{sokso.name}</span>
                                <span className="text-sm mt-1">{sokso.introduction}</span>
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </>
    )
}


export default function StayRooms(){


    const [ soksos, setSoksos ] = useState<Sokso[]>([]);
    const [ parentSokso, setParentSokso ] = useState<Sokso | null>(null);
    const [ option, setOption ] = useState<StayPillOption>(StayPillOption.rooms);
    const router = useRouter();
    const params = useParams();
    const { stayId } = params;

    const handleReturnClick = useCallback(() => {
        router.push(`/stay`);
    },[router, stayId]);


    // const { data, error, mutate  } = useSWR<Cafe[]>(
    //     GetCafeDataBySection + CafeSection.subTitle,
    //     getFetcher
    // );

    const data : StayType.Room[] = Rooms.filter((room : StayType.Room) => room.stayid?.toString() === stayId)

    console.log(data);

    const thisStay = useMemo(() => {
        return Stays.find((stay: StayType.Stay) => String(stay.id) === stayId);
      }, [Stays, stayId]);
    

      if (!thisStay) {
        return <AdminWrapper>
            <Loading />
        </AdminWrapper>;
    }
    const renderedOptions = useMemo(() => {
        const roomPill = {
            targetVal : StayPillOption.rooms,
            name : '객실',
            onClickFunction : ()=>router.push(`/stay/${stayId}/rooms`),
        };

        const optionPill = {
            targetVal : StayPillOption.option,
            name : '옵션',
            onClickFunction : ()=>router.push(`/stay/${stayId}/option`),
        }
      
        return thisStay.optionAvailable ? [roomPill, optionPill] : [roomPill];
      }, [thisStay]);

        
    // if (!data) {
    //     return <AdminWrapper>
    //         <Loading />
    //     </AdminWrapper>;
    // }

    // if (error) {
    //     return (
    //         <SomeErrorPage onClickFunction={() => router.push("/admin")} error={error} />
    //     );
    // }



    //use swr and fetch for getting a data
    const renderedRooms = useMemo(() => {
        return data.map((room : StayType.Room, index : number) => (
            <Card 
                key={`stay-wrapper-room-${index}`}
                name={room.name}
                address={room.structure}
                images={room.mainImgs} 
                wrapperId={room.id!.toString()}
                onClickImage={()=>router.push(`/stay/${stayId}/rooms/${room.id}`)} 
                alt="stay-1-1"
            >
                {room.introduction1}
            </Card> 
        ));
    }, [stayId]);



    // if(!currentOption) return <NotFound onClickFunction={handleReturnClick} />


    return(
        
        <div className="border-0 border-0-red-700 pb-10 " >
            {/* Header */}
            <PageHeader src={thisStay.mainImgs[0]} title={thisStay.name} subTitle={thisStay.introduction} alt={"rooms-header"} />

            {/* pills */}
            {/* <OptionPills option={StayPillOption.rooms} onClickFunction={()=>router.push(`/stay/${stayId}/option`)} /> */}
            <OptionPills pills={renderedOptions} currentPill={StayPillOption.rooms} />

            {/* stay list */}
            <div className="container md:mx-auto grid gird-cols-1 items-center   justify-center md:grid-cols-3 gap-12 px-5 md:px-8">
                {renderedRooms}
            </div>

            {/* return button */}
            {/* <div className="mt-10 flex justify-end border-0 border-0-red-400 max-w-[85rem] mx-8 md:mx-auto">
                <IndigoRoundButton btnName={"목록으로"} onClickFunction={handleReturnClick}/>
            </div> */}
            <div className="mt-10">
                <BackButtonWrapper btnName={"목록으로"} onBtnClickFunction={handleReturnClick} />
            </div>
           
        </div>
    )
}