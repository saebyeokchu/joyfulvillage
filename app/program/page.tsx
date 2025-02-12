"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"

import { BreadCrumbs } from "../_component";
import { Program } from "../_data/Types";
import { programService } from "../_service";
import { useProgramContext } from "../_context/ProgramContext";

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
        <div className="relative flex flex-col my-16 mx-12 md:mx-44 md:my-32 md:flex md:justify-between ">
            {/* head breadcrumble */}
            <BreadCrumbs crumbs={[{title:'프로그램',link:'/program'}]} />

            {/* title */}
            <div className="flex w-full text-center justify-center content-center">
                <p className="text-3xl font-bold">프로그램</p>
            </div>

            <div className="min-h-[38rem] mt-14 md:mt-28">
                <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">

                    { programs.length > 0 && programs.map( (program : Program, index : number) => 
                        <div key={`sokso-wrapper-${index}`} className="group flex flex-col h-full items-center text-center">
                            {/* image part */}
                            <div className="w-80 h-64 border">
                                <Image  src={"/images/"+program.img}  width={350} height={230} alt={`sokso-main-image-${index}`} style={{width:350, height:230, objectFit:'cover'}} />
                                <p className="w-full h-8  bg-white flex cursor-pointer" onClick={()=>onClickGoToDetail(program)}>
                                    <span className="mx-auto pt-2 text-xs">상세보기</span>
                                </p>
                            </div>
                            {/* explanation part */}
                            <div className="mt-3 w-80 flex flex-col " >
                                <span className="text-lg">{program.name}</span>
                                <span className="text-sm mt-1">{program.subName}</span>
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    )
}