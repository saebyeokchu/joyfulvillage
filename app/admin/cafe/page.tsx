"use client"

import { CafeSection, HomeSection } from "@/lib/enums";
import { useEffect, useRef, useState } from "react";
import { cafeService } from "@/service";
import { Cafe } from "@/types/Types";
import AdminWrapper from "../component/AdminWrapper";
import CafeWrapper from "./component/CafeWrapper";

export default function ManageCafe(){
    const [ selectedSection, setSelectedSection ]= useState<CafeSection>(CafeSection.subTitle);
    const [ cafeContent, setCafeContent ] = useState<Cafe[]>([]);
    const [ menus , setMenus ] = useState<Cafe[]>([]);
    const [ specials , setSpecials ] = useState<Cafe[]>([]);

    const subTitleRef = useRef<any>(null);

    useEffect(()=>{
        init();
    },[]);

    const init = () => {
        updateCafeContent();
    }

    const onClickMoveSection = (cafeSection : CafeSection) => {
        setSelectedSection(cafeSection);
        setInputContent(cafeContent);
        setMenuContent(cafeContent);
        setSpecialContent(cafeContent);
    }

    const setMenuContent = async (content : Cafe[]) => {
        const temp : Cafe[] | undefined = await cafeService.getCafeSection(content, CafeSection.menus);
        if(temp){
            setMenus(temp);
        }
    }

    const setSpecialContent = async (content : Cafe[]) => {
        const temp : Cafe[] | undefined = await cafeService.getCafeSection(content, CafeSection.specials);
        if(temp){
            setSpecials(temp);
        }
    }

    const setInputContent = async (content : Cafe[]) => {
        if(content.length > 0){
            const subTitle = await cafeService.getCafeSection(content,CafeSection.subTitle);

            if(subTitle && subTitleRef.current){
                subTitleRef.current.value = subTitle[0].content;
            }
        }
    }

    const updateCafeContent = async () => {
        await cafeService.getAll().then(async ( response : Cafe[] ) => {
            setCafeContent(response);

            //subtitle 설정하기 (처음에 나오는 페이지니까)
            setInputContent(response);
            setMenuContent(response);
            setSpecialContent(response);
        })
    }



    return (
        <>
            <AdminWrapper>
                <CafeWrapper subTitle={""}>
                    {''}
                {/* <div className="mt-3 flex flex-col space-y-7">
                    <div className="flex flex-col space-y-2">
                        <p className="text-xl font-semibold">카페 도천 소개글</p>
                        <CustomTextInput width="w-2/3" textRef={subTitleRef} placeholder={"카페 도천 소개 문구"} csProps={"border-0"} />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <p className="text-xl font-semibold">카페 도천 이미지</p>
                        <ManageMainImg cafeContent={cafeContent} updateCafeContent={updateCafeContent} />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <p className="text-xl font-semibold">카페 도천 메뉴판 이미지 수정하기</p>
                        <IndigoRoundButton btnName={"수정하기"} />
                        <ManageMenus menus={menus} updateCafeContent={updateCafeContent} />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <p className="text-xl font-semibold">카페 도천 특별메뉴 수정하기</p>
                        <IndigoRoundButton btnName={"수정하기"} />
                        <ManageSpecials specials={specials} updateCafeContent={updateCafeContent} newSpecial={newSpecial} />
                    </div>
                </div> */}

                </CafeWrapper>
                
            </AdminWrapper>
           
            {/* edit header */}
            {/* <div className="flex justify-between w-full"> 
                <div className="flex flex-row ">
                    <div className="font-bold text-4xl">카페 도천 관리</div>
                </div>
                <div className="flex flex-row space-x-3">
                    <EditButton onClickFunction={()=>setShowPreview(!showPreview)} btnName={"미리보기"} />
                    <EditButton onClickFunction={onClickEditBtn} btnName={"수정하기"} />
                </div>
            </div>
            <div className="mt-2 flex text-right w-full justify-end">
                <small >섹션을 이동하기전 변경사항을 저장하여야 정보가 손실되지 않습니다.</small>
            </div> */}

            {/* middle section */}
            
        </>
    )
}