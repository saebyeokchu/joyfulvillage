import { useEffect, useRef, useState } from "react";
import { bizService, homeServcie } from "@/service";
import { EditBox } from "../_component";
import { EditButton } from "@/components/ui";

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

