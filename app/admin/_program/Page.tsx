import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

import { Program } from "@/app/_data/Types";
import { programService } from "@/app/_service";
import { EditButton } from "@/app/_component";
import ListProgram from "./_component/List";
import UpsertProgram from "./_component/Upsert";
import { ProgramClass } from "@/app/_data/_class/ProgramClass";


export default function ManageProgram(){
    const router = useRouter();
    const [ programs, setPrograms ] = useState<Program[]>([]);
    const [ targetProgram, setTargetProgram ] = useState<ProgramClass>(new ProgramClass());
    const [ option, setOption ] = useState<string>("목록");
    
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        programService.getAll().then((response : any)=>{
            setPrograms(response);
        });
    }

    const onClickAddProgram = () => {
        setTargetProgram(new ProgramClass());
        setOption("추가");
    }

    const onClickListProgram = () => {
        setOption("목록");
    }

    const onClickEditeBtn = (program : Program) => {
        targetProgram.setProgram(program);
        setTargetProgram(targetProgram);
        setOption("수정");
    }

    return (
        <div className="flex flex-col p-20">
            <div className="flex flex-col justify-between w-full">
                <div className="font-bold text-4xl">프로그램 관리</div>
                { option == "목록" && <ListProgram onClickAddProgram={onClickAddProgram} onClickEditeBtn={onClickEditeBtn} /> }
                { ( option == "추가" || option == "수정" ) && <UpsertProgram onClickListProgram={onClickListProgram} targetProgram={targetProgram} /> }
            </div>
        </div>
    )
} 