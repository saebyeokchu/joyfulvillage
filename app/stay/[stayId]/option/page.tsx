"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { StayPillOption } from "@/lib/enums";
import { Options } from "@/lib/tempData";

import OptionPills from "../component/OptionPills";
import { 
    StayHeader, 
    StayWrapper
} from "../../component";
import { StayType } from "@/types";
import { GrayRoundButton } from "@/components/ui/Button";


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
        
        <div className="border border-red-700 pb-10" >

            <StayHeader 
                src={"/images/barbecue3.jpeg"} 
                title={`여기 수정 옵션`} 
                subTitle={`아래 옵션을 통해 숲에서 더 풍성한 추억을 쌓아보세요`} 
                alt={"soop-option-header"} /> 
            
            {/* pills */}
            <OptionPills option={StayPillOption.option} onClickFunction={()=>router.push(`/stay/${stayId}/rooms`)} />

            {/* stay list */}
            {/*  items-center justify-center  mb-10   */}
            <div className="max-w-[85rem] mx-8 md:mx-auto grid gird-cols-1 md:grid-cols-3  gap-16 md:gap-12 mb-10">
                {renderedOptions}
            </div>

             {/* return button */}
             <div className="mt-10 flex justify-end border border-red-400 max-w-[85rem]  mx-8 md:mx-auto">
                <GrayRoundButton btnName={"목록으로"} onClickFunction={handleReturnClick}/>
            </div>
           
        </div>
    )
}