"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image"

import { SoksoError } from "@/lib/messages";
import { BreadCrumbs, OutlineBadgeGreen } from "@/components/ui";
import { Sokso } from "@/types/sokso";
import { useSoksoContext } from "@/context/SoksoContext";
import { OpenWindow } from "@/lib/common";
import { soksoService } from "@/service";
import Header from "../../component/StayHeader";
import StayWrapper from "../../component/StayWrapper";
import OptionPills from "../component/OptionPills";
import { StayPillOption } from "@/lib/enums";
import { Rooms } from "@/lib/tempData";
import { StayType } from "@/types";
import { GrayRoundButton } from "@/components/ui/Button";



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
                            <div className="w-80 h-64 border">
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

function OptionList(){
    return(
        <>
            <div className="flex flex-col w-full text-center justify-center content-center mt-5 md:mt-0">
                <p className="text-3xl font-bold">옵션</p>
                <p className="mt-6">아래 옵션을 통해 숲에서 더 풍성한 추억을 쌓아보세요</p>
            </div>

            {/* section 1 */}
            <div className="mt-12 flex flex-col text-center w-full justify-center">
                <p className="text-2xl">[바베큐 그릴 & 글램핑 세트]</p>

                {/* section 1 grid barbecue2.jpeg */}
                <div className="grid grid-cols-2 mt-10">
                    <div>
                        <p className="text-lg">A. 바베큐 그릴</p>
                        <Image src={"/images/barbecue2.jpeg"} width={520} height={350} alt={""} className="mt-3" />
                        <div className="text-lg mt-8">
                            <p>1. 바베큐 그릴 대여</p>
                            <p>자연 속에서 맛있는 바베큐를 즐겨보세요!</p>
                        </div>
                        <p className="mt-5 text-lg text-left" >
                            포함사항: 캠핑 테이블2, 캠핑의자2, 화로숯(착화제 포함), 그릴망,<br />
                            점화도구, 집게, 장갑, 야외 조명1 <br />
                            대여비용: 20,000원<br />
                            *원하는 시간대에 직접 불을 피워 사용하시면 됩니다.<br />
                        </p>
                    </div>
                    <div>
                        <p className="text-lg">B. 글램핑 세트</p>
                        <Image src={"/images/barbecue1.jpeg"} width={520} height={350} alt={""} className="mt-3" />
                        <div className="text-lg mt-8">
                            <p>2. 글램핑 용품 대여</p>
                            <p>맛있는 바베큐와 함께 편안한 글램핑 분위기를 연출해보세요!</p>
                        </div>
                        <p className="mt-5 text-lg text-left" >
                        포함사항: 나무선반, 캠핑용 식기(조리도구, 그릇, 컵), 구이바다 스토브, 미니 조명, 랜턴, 주전자, 원목도마, 바람마개, 장작, 오로라 가루, 바베큐 그릴 포함 사항(캠핑 테이블2, 캠핑의자2, 화로, 숯(착화제 포함), 그릴망, 점화 도구, 집게, 장갑, 야외 조명1<br/>
                        대여비용: 40,000원<br/>
                        *자유롭게 셋팅 및 이용 / 원하는 시간대에 직접 불을 피워 사용하시면 됩니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* section 2*/}
            <div className="mt-24 flex flex-col text-center w-full justify-center">
                <p className="text-2xl">[야외 풀장]</p>

                {/* section 1 grid barbecue2.jpeg */}
                <div className="grid grid-cols-2 mt-10">
                    <div>
                        <p className="text-lg">A. 야외 풀장</p>
                        <Image src={"/images/image.png"} width={520} height={350} alt={""} className="mt-3" />
                        <div className="text-lg mt-8">
                            <p>숲 속에서 즐기는 여름 물놀이!</p>
                            <p>푸른 풍경을 바라보며 프라이빗한 물놀이를 즐겨보세요!</p>
                        </div>
                        <p className="mt-5 text-lg text-left" >
                            대형 풀장(수용 인원: 최대 성인 10명)<br/>
                            운영기간: 7~8월<br/>
                            선착순 이용 가능(예약순)<br/>
                            *가격: 인당 5,000원(숙소 이용시)/ 숙소 미 이용시 10,000원<br/>
                        </p>
                    </div>
                    <div>
                        <p className="h-8" ></p>
                        <Image src={"/images/image2.png"} width={520} height={350} alt={""} className="mt-3" />
                    </div>
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

    useEffect(()=>{
        init();
    },[]);

    const init = () => {
        if(typeof(stayId) == 'string'){ //url check
            // //call parent info
            // soksoService.getSoksoById( parseInt(parent)).then((response : any)=>{
            //     setParentSokso(response);
            // });

            // //
            // soksoService.getSoksoByLevelAndGroup(2, parseInt(parent)).then((response : any)=>{
            //     console.log(response)
            //     setSoksos(response);
            // });
        }
    }

    const handleReturnClick = useCallback(() => {
        router.push(`/stay`);
    },[router, stayId]);

    //use swr and fetch for getting a data
    const renderedOptions = useMemo(() => {
        return Rooms.map((room : StayType.Room, index : number) => (
            <StayWrapper 
                key={`stay-wrapper-room-${index}`}
                name={room.name}
                address={room.introduction}
                images={room.mainImgs} 
                wrapperId={room.id!.toString()}
                onClickImage={()=>router.push(`/stay/${stayId}/rooms/${room.id}`)} 
                alt="stay-1-1"
            >
                {room.content}
            </StayWrapper> 
        ));
    }, [stayId]);

    // if(!currentOption) return <NotFound onClickFunction={handleReturnClick} />


    return(
        
        <div className="border border-red-700 pb-10" >
            <Header 
                src={"/images/soop/2.jpg"} 
                title={"숲스테이 도천"} 
                subTitle={`숲스테이도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.`} 
                alt={"stay-soop-header"} /> 
            
            {/* pills */}
            <OptionPills option={StayPillOption.rooms} onClickFunction={()=>router.push(`/stay/${stayId}/option`)} />

            {/* stay list */}
            <div className="max-w-[85rem] grid gird-cols-1 items-center justify-center md:grid-cols-3 gap-16 md:gap-12 mb-10 mx-8 md:mx-auto">
                {renderedOptions}
            </div>

            {/* return button */}
            <div className="mt-10 flex justify-end border border-red-400 max-w-[85rem] mx-8 md:mx-auto">
                <GrayRoundButton btnName={"목록으로"} onClickFunction={handleReturnClick}/>
            </div>
           
        </div>
    )
}