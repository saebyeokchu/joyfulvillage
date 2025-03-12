"use client"


import { CustomTextInput, EditButton, FilledBadge, OutlineBadge } from "@/components/ui";
import { useRef } from "react";
import AdminWrapper from "../../component/AdminWrapper";
import { IndigoRoundButton } from "@/components/ui/Button";
import { Loading, SomeErrorPage } from "@/components/layout";
import useSWR from "swr";
import { Cafe } from "@/types/Types";
import { GetCafeDataBySection } from "@/lib/url";
import { getFetcher, postFetcher } from "@/lib/fetcher";
import { CafeSection } from "@/lib/enums";
import { useRouter } from "next/navigation";
import { GeneralError } from "@/lib/messages";
import { cafeService, homeService } from "@/service";


export default function HomeIntroduction(){

    const router = useRouter();
    const textRef = useRef<any>(null);
    const { middleTitle  } = homeService.GetMiddleTitle()

    if(!middleTitle){
        return <AdminWrapper>{""}</AdminWrapper>
    }

    const onClickAddBtn = () => {
        const text = textRef.current;

        if(text){
            if(text.value != ''){
                console.log(text.value);
                const response = homeService.UpdateMiddleTitle(text.value);
                if(response){
                    window.alert(GeneralError.success);
                }else{
                window.alert(GeneralError.unknownError + GeneralError.tryLater);
                }
            }else{
                window.alert(GeneralError.fillTheAllTheForm);
            }

        }else{
            window.alert(GeneralError.unknownError + GeneralError.tryLater);
        }
    }

    return (
        <>
            <AdminWrapper>
                <div className="flex flex-row space-x-3 justify-between">
                    <span className="text-xl font-bold mt-3">중간 소개글</span>
                    <IndigoRoundButton onClickFunction={() => onClickAddBtn()}  btnName={"저장하기"} /> 
                </div>
                <div className="mt-3">
                    { typeof middleTitle == "string" && <CustomTextInput inputVal={middleTitle} width="w-2/3" textRef={textRef} placeholder={"조이풀 빌리지 중간 소개글"} csProps={"border-0"} /> }
                </div>
            </AdminWrapper>
           
         
        </>
    )
}