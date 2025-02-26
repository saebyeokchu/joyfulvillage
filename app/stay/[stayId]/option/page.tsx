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
import { PageHeader, OptionPills } from "@/components/layout";


export default function StayOptions(){
    const router = useRouter();
    const params = useParams();
    const { stayId } = params;

    const [options, setOptions] = useState<StayType.Option[]>([]);
    

    useEffect(()=>{
        init();
    },[]);

    const init = () => {
        if(typeof(stayId) == 'string'){ //url check
            console.log("[stayId] : ", stayId);
            setOptions(Options);
        }
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
            <StayWrapper
                key={`option-list-${index}`} // Ensure each element has a unique key
                name={option.name}
                address={option.introduction}
                images={option.mainImg}
                wrapperId={index.toString()} // Ensure each element has a unique id
                onClickImage={() => handleOptionClick(option.id?.toString())}
                alt={"option"+index.toString()}
            >
                <div dangerouslySetInnerHTML={{__html: option.content}} />
            </StayWrapper>
        ));
    }, [options, handleOptionClick])

    
    return(
        
        <div className="border-0 border-0-red-700 pb-10" >

            {/* Header */}
            <PageHeader src={"/images/barbecue3.jpeg"} title={"옵션"} subTitle={"아래 옵션을 통해 숲에서 더 풍성한 추억을 쌓아보세요."} alt={"soop-option-header"} />

            {/* pills */}
            <OptionPills pills={[{
                targetVal : StayPillOption.rooms,
                name : '객실',
                onClickFunction : ()=>router.push(`/stay/${stayId}/rooms`),
            }, {
                targetVal : StayPillOption.option,
                name : '옵션',
                onClickFunction : ()=>router.push(`/stay/${stayId}/option`),
            }]} currentPill={StayPillOption.option} />

            {/* stay list */}
            {/*  items-center justify-center  mb-10   */}
            <div className="container md:mx-auto grid gird-cols-1 items-center   justify-center md:grid-cols-3 gap-12 px-5 md:px-8">
                {renderedOptions}
            </div>

             {/* return button */}
             <div className="container px-5 md:mx-auto mt-10 border-0 border-red-400 flex justify-end">
                <GrayRoundButton btnName={"목록으로"} onClickFunction={handleReturnClick}/>
            </div>
           
        </div>
    )
}