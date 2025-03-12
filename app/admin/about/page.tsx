"use client"

import { useRouter, useSearchParams } from "next/navigation";

import { IndigoRoundButton } from "@/components/ui/Button";
import { GeneralError } from "@/lib/messages";
import { Loading, SomeErrorPage } from "@/components/layout";
import { Card } from "@/components/ui";
import useSWR from "swr";
import { AboutType } from "@/types/About";
import { GetAllAbout } from "@/lib/url";
import { getFetcher } from "@/lib/fetcher";
import { useAboutContext } from "@/context/AboutContext";
import { AboutApi } from "@/api";
import AdminWrapper from "../component/AdminWrapper";


export default function ManageAbout(){
    const router = useRouter();

    const { data, error, mutate  } = useSWR<AboutType[]>(
        GetAllAbout,
        getFetcher
    );

    if (error) {
        return (
            <SomeErrorPage onClickFunction={() => router.push("/admin")} error={error.message} />
        );
    }
    
    const onClickSaveBtn = () => {
        router.push(`/admin/about/upsert`);
    }

    const onClickEditBtn = (about : AboutType) => {
        router.push("/admin/about/upsert?adminId="+about.id);
    }

    const onClickDeleteBtn = ( id : any ) => {
        if(id) {
            if(window.confirm("해당 소개글" + GeneralError.verifyDeletion)){
                AboutApi.DeleteById(id).then(response=>{
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
                <IndigoRoundButton onClickFunction={onClickSaveBtn} btnName={"추가하기"} />
            </div>
            <div className="grid grid-cols-3 gap-12 mt-3">
                { data && data.map((d : AboutType)=>
                    <div key={`about-manage-${d.id}`} >
                        <Card 
                            name={d.title} 
                            address={d.address} 
                            images={[d.imgSrc]} 
                            onClickImage={()=>onClickEditBtn(d)} 
                            wrapperId={d.id!.toString()} 
                            alt={""}
                            bgColor="bg-white p-5"
                            hideImg={d.title==="joyful"}
                        >
                            
                            <div className="flex flex-row space-x-3 justify-center">
                                <IndigoRoundButton onClickFunction={()=>onClickEditBtn(d)} btnName={"수정하기"} />
                                { d.title!= 'joyful'  && <IndigoRoundButton onClickFunction={()=>onClickDeleteBtn(d.id)} btnName={"삭제하기"} /> }
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </AdminWrapper>
    )
} 