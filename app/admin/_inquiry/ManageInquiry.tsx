import { EditButton } from "@/app/_component/Button";
import Preview from "@/app/_component/Preview";
import { useEffect, useRef, useState } from "react";
import { AxiosResponse, HomeSection } from "@/app/_data/Enums";
import { isStrValid } from "@/app/_lib/Common";
import { homeServcie } from "@/app/_service";
import { GetHomeData } from "@/app/_api/Home";
import EditBox from "../_component/EditBox";
import { CustomTextInput } from "@/app/_component/CustomInput";

export default function ManageInquiry(){
    const [ showPreview, setShowPreview ]= useState<boolean>(false);
    const [ openAddQna, setOpenAddQna ]= useState<boolean>(false);
    const address : string = "주소 경상북도 영덕군 남정면 산정로 320";

    const getInquriyData = () => {
        
    }
    
    const editInquiryData = () => {

    }

    const addNewQna = () => {

    }

    return (
        <>
        <div className="p-20 w-2/3 h">
            { showPreview && <Preview closePreview={()=>setShowPreview(false)} previewUrl={"/home"} /> }

            {/* edit header */}
            <div className="flex justify-between w-full"> 
                <div className="flex flex-row ">
                    <div className="font-bold text-4xl">문의하기 관리</div>
                </div>
                <div className="flex flex-row space-x-3">
                    <EditButton onClickFunction={()=>setShowPreview(!showPreview)} btnName={"미리보기"} />
                    <EditButton onClickFunction={editInquiryData} btnName={"수정하기"} />
                </div>
            </div>

            {/* content */}
            <EditBox title="주소 내용 수정하기">
                <CustomTextInput placeholder={address} textRef={undefined} />
            </EditBox>

            <EditBox title="자주 묻는 질문 관리하기">
                <div className="flex flex-rol space-x-2">
                    <EditButton onClickFunction={undefined} btnName={"질문 순서 관리하기"} />
                    <div aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">
                        <EditButton onClickFunction={()=>setOpenAddQna(true)} btnName={"질문 추가하기"} />
                    </div>
                </div>

                <div className="mt-4">
                    <p className="font-bold">질문 1</p>
                    <div className="mt-3 flex flex-col space-y-2">
                        <CustomTextInput placeholder={"질문"} textRef={undefined} />
                        <CustomTextInput placeholder={"답변"} textRef={undefined} />
                    </div>
                </div>

            </EditBox>

            { openAddQna && <div id="hs-basic-modal" className=" size-full fixed top-0 start-0 opacity-100 overflow-x-hidden transition-all overflow-y-auto pointer-events-none" role="dialog" aria-labelledby="hs-basic-modal-label">
                <div className="h-full w-full bg-black absolute bg-opacity-25 overflow-y-hidden"></div>
                <div className="fixed top-0 left-1/3 sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col  shadow-sm rounded-xl pointer-events-auto bg-white">
                    <div className="flex justify-between items-center py-3 px-4 ">
                        <h3 id="hs-basic-modal-label" className="font-bold ">
                        질문 추가하기
                        </h3>
                        <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent hover:bg-point-darker focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none " onClick={()=>setOpenAddQna(false)}>
                        <span className="sr-only">Close</span>
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        <div className=" flex flex-col space-y-2">
                            <CustomTextInput placeholder={"질문"} textRef={undefined} />
                            <CustomTextInput placeholder={"답변"} textRef={undefined} />
                        </div>
                        <div className="mt-3 w-full flex justify-center space-x-3">
                            <EditButton onClickFunction={()=>setOpenAddQna(false)} btnName={"닫기"} />
                            <EditButton onClickFunction={addNewQna} btnName={"질문 추가하기"} />
                        </div>
                    </div>
                    </div>
                </div>
            </div> }
            
        </div>

       

        </>
    )
}

