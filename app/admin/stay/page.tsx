"use client"

import { useRouter } from "next/navigation";
import useSWR from "swr";

import AdminWrapper from "../component/AdminWrapper";
import { IndigoRoundButton } from "@/components/ui/Button";
import { GeneralError } from "@/lib/messages";
import { Loading, SomeErrorPage } from "@/components/layout";
import { Card } from "@/components/ui";
import {  GetAllStay } from "@/lib/url";
import { getFetcher } from "@/lib/fetcher";
import { AboutApi, StayApi } from "@/api";
import { StayType } from "@/types";
import { useStayContext } from "@/context/StayContext";
import { useMemo, useState } from "react";
import { FilledIndigoBadge } from "@/components/ui/Badge";


export default function ManageStay(){
    const router = useRouter();
    const stayContext = useStayContext();

    const [isLoading, setIsLoading] = useState(false);

    const { data, error, mutate  } = useSWR<any[]>(
        GetAllStay,
        getFetcher
    );

    if (error) {
        return (
            <SomeErrorPage onClickFunction={() => router.push("/admin")} error={error.message} />
        );
    }

    const processedData = useMemo(() => (
        data 
          ? data.map((d: any) => ({
              ...d,
              mainImgs: typeof d.mainImgs === 'string' ? d.mainImgs.split(";") : d.mainImgs,
            }))
          : []
      ), [data]);

    const onClickSaveBtn = () => {
        setIsLoading(true);
        // stayContext.targetStay = undefined;
        router.push(`/admin/stay/upsert`);
        setIsLoading(false);
    }

    const onClickEditBtn = (about : StayType.Stay) => {
        setIsLoading(true);
        // stayContext.targetStay = about;
        router.push("/admin/stay/upsert/?id="+about.id);
        setIsLoading(false);
    }

    const onClickDeleteBtn = ( id : any) => {
        if(id) {
            if(window.confirm("해당 스테이" + GeneralError.verifyDeletion)){
                setIsLoading(true);
                const response = StayApi.DeleteById(id)
                if(response){
                    mutate();
                    window.alert(GeneralError.successfullyDeleted);
                }else{
                    window.alert(GeneralError.unknownError + GeneralError.tryLater);
                }
                setIsLoading(false);
            }
        }
        
    }
    return (
        isLoading ? <AdminWrapper><Loading /></AdminWrapper> : 
        <AdminWrapper>
            <div className="flex flex-row space-x-3 justify-end">
                <IndigoRoundButton onClickFunction={onClickSaveBtn} btnName={"추가하기"} />
            </div>
            <div className="grid grid-cols-3 gap-12 mt-3">
                { processedData && processedData.map((d : StayType.Stay)=>
                    <div key={`about-manage-${d.id}`} >
                        <Card 
                            name={d.name} 
                            address={d.address} 
                            images={d.mainImgs} 
                            onClickImage={()=>onClickEditBtn(d)} 
                            wrapperId={d.id!.toString()} 
                            alt={""}
                            bgColor="bg-white p-5"
                        >
                            
                            <div className="flex flex-row space-x-1 justify-center">
                                {d.optionAvailable && <FilledIndigoBadge onClickFunction={()=>router.push("/admin/stay/option/"+d.id)} name={"옵션"} />}
                                <FilledIndigoBadge onClickFunction={()=>router.push("/admin/stay/room/"+d.id)} name={"객실"} />
                                <FilledIndigoBadge onClickFunction={()=>onClickEditBtn(d)} name={"수정하기"} />
                                <FilledIndigoBadge onClickFunction={()=>onClickDeleteBtn(d.id)} name={"삭제하기"} />
                            </div>
                        </Card>
                    </div>
                )} 
            </div>
        </AdminWrapper> 
    )
} 

