"use client"
import React from "react";

import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

import { IndigoRoundButton } from "@/components/ui/Button";
import { GeneralError } from "@/lib/messages";
import { Loading, SomeErrorPage } from "@/components/layout";
import { Card } from "@/components/ui";
import {  GetAllStay, GetOptionDataByStayId } from "@/lib/url";
import { getFetcher } from "@/lib/fetcher";
import { AboutApi, OptionApi, RoomApi, StayApi } from "@/api";
import { StayType } from "@/types";
import { useStayContext } from "@/context/StayContext";
import { useMemo } from "react";
import { FilledIndigoBadge } from "@/components/ui/Badge";
import AdminWrapper from "@/app/admin/component/AdminWrapper";
import { optionService, roomService } from "@/service";


export default function ManageRoom(){
    const router = useRouter();
    const stayContext = useStayContext();
    const params = useParams();
    const { stayId } = params;
    
    const { processedData, error, mutate  } = roomService.GetByStayId(stayId as string);

    if (error) {
        console.log(error)
        return (
            <SomeErrorPage onClickFunction={() => router.push("/admin")} error={error.message} />
        );
    }

    const onClickSaveBtn = () => {
        router.push(`/admin/stay/room/${stayId}/upsert/`);
    }

    const onClickEditBtn = (option : StayType.Room) => {
        router.push(`/admin/stay/room/${stayId}/upsert/?id=`+option.id);
    }

    const onClickDeleteBtn = ( id : any) => {
        if(id) {
            if(window.confirm("해당 객실" + GeneralError.verifyDeletion)){
                const response = RoomApi.DeleteById(id)
                if(response){
                    window.alert(GeneralError.successfullyDeleted);
                    mutate();
                }else{
                    window.alert(GeneralError.unknownError + GeneralError.tryLater);
                }
            }
        }
    }

    return (
        <AdminWrapper>
            <div className="flex flex-row justify-between">
                <span className="text-xl font-bold mt-3">객실</span>
                <div className="flex flex-row space-x-3 justify-between">
                    <IndigoRoundButton onClickFunction={()=>router.push("/admin/stay")} btnName={"스테이로 돌아가기"} />
                    <IndigoRoundButton onClickFunction={onClickSaveBtn} btnName={"추가하기"} />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-12 mt-3">
                { processedData && processedData.map((d : StayType.Room)=>
                    <div key={`about-manage-${d.id}`} >
                        <Card 
                            name={d.name} 
                            address={d.structure} 
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

