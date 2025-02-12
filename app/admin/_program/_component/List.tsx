import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

import { Program } from "@/types/Types";
import { programService } from "@/service";
import { EditButton } from "@/app/_component";
import { GeneralError } from "@/lib/messages";


export default function ListProgram({
    onClickAddProgram,
    onClickEditeBtn
} : {
    onClickAddProgram : any,
    onClickEditeBtn : any
}){
    const [ programs, setPrograms ] = useState<Program[]>([]);
    
    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        console.log(programs)
    }, [programs]);

    const init = () => {
        updateProgramList();
    }

    const updateProgramList = () => {
        programService.getAll().then((response : any)=>{
            setPrograms(response);
        });
    }

    const onClickDeleteBtn = ( id : number , name : string) => {
        if(window.confirm(name+GeneralError.verifyDeletion)){
            programService.deleteById(id).then(response=>{
                if(response){
                    updateProgramList();
                    window.alert(GeneralError.successfullyDeleted);
                }else{
                    window.alert(GeneralError.unknownError + GeneralError.tryLater);
                }
            });
        }
    }

    return (
        <>
            <div className="mt-3">
                <EditButton onClickFunction={onClickAddProgram} btnName={"추가하기"} />
            </div>
            <div className="flex flex-col space-y-3 mt-3">
                { programs.map((program : Program)=>
                    <div key={`program-manage-${program.id}`} className="w-full border border-gray-200 rounded-lg hover:shadow-sm focus:outline-none " >
                        <div className="relative flex items-center overflow-hidden ">
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
                                    <EditButton onClickFunction={()=>onClickEditeBtn(program)} btnName={"수정하기"} />
                                    <EditButton onClickFunction={()=>onClickDeleteBtn(program.id, program.name)} btnName={"삭제하기"} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
} 