"use client"

import { ContentModal } from "@/components/layout"
import { CustomTextInput } from "@/components/ui";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { imgAddress } from "@/lib/const";
import { IndigoRoundButton } from "@/components/ui/Button";
import { FilledBadge, FilledIndigoBadge } from "@/components/ui/Badge";
import { CustomTextArea } from "@/components/ui/CustomInput";
import AdminWrapper from "@/app/admin/component/AdminWrapper";
import { ImageLibraryModal } from "@/app/admin/_component";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useStayContext } from "@/context/StayContext";
import { StayType } from "@/types";
import { OptionApi, RoomApi } from "@/api";
import { GeneralError } from "@/lib/messages";
import Wysiwyg from "@/app/admin/component/Wysiwyg";
import { roomService } from "@/service";
import { LayoutType } from "@/lib/enums";

const UpsertRoom = () => {
    const [mainImgs, setMainImgs] = useState<string[]>([]);
    const [optionImageLibrary, setOptionImageLibrary] = useState(false);
    const [content, setContent] = useState<string>("");

    const params = useParams();
    const { stayId } = params;
    const router = useRouter();


    const roomNameRef = useRef<any>(null);
    const structureRef = useRef<any>(null);
    const introduction1Ref = useRef<any>(null);
    const introduction2Ref = useRef<any>(null);
    const reserveLinkRef = useRef<any>(null);

    const goToRoomList = () => router.push("/admin/stay/room/"+stayId)

    if(!stayId){
        goToRoomList();
    }
    
    const searchParams = useSearchParams();
    const roomId = searchParams.get('id');

    const isValidRoom = () => {
        const name = roomNameRef.current;
        const structure = structureRef.current;
        const introduction = introduction1Ref.current;
        // (name && name.value ) &&
        return mainImgs.length > 0 && name.value && structure.value && content != '' && introduction.value;
    }

    const { targetRoom , targetRoomError, targetRoomMutate} = roomService.GetById(roomId);


    useEffect(()=>{
        if(targetRoom) {
            console.log("useEffect",targetRoom);
            if(targetRoom.mainImgs) setMainImgs(targetRoom.mainImgs);
            if(targetRoom.content) setContent(targetRoom.content);
        }
    },[targetRoom])

    const onClickSaveBtn = async () => {
        const name = roomNameRef.current;
        const structure = structureRef.current;
        const introduction1 = introduction1Ref.current;
        // const introduction2 = introduction2Ref.current;
        const reserveLink = reserveLinkRef.current;

        console.log("name", name)

        if(isValidRoom() && stayId && typeof stayId == "string"){
            console.log("[onClickSaveBtn]");

            const data : StayType.Room = {
                name: name.value,
                structure: structure.value,
                introduction1: introduction1.value,
                // introduction2: introduction2.value,
                content: content,
                reserveLink: reserveLink.value,
                stay_id: parseInt(stayId),
                mainImgs: mainImgs,
                btnName: "",
                layout: LayoutType.room
            }

            if(targetRoom){
                data.id = targetRoom.id;
            }

            const upsertResult = await RoomApi.Upsert({data : data});
            
            if(upsertResult){
                window.alert(GeneralError.success);
                goToRoomList();
            }else{
                window.alert(GeneralError.unknownError+GeneralError.tryLater);
            }
        }else{
            window.alert(GeneralError.fillTheAllTheForm);
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
                <div className=" py-4 flex flex-row space-x-4 overflow-y-auto font-pretendard">
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

                        <p>한 줄 소개(100자까지)</p>
                        <CustomTextArea
                            maxLength={100}
                            inputVal={targetRoom && targetRoom.introduction1 || ''} 
                            placeholder={""} 
                            textRef={introduction1Ref} 
                        />

                        <p>예약링크</p>
                        <small>비어있으면 실시간예약으로 연동됩니다</small>
                        <CustomTextInput
                            maxLength={20}
                            inputVal={targetRoom && targetRoom.reserveLink || ''} 
                            placeholder={""} 
                            textRef={reserveLinkRef} 
                        />          

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
        
        
    </>);
}

export default UpsertRoom;