"use client"

import { CustomTextInput, EditButton, FileInput, FilledBadge, OutlineBadge } from "@/app/_component";
import { CafeSection, HomeSection } from "@/app/_data/Enums";
import { useEffect, useRef, useState } from "react";
import EditBox from "../_component/EditBox";
import { cafeService } from "@/app/_service";
import { Cafe } from "@/app/_data/Types";
import ManageMainImg from "./_component/ManageMainImg";
import ManageMenus from "./_component/ManageMenus";
import { GeneralError } from "@/app/_data/Messages";
import ManageSpecials from "./_component/ManageSpecials";

export default function ManageCafe(){
    const [ selectedSection, setSelectedSection ]= useState<CafeSection>(CafeSection.subTitle);
    const [ showPreview, setShowPreview ]= useState<boolean>(false);
    const [ cafeContent, setCafeContent ] = useState<Cafe[]>([]);
    let [ menus , setMenus ] = useState<Cafe[]>([]);
    let [ specials , setSpecials ] = useState<Cafe[]>([]);
    let [ newSpecial , setNewSpecial ] = useState<Cafe>({section : CafeSection.specials, note : null, content : null, img : []});

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

    const onClickEditBtn = async () => {
        const subTitle = subTitleRef.current;

        switch(selectedSection){
            case CafeSection.subTitle :
                if(subTitle && subTitle.value){
                    const response = await cafeService.updateCafe({ section : CafeSection.subTitle, content : subTitle.value});
                    if(response){
                        updateCafeContent();
                    }
                }
                break;
            case CafeSection.menus :
                if(menus){
                    console.log("update menus", menus);
                    let response : any  = null;
                    menus.map(async (menu : Cafe) => {
                        response = await cafeService.updateCafe(menu);
                    });

                    if(response){
                        updateCafeContent();
                    }
                }
                break;
            case CafeSection.specials :
                if(specials){
                    console.log("update specials", specials);
                    let response : any  = null;
                    //update
                    specials.map(async (menu : Cafe) => {
                        response = await cafeService.updateCafe(menu);
                    });

                    //created
                    console.log("CREATE specials", newSpecial);
                    if(newSpecial.note){
                        response = await cafeService.create(newSpecial);
                    }

                    if(response){
                        updateCafeContent();
                    }
                }
                break;
        }

        window.alert(GeneralError.success);
    }

    return (
        <>
            <div className="p-20 w-2/3 h">
              {/* edit header */}
              <div className="flex justify-between w-full"> 
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
                </div>

                {/* middle section */}
                <div className="mt-3 flex flex-row space-x-2">
                    { selectedSection==CafeSection.subTitle ? <FilledBadge name={"카페 도천 소개글"} /> : <OutlineBadge name={"카페 도천 소개글"} onClickFunction={()=>onClickMoveSection(CafeSection.subTitle)}  />}
                    { selectedSection==CafeSection.mainImgs ? <FilledBadge name={"메인 소개 이미지"} /> : <OutlineBadge name={"메인 소개 이미지"} onClickFunction={()=>onClickMoveSection(CafeSection.mainImgs)} />}
                    { selectedSection==CafeSection.menus ? <FilledBadge name={"메뉴 관리"} /> : <OutlineBadge name={"메뉴 관리"} onClickFunction={()=>onClickMoveSection(CafeSection.menus)}  />}
                    { selectedSection==CafeSection.specials ? <FilledBadge name={"카페 특징 관리"} /> : <OutlineBadge name={"카페 특징 관리"} onClickFunction={()=>onClickMoveSection(CafeSection.specials)}  />}
                </div>

                {
                    selectedSection==CafeSection.subTitle &&
                        <div className="mt-7">
                            <CustomTextInput textRef={subTitleRef} placeholder={"카페 도천 소개 문구"} csProps={"border"} />
                        </div>
                }

                {
                    selectedSection==CafeSection.mainImgs &&
                        <div className="mt-7">
                            <ManageMainImg cafeContent={cafeContent} updateCafeContent={updateCafeContent} />
                        </div>
                }

                {
                    selectedSection==CafeSection.menus &&
                        <div className="mt-7">
                            <ManageMenus menus={menus} updateCafeContent={updateCafeContent} />
                        </div>
                }

{
                    selectedSection==CafeSection.specials &&
                        <div className="mt-7">
                            <ManageSpecials specials={specials} updateCafeContent={updateCafeContent} newSpecial={newSpecial} />
                        </div>
                }
               
            </div>
        </>
    )
}