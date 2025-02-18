"use client"
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"

import { Program } from "../../types/Types";
import { programService } from "../../service";
import { BreadCrumbs, Card } from "@/components/ui";
import { useProgramContext } from "@/context/ProgramContext";
import { PageHeader } from "@/components/layout";

// 숙소전체보기
export default function ProgramPage(){
    const router = useRouter();
    const programContext = useProgramContext();

    const [ programs, setPrograms ] = useState<Program[]>([]);

    useEffect(() => {
        init();

      }, []);

    const init = () => {
        programService.getAll().then((response : any)=>{
            setPrograms(response);
        });
    }

    const onClickGoToDetail = (program : Program) => {
        programContext.currentProgram.setProgram(program);
        router.push("/program/detail");
    }

    
    return (
        // <div className="relative flex flex-col my-16 mx-12 md:mx-44 md:my-32 md:flex md:justify-between ">
        //     {/* head breadcrumble */}
        //     <BreadCrumbs crumbs={[{title:'프로그램',link:'/program'}]} />

        //     {/* title */}
        //     <div className="flex w-full text-center justify-center content-center">
        //         <p className="text-3xl font-bold">프로그램</p>
        //     </div>

        //     <div className="min-h-[38rem] mt-14 md:mt-28">
        //         <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">

        //             { programs.length > 0 && programs.map( (program : Program, index : number) => 
        //                 <div key={`sokso-wrapper-${index}`} className="group flex flex-col h-full items-center text-center">
        //                     {/* image part */}
        //                     <div className="w-80 h-64 border">
        //                         <Image  src={"/images/"+program.img}  width={350} height={230} alt={`sokso-main-image-${index}`} style={{width:350, height:230, objectFit:'cover'}} />
        //                         <p className="w-full h-8  bg-white flex cursor-pointer" onClick={()=>onClickGoToDetail(program)}>
        //                             <span className="mx-auto pt-2 text-xs">상세보기</span>
        //                         </p>
        //                     </div>
        //                     {/* explanation part */}
        //                     <div className="mt-3 w-80 flex flex-col " >
        //                         <span className="text-lg">{program.name}</span>
        //                         <span className="text-sm mt-1">{program.subName}</span>
        //                     </div>
        //                 </div>
        //             ) }
        //         </div>
        //     </div>
        // </div>

        <div className="border border-red-700" >
            {/* Header */}
            <PageHeader src={"/images/book/3.jpeg"} title={"프로그램"} subTitle={"북스테이 도천'은 조이풀빌리지 1층에 위치해있으며 미디어를 잠시 멀리하며 책을 읽고 휴식을 즐길 수 있는 공간입니다. "} alt={"stay-header"} />

            {/* stay list */}
            <div className="max-w-[85rem] mt-10 md:mt-0 mx-8 md:mx-auto grid gird-cols-1 items-center   justify-center md:grid-cols-3 gap-16 md:gap-12  pb-10  md:min-h-lvh">
                { programs.length > 0 && programs.map( (program : Program, index : number) => (
                    <Card
                        key={`program-wrapper-${index}`}
                        name={program.name} 
                        address={program.subName} 
                        images={["/images/"+program.img]} 
                        onClickImage={()=>onClickGoToDetail(program)} 
                        wrapperId={program.id!.toString()} 
                        alt={`program-wrapper-card-${index}`} >
                        {undefined}
                    </Card>
                ))}             
            </div>
        </div>
    )
}