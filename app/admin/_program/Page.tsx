import { EditButton } from "@/app/_component/Button";
import { Programs } from "@/app/_data/Programs";
import { Soops } from "@/app/_data/Room";
import { Sokso } from "@/app/_data/Sokso";
import { useState } from "react";


export default function ManageProgram(){
    const [showLevelTwoList, setShowLevelTwoList] = useState(false);
    const [levelTwoParentId, setlevelTwoParentId] = useState(false);

    return (
        <div className="flex flex-col p-20">
            <div>
                <p className="font-bold text-4xl">프로그램 관리</p>
            </div>
            <div className="flex flex-row space-x-3 mt-3">
                <EditButton onClickFunction={undefined} btnName={"추가하기"} />
            </div>
            <div className="flex flex-col space-y-3  mt-3">
            {Programs.map((program : any)=>
                <a className="w-2/3 border border-gray-200 rounded-lg hover:shadow-sm focus:outline-none " href="#">
                    <div className="relative flex items-center overflow-hidden ">
                        <div className="w-96 p-4 ms-32 sm:ms-48"> 
                            <div className="min-h-24 flex flex-col justify-center">
                                <h3 className="font-semibold text-sm text-gray-800 ">
                                {program.name}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 ">
                                {program.subname}
                                </p>
                            </div>
                            <div>
                                <EditButton onClickFunction={undefined} btnName={""} />
                            </div>
                        </div>
                    </div>
                </a>)}

               
            </div>
        </div>
    )
} 