"use client"
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"

import { Program } from "../../types/Types";
import { headerInfoService, programService } from "../../service";
import { BreadCrumbs, Card, CardWrapper } from "@/components/ui";
import { useProgramContext } from "@/context/ProgramContext";
import { Loading, PageHeader } from "@/components/layout";
import { imgAddress } from "@/lib/const";

// 숙소전체보기
export default function ProgramPage(){
    const [headerImgSrc, setHeaderImgSrc] = useState<string>("");

    const router = useRouter();
    const programContext = useProgramContext();

    const [ programs, setPrograms ] = useState<Program[]>([]);

    const onClickGoToDetail = (program : Program) => {
        programContext.currentProgram.setProgram(program);
        router.push("/program/" + program.id);
    }

    // useEffect(() => {
    //     init();

    //   }, []);

    // const init = async () => {
    //     setIsLoading(true);
    //     await programService.getAll().then((response : any)=>{
    //         setPrograms(response);
    //     });
    //     setIsLoading(false);
    // }
    const { headerInfo, isLoading, isError } = headerInfoService.GetById("program");
    const {data, error, mutate} = programService.GetAll();

    useEffect(() => {
        if (headerInfo) {  
            if(headerInfo.imgSrc){
                setHeaderImgSrc(headerInfo.imgSrc);
            }
        }
    }, [headerInfo]);

    
    useEffect(()=>{
        if(data){
            setPrograms(data)
        }
    },[data])

    if(!data){
        return <div className="h-screen"><Loading /></div>
    }


    if (isLoading) {
    return (
        <div className="h-screen">
        <Loading />
        </div>
    );
    }


    
  if (!headerInfo ) {
    return (
      <div className="h-screen">
        {undefined}
      </div>
    );
  }

    
    return (
        <div className="border-0 border-0-red-700 min:h-[2036px]" >
            {/* Header */}
            <PageHeader
                src={imgAddress + headerImgSrc}
                title={"프로그램"}
                subTitle1={headerInfo.introduction1}
                subTitle2={headerInfo.introduction2}
                alt={"program-header"}
            />

            {/* stay list */}
            <CardWrapper>
                { programs && programs.length > 0 && programs.map( (program : Program, index : number) => (
                    <Card
                        key={`program-wrapper-${index}`}
                        name={program.name} 
                        address={program.subName}     
                        images={[program.img]} 
                        onClickImage={()=>onClickGoToDetail(program)} 
                        wrapperId={program.id!.toString()} 
                        alt={`program-wrapper-card-${index}`}
                         >
                        {program.introduction}
                    </Card>
                ))}             
            </CardWrapper>
        </div>
    )
}