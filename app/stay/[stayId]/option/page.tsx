"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { StayPillOption } from "@/lib/enums";
import { Options } from "@/lib/tempData";

import { 
    StayWrapper
} from "../../component";
import { StayType } from "@/types";
import { GrayRoundButton } from "@/components/ui/Button";
import { PageHeader, OptionPills, BackButtonWrapper, SomeErrorPage, Loading } from "@/components/layout";
import { Card } from "@/components/ui";
import { optionService } from "@/service";


export default function StayOptions(){
    const router = useRouter();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const { stayId } = params;

    const { options, optionsError, optionsMutate  } = optionService.GetByStayId(stayId as string);

    if (optionsError) {
        console.log(optionsError)
        return (
            <SomeErrorPage onClickFunction={() => router.push("/admin")} error={optionsError.message} />
        );
    }

    const handleOptionClick = useCallback((optionId: string | undefined) => {
        if(typeof(stayId) == 'string' && typeof(optionId) == 'string'){
            router.push(`/stay/${stayId}/option/${optionId}`);
        }
    },[router, stayId]);

    const handleReturnClick = useCallback(() => {
        router.push(`/stay`);
    },[]);

    const renderedOptions = useMemo(() => {
        return options.map((option : StayType.Option, index : number) => (
            <Card
                key={`option-list-${index}`} // Ensure each element has a unique key
                name={option.name}
                address={option.introduction}
                images={option.mainImgs}
                wrapperId={index.toString()} // Ensure each element has a unique id
                onClickImage={() => handleOptionClick(option.id?.toString())}
                alt={"option"+index.toString()}
            >
                <div dangerouslySetInnerHTML={{__html: option.content || ''}} />
            </Card>
        ));
    }, [options, handleOptionClick])

    
    return(
        
        isLoading ? <div className="h-screen"><Loading /></div> : <div className="border-0 border-0-red-700 pb-10" >

            {/* Header */}
            <PageHeader src={"/images/cover-program.png"} title={"옵션"} subTitle1={"아래 옵션을 통해 숲에서 더 풍성한 추억을 쌓아보세요."} alt={"soop-option-header"} />

            {/* pills */}
            <OptionPills pills={[{
                targetVal : StayPillOption.rooms,
                name : '객실',
                onClickFunction : ()=>{ setIsLoading(true); router.push(`/stay/${stayId}/rooms`); },
            }, {
                targetVal : StayPillOption.option,
                name : '옵션',
                onClickFunction : ()=>{ setIsLoading(true); router.push(`/stay/${stayId}/option`); },
            }]} currentPill={StayPillOption.option} />

            {/* stay list */}
            {/*  items-center justify-center  mb-10   */}
            <div className={`container md:mx-auto grid gird-cols-1  md:grid-cols-3 gap-x-5 gap-y-14 px-5 md:px-14 }`}>
                {renderedOptions}
            </div>

            {/* div className="container py-10 px-5 md:mx-auto grid grid-cols-1 items-start justify-center md:grid-cols-3 gap-5 md:gap-12"> */}

             {/* return button */}
            <div className="mt-10">
                <BackButtonWrapper btnName={"목록으로"} onBtnClickFunction={handleReturnClick} />
            </div>
           
        </div>
    )
}