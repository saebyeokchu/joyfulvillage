import { DisabledEditButton, EditButton } from "@/app/_component/Button";
import Preview from "@/app/_component/Preview";
import { useEffect, useRef, useState } from "react";
import { AxiosResponse, HomeSection } from "@/app/_data/Enums";
import { findDuplicateAfterValues, isStrValid } from "@/app/_lib/Common";
import { bizService, homeServcie } from "@/app/_service";
import { GetHomeData } from "@/app/_api/Home";
import EditBox from "../_component/EditBox";
import { CustomNumberInput, CustomTextInput } from "@/app/_component/CustomInput";
import { getQnaList } from "@/app/_service/qnaService";
import { FilledBadge, OutlineBadge } from "@/app/_component/Badge";
import { DeleteQnaData, EditSortOrder, InsertQnaData, UpdateQna } from "@/app/_api/Qna";
import { EditBiz, GetKakao } from "@/app/_api/Biz";

export default function ManageBusniess(){

    const [bizs, setBizs] = useState(null);

    useEffect(()=>{
        init();
    },[]);

    
    const init = async () => {
        bizService.getAll().then((response : any)=>setBizs(response));
    }


    return (
        <>
        <div className="p-20 w-2/3 h">

            {/* edit header */}
            <div className="flex justify-between w-full"> 
                <div className="flex flex-row ">
                    <div className="font-bold text-4xl">운영 정보 관리</div>
                </div>
                <div className="flex flex-row space-x-3">
                    <EditButton onClickFunction={undefined} btnName={"수정하기"}/>
                </div>
            </div>

            {/* content */}
            <EditBox title="운영시간 수정하기">
                <div className="flex flex-col space-y-3 mt-2">
                    <p>월요일 ~ 토요일 </p>
                    {/* <p><CustomTextInput placeholder={address} textRef={longRef} /></p> */}
                </div>
                {/* <div className="flex flex-col space-y-3 mt-2">
                    <p>일요일 </p>
                    <p><CustomTextInput placeholder={address} textRef={lnagRef} /></p>
                </div> */}
            </EditBox>

            {/* <EditBox title="사업자 번호">
                <CustomTextInput placeholder={address} textRef={lnagRef} />
            </EditBox>

            <EditBox title="SNS설정하기">
                <div className="flex flex-col space-y-3 mt-2">
                    <p>유튜브 </p>
                    <p><CustomTextInput placeholder={address} textRef={lnagRef} /></p>
                </div>
                <div className="flex flex-col space-y-3 mt-2">
                    <p>인스타그램 </p>
                    <p><CustomTextInput placeholder={address} textRef={lnagRef} /></p>
                </div>
                <div className="flex flex-col space-y-3 mt-2">
                    <p>네이버 블로그 </p>
                    <p><CustomTextInput placeholder={address} textRef={lnagRef} /></p>
                </div>
                <div className="flex flex-col space-y-3 mt-2">
                    <p>기타 SNS </p>
                    <p><CustomTextInput placeholder={address} textRef={lnagRef} /></p>
                </div>
            </EditBox> */}

            
        </div>

       

        </>
    )
}

