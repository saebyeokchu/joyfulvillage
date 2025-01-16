import { EditButton } from "@/app/_component/Button"
import { Sokso } from "@/app/_data/Sokso"
import { useState } from "react";
import AddNewSokso from "./AddNewSokso";
import EditSokso from "./EditSokso";
import { useRouter } from "next/navigation";

export default function LevelOneSokso({
} : {
}) { 
    const router = useRouter();

    const [showAddNewSokso, setAddNewSokso] = useState(false);
    const [showEditSokso, setEditSokso] = useState(false);

    return(
        <>
        <div className="flex flex-row space-x-3 mt-3">
                    <EditButton onClickFunction={()=>setAddNewSokso(true)} btnName={"추가하기"} />
                </div>
                    <div className="flex flex-col space-y-3  mt-3">
            {Sokso.filter(e=>e.level==1 ).map((sokso : any)=>
                <div key={`level-one-${sokso.id}`} className="w-2/3 border border-gray-200 rounded-lg hover:shadow-sm focus:outline-none " >
                    <div className="relative flex items-center overflow-hidden ">
                        <img className="w-32 sm:w-48 h-full absolute inset-0 object-cover rounded-s-lg" src={sokso.mainImg} alt="Blog Image" />
                        <div className="grow p-4 ms-32 sm:ms-48"> 
                            <div className="min-h-24 flex flex-col justify-center">
                                <h3 className="font-semibold text-sm text-gray-800 ">
                                {sokso.name}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 ">
                                {sokso.introduction}
                                </p>
                            </div>
                            <div className="flex flex-row space-x-3">
                                <EditButton onClickFunction={undefined} btnName={"삭제하기"} />
                                <EditButton onClickFunction={()=>setEditSokso(true)} btnName={"숙소 대표 내용 수정하기"} />
                                <EditButton onClickFunction={()=>router.push("/admin?m=sokso&p="+sokso.id)} btnName={"상세 내용 수정하기"} />
                            </div>
                        </div>
                    </div>
                </div>   
            )}
        </div>
            { showAddNewSokso && <AddNewSokso close={()=>setAddNewSokso(false)}/> }
            { showEditSokso && <EditSokso close={()=>setEditSokso(false)}/> }
        </>
    )
}