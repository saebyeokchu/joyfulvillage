"use client"
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"

import { Program } from "../../types/Types";
import { programService } from "../../service";
import { BreadCrumbs, Card, CardWrapper } from "@/components/ui";
import { useProgramContext } from "@/context/ProgramContext";
import { Loading, PageHeader } from "@/components/layout";

// 숙소전체보기
export default function ProgramPage(){
    const router = useRouter();
    const programContext = useProgramContext();
    const [isLoading, setIsLoading] = useState(false);

    const [ programs, setPrograms ] = useState<Program[]>([]);

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

    const {data, error, mutate} = programService.GetAll();

    console.log(data);
    
    useEffect(()=>{
        if(data){
            setPrograms(data)
        }
    },[data])

    if(!data){
        return <div className="h-screen"><Loading /></div>
    }

    const onClickGoToDetail = (program : Program) => {
        setIsLoading(true);
        programContext.currentProgram.setProgram(program);
        router.push("/program/" + program.id);
        setIsLoading(false);
    }

    
    return (
        isLoading ? <div className="h-screen"><Loading /></div> : 
        <div className="border-0 border-0-red-700 " >
            {/* Header */}
            <PageHeader src={"/images/cover-program.png"} title={"프로그램"} subTitle1={"조이풀 빌리지의 경험을 풍부하게 만드는 프로그램 입니다."} alt={"program-header"} />

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
                        alt={`program-wrapper-card-${index}`} >
                        {program.introduction}
                    </Card>
                ))}             
            </CardWrapper>
        </div>
    )
}