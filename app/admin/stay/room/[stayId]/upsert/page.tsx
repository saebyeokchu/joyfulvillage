"use client"
import { useEffect, useRef, useState } from "react";

import { ImagePopUp, Loading } from "@/components/layout"
import { CustomTextInput } from "@/components/ui";
import Image from "next/image";
import { imgAddress } from "@/lib/const";
import { IndigoRoundButton } from "@/components/ui/Button";
import { FilledIndigoBadge,OutlineIndigoBadge } from "@/components/ui/Badge";
import { CustomTextArea } from "@/components/ui/CustomInput";
import AdminWrapper from "@/app/admin/component/AdminWrapper";
import { ImageLibraryModal } from "@/app/admin/_component";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { StayType } from "@/types";
import { RoomApi } from "@/api";
import { GeneralError } from "@/lib/messages";
import Wysiwyg from "@/app/admin/component/Wysiwyg";
import { roomService } from "@/service";
import { LayoutType, ReserveInfoType } from "@/lib/enums";

const UpsertRoom = () => {
    const [mainImgs, setMainImgs] = useState<string[]>([]);
    const [optionImageLibrary, setOptionImageLibrary] = useState(false);
    const [content, setContent] = useState<string>("");
    const [openPopUpModal, setOpenPopUpModal] = useState(false);
    const [layout, setLayout] = useState(LayoutType.room);
    const [reserve, setReserveType] = useState(ReserveInfoType.reserve);
    const [reserveNum, setReserveNum] = useState("");
    const [reserveLink, setReserveLink] = useState("");
    
    const params = useParams();
    const { stayId } = params;
    const router = useRouter();

    const [onLoading, setOnLoading] = useState(false);

    const roomNameRef = useRef<any>(null);
    const structureRef = useRef<any>(null);
    const introduction1Ref = useRef<any>(null);
    const introduction2Ref = useRef<any>(null);

    const numRef = useRef<any>(null);
    const linkRef = useRef<any>(null);

    const goToRoomList = () => router.push("/admin/stay/room/"+stayId)

    if(!stayId){
        goToRoomList();
    }
    
    const searchParams = useSearchParams();
    const roomId = searchParams.get('id');

    const isValidRoom = () => {
        const name = roomNameRef.current;
        const structure = structureRef.current;
        return mainImgs.length > 0 && name.value && structure.value ;
    }

    const { targetRoom , targetRoomError, targetRoomMutate} = roomService.GetById(roomId);

    if(!targetRoom && !targetRoomError){
        return <AdminWrapper><Loading /></AdminWrapper>
    }


    useEffect(()=>{
        if(targetRoom) {
            console.log("useEffect",targetRoom);
            if(targetRoom.mainImgs) setMainImgs(targetRoom.mainImgs);
            if(targetRoom.content) setContent(targetRoom.content);
            if(targetRoom.layout) setLayout(targetRoom.layout);
            if(targetRoom.reserveLink) {
                setReserveType(ReserveInfoType.reserve);
                setReserveLink(targetRoom.reserveLink.replace("realtime",""));
            }
            if(targetRoom.reserveNumber) {
                setReserveType(ReserveInfoType.inquiry);
                setReserveNum(targetRoom.reserveNumber);
            }
        }
    },[targetRoom])

    const onClickSaveBtn = async () => {
        const name = roomNameRef.current;
        const structure = structureRef.current;
        const introduction1 = introduction1Ref.current;
        const introduction2 = introduction2Ref.current;


        if(isValidRoom() && stayId && typeof stayId == "string"){
            console.log("[onClickSaveBtn]");
            setOnLoading(true);

            const data : StayType.Room = {
                name: name.value,
                structure: structure.value,
                introduction1: introduction1.value,
                // introduction2: introduction2.value,
                content: content,
                layout : layout,
                stay_id: parseInt(stayId),
                mainImgs: mainImgs,
            }

            if(targetRoom){
                data.id = targetRoom.id;
            }

            if(introduction2 && introduction2.value){
                data.introduction2 = introduction2.value;   
            }

            if(reserve === ReserveInfoType.inquiry){
                data.reserveNumber = numRef.current.value;
                data.reserveLink = "";
            }else{
                data.reserveLink = linkRef.current.value;
                data.reserveNumber = "";
            }

            const upsertResult = await RoomApi.Upsert({data : data});
            
            if(upsertResult){
                window.alert(GeneralError.success);
                setOnLoading(false);
                goToRoomList();
            }else{
                window.alert(GeneralError.unknownError+GeneralError.tryLater);
            }
        }else{
            window.alert("이름 / 구조 / 대표 이미지는 필수 항목입니다.");
        }

    } 
        
    const onClickDeleteImage = (index: number) => {
        setMainImgs((prev) => prev.filter((_, i) => i !== index));
    };

    const onClickAddAction = (imgSrc : string) => {
        console.log(mainImgs);
        setMainImgs([... mainImgs, imgSrc]);
        return true;
    }

    if(onLoading){
        return <AdminWrapper><Loading /></AdminWrapper>;
    }

    return (
        <>
        <AdminWrapper>
                <div className="flex flex-row justify-between">
                    <span className="text-xl font-bold mt-3">객실 추가하기</span>
                    <div className="flex flex-row space-x-3 justify-between">
                    <IndigoRoundButton onClickFunction={goToRoomList} btnName={"취소하기"} />
                    <IndigoRoundButton onClickFunction={onClickSaveBtn} btnName={"저장하기"} />
                        </div>
                   
                </div>
                <div className=" py-4 flex flex-row space-x-4 overflow-y-auto font-arita">
                    <div className="flex flex-col space-y-3">
                        <p>이름(20자까지)</p>
                        <CustomTextInput
                            maxLength={20}
                            inputVal={targetRoom && targetRoom.name || ''} 
                            placeholder={""} 
                            textRef={roomNameRef} 
                        />

                        <p>구조(40자까지)</p>
                        <CustomTextInput
                            maxLength={40}
                            inputVal={targetRoom && targetRoom.structure || ''} 
                            placeholder={""} 
                            textRef={structureRef} 
                        />

                        <p>한 줄 소개 윗줄(100자까지)</p>
                        <CustomTextArea
                            maxLength={100}
                            inputVal={targetRoom && targetRoom.introduction1 || ''} 
                            placeholder={""} 
                            textRef={introduction1Ref} 
                        />

                        <p>한 줄 소개 아랫줄(100자까지)</p>
                        <CustomTextArea
                            maxLength={100}
                            inputVal={targetRoom && targetRoom.introduction2 || ''} 
                            placeholder={""} 
                            textRef={introduction2Ref} 
                        />

                        <div>
                            { reserve === ReserveInfoType.reserve ? <FilledIndigoBadge name={"예약하기 설정"} /> : <OutlineIndigoBadge name={"예약하기 설정"} onClickFunction={()=>setReserveType(ReserveInfoType.reserve)} />}
                            { reserve === ReserveInfoType.inquiry ? <FilledIndigoBadge name={"문의하기 설정"} /> : <OutlineIndigoBadge name={"문의하기 설정"} onClickFunction={()=>setReserveType(ReserveInfoType.inquiry)} />}
                            
                            <div className=" mt-3"> 
                                { reserve === ReserveInfoType.inquiry ? <>
                                    <CustomTextInput
                                        maxLength={20}
                                        inputVal={reserveNum}
                                        placeholder={"연락처 입력"}
                                        textRef={numRef}                                    />  
                                </> : <>
                                    <CustomTextInput
                                            maxLength={200}
                                            inputVal={reserveLink}
                                            placeholder={"공란 시 실시간 예약 연결"}
                                            textRef={linkRef}                                    />  
                                </> }
                            </div>
                            
                        </div>

                        <div className="flex justify-between"><span>레이아웃 설정</span><span onClick={()=>setOpenPopUpModal(true)} className="text-sm underline cursor-pointer  ">레이아웃 이란?</span></div>
                        
                        <select 
                            className="py-3 px-4 pe-9 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={layout} 
                            onChange={(e)=>setLayout(parseInt(e.target.value) as LayoutType)}>
                            <option value={LayoutType.room}>객실 레이아웃 사용</option>
                            <option value={LayoutType.option}>옵션 레이아웃 사용</option>
                        </select>
                                

                        {/* <p>소개2(60자까지)</p>
                        <CustomTextArea
                            maxLength={60}
                            inputVal={targetRoom && targetRoom.introduction2 || ''} 
                            placeholder={""} 
                            textRef={introduction2Ref} 
                        /> */}

                        <p>대표 이미지</p>
                        {( (!targetRoom.id) || (mainImgs && mainImgs.length < 3)) &&  <FilledIndigoBadge onClickFunction={() => setOptionImageLibrary(true)} name={"이미지 추가하기"} />}
                        {  
                            <div className="flex flex-col space-y-3 mt-3">
                            { mainImgs && mainImgs.map((src : string, index : number) =>  
                                <div className="border-0 relative" key={`stay_upsert_image_${index}`}>
                                    <Image 
                                        loader={()=>imgAddress + src}
                                        src={ imgAddress + src}
                                        width={250}
                                        height={350}
                                        alt="upsert-main-img"
                                        className="object-cover"
                                    />
                                    <p className="w-full flex cursor-pointer" >
                                        <span className="mx-auto h-8 pt-2 text-xs bg-joyful-indigo w-full text-center absolute bottom-0 text-white" onClick={()=>onClickDeleteImage(index)}>삭제하기</span>
                                    </p>
                                </div>
                            )} 
                        </div>}

                    </div>
                    <div className="grow flex flex-col space-y-3">
                        <p>프로그램 내용</p>
                        <Wysiwyg content={content} setContent={setContent} isImageAllowed={true} height={600} />
                    </div>
                </div> 
        </AdminWrapper>

        { optionImageLibrary && 
            <ImageLibraryModal 
                onClickCloseModal={() => setOptionImageLibrary(false)} 
                onClickAddAction={onClickAddAction}  />}
        
        { openPopUpModal && <ImagePopUp images={['/images/explain/exp-layout-1.png', '/images/explain/exp-layout-2.png']} onCloseModal={()=>setOpenPopUpModal(false)} />}
        
        
        
    </>);
}

export default UpsertRoom;