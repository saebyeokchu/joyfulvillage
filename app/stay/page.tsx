"use client"

import Image from "next/image"
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { soksoService } from "../../service";
import { BreadCrumbs, Card } from "@/components/ui";
import { Sokso } from "@/types/sokso";
import StayWrapper from "./component/StayWrapper";
import { StayHeader } from "./component";
import { PageHeader } from "@/components/layout";
import { Rooms, Stays } from "@/lib/tempData";
import { StayType } from "@/types";



// 숙소전체보기
export default function ManageStay(){
    const router = useRouter();
    const [ soksos, setSoksos ] = useState<Sokso[]>([]);

    useEffect(()=>{
        init();
    },[]);

    const init = () => {
        soksoService.getSoksoByLevel(1).then((response : any)=>{
            setSoksos(response);
        });
    }
    // my-16 mx-12 md:mx-44 md:my-32
    return (
        // <div className="flex flex-col py-14 border-0 border-0-red-700 mt-44 space-y-32" style={{color:"#4B5A62"}}>
        //     <div className="relative flex flex-col border-0 border-0-purple-500 md:flex md:justify-between ">
        //         {/* head breadcrumble */}
        //         <BreadCrumbs crumbs={[{title:'숙소',link:'/sokso'}]} />

        //         <div className="flex flex-col items-center justify-center border-0 border-0-green-500">
                    
        //             <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">

        //                 { soksos.length > 0 && soksos.map( (sokso : Sokso, index : number) => 
        //                     <div key={`sokso-wrapper-${index}`} className="group flex flex-col h-full items-center text-center">
        //                         {/* image part */}
        //                         <div className="w-80 h-64 border-0">
        //                             <Image  src={"/images/"+sokso.mainImg}  width={350} height={230} alt={`sokso-main-image-${index}`} style={{width:350, height:230, objectFit:'cover'}} />
        //                             <p className="w-full h-8  bg-white flex cursor-pointer" onClick={()=>router.push(`/sokso/${sokso.id}`)}>
        //                                 <span className="mx-auto pt-2 text-xs">상세보기</span>
        //                             </p>
        //                         </div>
        //                         {/* explanation part */}
        //                         <div className="mt-3 w-80 flex flex-col " >
        //                             <span className="text-lg">{sokso.name}</span>
        //                             <span className="text-sm mt-1">{sokso.introduction}</span>
        //                         </div>
        //                     </div>
        //                 ) }
        //             </div>
        //         </div>
        //     </div>
        // </div> "max-w-[85rem] mx-auto flex flex-col py-14 border-0 border-0-red-700 mt-20 lg:mt-44 space-y-32"
        // <div className="border-0 border-0-red-700" >
        //     <PageHeader src={"/images/outside_1.jpeg"} title={"스테이"} subTitle={"고객에게 꼭 맞춘 휴식을 선사합니다."} alt={"stay-header"} />

        //     <div className="container py-10 px-5 md:mx-auto grid gird-cols-1 items-center   justify-center md:grid-cols-3 gap-5 md:gap-12 ">
        //         <Card 
        //             name={"숲스테이도천"}
        //             address={"영덕군 남정면 산정로 319"}
        //             images={["/images/soop/2.jpg"]} wrapperId={"1"} onClickImage={() => router.push(`/stay/1/rooms`)} alt={"stay-1"}                >
        //             '숲스테이 도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.
        //             숲의 고요함과 맑은 공기를 느끼며, 일상에서 벗어나 완전한 휴식을 경험할 수 있습니다.
        //         </Card>   
        //         <Card 
        //             name={"북스테이도천"} 
        //             address={"영덕군 남정면 산정로 320 1F"} 
        //             images={["/images/book/5.jpeg"]} wrapperId={"2"} onClickImage={() => router.push(`/stay/2/rooms`)}
        //             alt={"stay-2"}             
        //         >
        //             '북스테이 도천'은 조이풀빌리지 1층에 위치해있으며 미디어를 잠시멀리하며 책을 읽고 휴식을 즐길 수 있는 공간입니다.
        //             자연과 책이 조화를이루는 이곳에서 마음의 평온을 찾고, 독서의 즐거움을 만끽할 수 있습니다.
        //         </Card>                  
        //     </div>

            <div className="border-0 border-0-red-700 " >
                {/* Header */}
                <PageHeader src={"/images/outside_1.jpeg"} title={"스테이"} subTitle={"고객에게 꼭 맞춘 휴식을 선사합니다."} alt={"stay-header"} />
    
                {/* stay list */}
                <div className="container py-10 px-5 md:mx-auto grid grid-cols-1 items-start justify-center md:grid-cols-3 gap-5 md:gap-12">
                    { Stays.map( (stay : StayType.Stay, index : number) => (
                            <Card
                                key={`stay-wrapper-${index}`}
                                name={stay.name} 
                                address={stay.address}     
                                images={stay.mainImgs} 
                                onClickImage={() => router.push(`/stay/${stay.id}/rooms`)} 
                                wrapperId={stay.id!.toString()} 
                                alt={`stay-wrapper-card-${index}`} >
                                {stay.introduction}
                            </Card>
                        ))}     
                </div>
                {/* <div className="container py-10 px-5 md:mx-auto grid gird-cols-1 items-center align-top  justify-center md:grid-cols-3 gap-5 md:gap-12 ">
                            
                </div> */}
            </div>
    )
}