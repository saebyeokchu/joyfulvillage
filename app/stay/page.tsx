"use client"

import Image from "next/image"
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { soksoService } from "../../service";
import { BreadCrumbs } from "@/components/ui";
import { Sokso } from "@/types/sokso";

// 숙소전체보기
export default function Loading(){
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
    
    return (
        <div className="relative flex flex-col my-16 mx-12 md:mx-44 md:my-32 md:flex md:justify-between ">
            {/* head breadcrumble */}
            <BreadCrumbs crumbs={[{title:'숙소',link:'/sokso'}]} />

            {/* title */}
            <div className="flex w-full text-center justify-center content-center">
                <p className="text-3xl font-bold">숙소</p>
            </div>

            <div className="min-h-[38rem] mt-14 md:mt-28">
                <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">

                    { soksos.length > 0 && soksos.map( (sokso : Sokso, index : number) => 
                        <div key={`sokso-wrapper-${index}`} className="group flex flex-col h-full items-center text-center">
                            {/* image part */}
                            <div className="w-80 h-64 border">
                                <Image  src={"/images/"+sokso.mainImg}  width={350} height={230} alt={`sokso-main-image-${index}`} style={{width:350, height:230, objectFit:'cover'}} />
                                <p className="w-full h-8  bg-white flex cursor-pointer" onClick={()=>router.push(`/sokso/${sokso.id}`)}>
                                    <span className="mx-auto pt-2 text-xs">상세보기</span>
                                </p>
                            </div>
                            {/* explanation part */}
                            <div className="mt-3 w-80 flex flex-col " >
                                <span className="text-lg">{sokso.name}</span>
                                <span className="text-sm mt-1">{sokso.introduction}</span>
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </div>
    )
}