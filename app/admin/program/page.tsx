"use client"

import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react"

import { Program } from "@/types/Types";
import { programService } from "@/service";
import { ProgramClass } from "@/class/ProgramClass";
import ListProgram from "./_component/List";
import UpsertProgram from "./upsert/page";
import AdminWrapper from "../component/AdminWrapper";
import { IndigoRoundButton } from "@/components/ui/Button";
import { GeneralError } from "@/lib/messages";
import { Loading } from "@/components/layout";
import { Card } from "@/components/ui";
import { useProgramContext } from "@/context/ProgramContext";


export default function ManageProgram(){
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {data, error, mutate} = programService.GetAll();
    console.log(data);
    
    if(!data){
        return <div className="h-screen"><Loading /></div>
    }

    const onClickEditeBtn = (program : Program) => {
        setIsLoading(true);
        // targetProgram.setProgram(program);
        // setTargetProgram(targetProgram);
        router.push("/admin/program/upsert/?programId="+program.id);
    }

    const onClickDeleteBtn = ( id : number | null , name : string) => {
        if(id) {
            if(window.confirm(name+GeneralError.verifyDeletion)){
                programService.deleteById(id).then(response=>{
                    if(response){
                        mutate();
                        window.alert(GeneralError.successfullyDeleted);
                    }else{
                        window.alert(GeneralError.unknownError + GeneralError.tryLater);
                    }
                });
            }
        }
        
    }

    return (
        <AdminWrapper>
            <div className="flex flex-row space-x-3 justify-end">
                <IndigoRoundButton onClickFunction={() => router.push(`/admin/program/upsert`)} btnName={"추가하기"} />
            </div>
            { isLoading ? <Loading /> :
            <div className="grid grid-cols-3 gap-12 mt-3">
                { data && data.map((program : Program)=>
                    <div key={`program-manage-${program.id}`} >
                        <Card 
                            name={program.name} 
                            address={program.subName} 
                            images={[program.img]} 
                            onClickImage={()=>onClickEditeBtn(program)} 
                            wrapperId={program.id!.toString()} 
                            alt={""}
                            bgColor="bg-white p-5"
                        >
                            {program.introduction}
                            <div className="flex flex-row space-x-3 justify-center mt-5">
                                <IndigoRoundButton onClickFunction={()=>onClickEditeBtn(program)} btnName={"수정하기"} />
                                { program.id && <IndigoRoundButton onClickFunction={()=>onClickDeleteBtn(program.id, program.name)} btnName={"삭제하기"} /> }
                            </div>
                        </Card>
                        {/* <div className="relative flex items-center overflow-hidden ">
                            <img className="w-32 sm:w-48 h-full absolute inset-0 object-cover rounded-s-lg" src={"/images/"+program.img} alt="Program Image" />
                            <div className="grow p-4 ms-32 sm:ms-48"> 
                                <div className="min-h-24 flex flex-col justify-center">
                                    <h3 className="font-semibold text-sm text-gray-800 ">
                                    {program.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500 ">
                                    {program.subName}
                                    </p>
                                </div>
                                <div className="flex flex-row space-x-3">
                                    <IndigoRoundButton onClickFunction={()=>onClickEditeBtn(program)} btnName={"수정하기"} />
                                    <IndigoRoundButton onClickFunction={()=>onClickDeleteBtn(program.id, program.name)} btnName={"삭제하기"} />
                                </div>
                            </div>
                        </div> */}
                    </div>
                )}
            </div>
            }            

        </AdminWrapper>
    )
} 