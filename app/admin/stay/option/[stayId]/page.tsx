"use client"
import React, { useState } from "react";

import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

import { IndigoRoundButton } from "@/components/ui/Button";
import { GeneralError } from "@/lib/messages";
import { Loading, SomeErrorPage } from "@/components/layout";
import { Card } from "@/components/ui";
import {  GetAllStay, GetOptionDataByStayId } from "@/lib/url";
import { getFetcher } from "@/lib/fetcher";
import { AboutApi, OptionApi, StayApi } from "@/api";
import { StayType } from "@/types";
import { useStayContext } from "@/context/StayContext";
import { useMemo } from "react";
import { FilledIndigoBadge } from "@/components/ui/Badge";
import AdminWrapper from "@/app/admin/component/AdminWrapper";
import { optionService } from "@/service";


export default function ManageOption(){
    const router = useRouter();
    const stayContext = useStayContext();
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const { stayId } = params;
    
    const { options, optionsError , optionsMutate  } = optionService.GetByStayId(stayId as string);

    if (optionsError) {
        console.log(optionsError)
        return (
            <SomeErrorPage onClickFunction={() => router.push("/admin")} error={optionsError.message} />
        );
    }

    const onClickSaveBtn = () => {
        router.push(`/admin/stay/option/${stayId}/upsert`);
    }

    const onClickEditBtn = (option : StayType.Option) => {
        router.push(`/admin/stay/option/${stayId}/upsert/?id=`+option.id);
    }

    const onClickDeleteBtn = ( id : number | undefined) => {
        if(id) {
            if(window.confirm("해당 옵션" + GeneralError.verifyDeletion)){
                const response = OptionApi.DeleteById(id)
                if(response){
                    window.alert(GeneralError.successfullyDeleted);
                    optionsMutate();
                }else{
                    window.alert(GeneralError.unknownError + GeneralError.tryLater);
                }
            }
        }
    }

    return (
        isLoading ? <AdminWrapper><Loading /></AdminWrapper> : <AdminWrapper>
            <div className="flex flex-row justify-between">
                <span className="text-xl font-bold mt-3">옵션</span>
                <div className="flex flex-row space-x-3 justify-between">
                    <IndigoRoundButton onClickFunction={()=>router.push("/admin/stay")} btnName={"스테이로 돌아가기"} />
                    <IndigoRoundButton onClickFunction={onClickSaveBtn} btnName={"추가하기"} />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-12 mt-3">
                { options && options.map((d : StayType.Option)=>
                    <div key={`about-manage-${d.id}`} >
                        <Card 
                            name={d.name} 
                            address={d.introduction} 
                            images={d.mainImgs} 
                            onClickImage={()=>onClickEditBtn(d)} 
                            wrapperId={d.id!.toString()} 
                            alt={""}
                            bgColor="bg-white p-5"
                        >
                            
                            <div className="flex flex-row space-x-1 justify-center">
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

