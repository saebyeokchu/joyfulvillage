import { EditButton } from "@/app/_component/Button"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UpsertSokso } from "../action";
import { soksoService } from "@/service";
import { Sokso } from "@/types/Types";
import { GeneralError } from "@/lib/messages";

export default function LevelTwoSokso({
    parent
} : {
    parent : string
}) {
    const router = useRouter();

    const [showUpsertSokso, setShowUpsertSokso] = useState(false);

    const [ soksos, setSoksos ] = useState<Sokso[]>([]);
    const [ parentSokso, setParentSokso ] = useState<Sokso | null>(null);

    const [editTargetSokso, setEditTargetSokso] = useState<Sokso | null>(null);

    useEffect(()=>{
        init();
    },[]);

    const init = () => {
        if(typeof(parent) == 'string'){ //url check
            //call parent info
            soksoService.getSoksoById( parseInt(parent)).then((response : any)=>{
                setParentSokso(response);
            });

            soksoService.getSoksoByLevelAndGroup(2, parseInt(parent)).then((response : any)=>{
                console.log(response)
                setSoksos(response);
            });
        }
    }

    const updateSoksos = () => {
        soksoService.getSoksoByLevelAndGroup(2, parseInt(parent)).then((response : any)=>{
            console.log(response)
            setSoksos(response);
        });
    }

    const onClickEditSokso = (sokso : Sokso) => {
        if(sokso){
            setEditTargetSokso(sokso);
            setShowUpsertSokso(true);
        }else{
            window.alert(GeneralError.notValidInfo);
        }
    }

    const onClickDeleteSokso = async (soksoId : number | null, soksoName : string) => {
        if(soksoId){
            if(window.confirm(soksoName+GeneralError.verifyDeletion))
            {
                await soksoService.deleteSoksoById(soksoId).then(response=>{
                    if(response){
                        updateSoksos();
                    }
                })
            }
        }else{
            window.alert(GeneralError.notValidInfo);
        }
    }
    
    return(
        <>
        <div className="flex flex-row space-x-3 mt-3">
            <EditButton onClickFunction={()=>setShowUpsertSokso(true)} btnName={"추가하기"} />
        </div>
            <div className="flex flex-col space-y-3  mt-3">
            {soksos.filter(e=>e.level==2 && e.group==parseInt(parent)).map((sokso : Sokso)=>
                <div key={`leveltwo-sokso-${sokso.id}`} className="w-2/3 border border-gray-200 rounded-lg hover:shadow-sm focus:outline-none " >
                    <div className="relative flex items-center overflow-hidden ">
                        <img className="w-32 sm:w-48 h-full absolute inset-0 object-cover rounded-s-lg" src={"/images/"+sokso.mainImg} alt="Blog Image" />
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
                                <EditButton onClickFunction={()=>onClickDeleteSokso(sokso.id, sokso.name)} btnName={"삭제하기"} />
                                <EditButton onClickFunction={()=>onClickEditSokso(sokso)} btnName={"내용 수정하기"} />
                                <EditButton onClickFunction={()=>router.push("/admin?m=sokso&p="+parent+"&id="+sokso.id)} btnName={"상세페이지 수정하기"} />
                            </div>
                        </div>
                    </div>
                </div>   
            )}
            </div>

            { showUpsertSokso && <UpsertSokso level={2} onCloseModal={() => setShowUpsertSokso(false)} updateSoksos={updateSoksos} targetSokso={editTargetSokso} group={parseInt(parent)} /> }
        </>
    )
}