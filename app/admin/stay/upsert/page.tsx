"use client"

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { GeneralError } from "@/lib/messages";
import { CustomTextInput} from "@/components/ui";
import { EditBox, ImageLibraryModal } from "../../_component";
import AdminWrapper from "../../component/AdminWrapper";
import { GrayRoundButton, IndigoRoundButton } from "@/components/ui/Button";
import { CustomTextArea } from "@/components/ui/CustomInput";
import { useRouter, useSearchParams } from "next/navigation";
import { imgAddress } from "@/lib/const";
import { AboutApi, StayApi } from "@/api";
import { StayType } from "@/types";
import { useStayContext } from "@/context/StayContext";
import { stayService } from "@/service";
import { LayoutType } from "@/lib/enums";
import { ImagePopUp } from "@/components/layout";


function UpsertContent(){
    const [openImageLibrary, setOpenImageLibrary] = useState(false);
    const [openPopUpModal, setOpenPopUpModal] = useState(false);
    const [openPopUpModal2, setOpenPopUpModal2] = useState(false);

    const [mainImgs, setMainImgs] = useState<string[]>([]);
    const [optoinAvailbilty, setOptoinAvailbilty] = useState<number>(0);

    const router = useRouter();

    const searchParams = useSearchParams();
    const stayId = searchParams.get('id');

    const nameRef = useRef<any>(null);
    const addressRef = useRef<any>(null);
    const introduction1Ref = useRef<any>(null);
    const introduction2Ref = useRef<any>(null);

    const isValidStay = () => {
        const name = nameRef.current;
        const address = addressRef.current;
        const introduction = introduction1Ref.current;

        return mainImgs.length > 0 && name.value && address.value && introduction.value;
    }

    const data : {  targetStay : StayType.Stay , targetStayError : any , targetStayMutate : any } = stayService.GetById(stayId);

    const targetStay = useMemo(()=>data.targetStay,[data]);
    useEffect(()=>{
        if(data && data.targetStay && data.targetStay.mainImgs){
            setMainImgs(data?.targetStay.mainImgs);
            setOptoinAvailbilty(data?.targetStay.optionAvailable ? 1 : 0);
        }
    },[targetStay]);

    console.log(data);


    const onClickSaveBtn = async () => {
        const name = nameRef.current;
        const address = addressRef.current;
        const introduction1 = introduction1Ref.current;
        const introduction2 = introduction2Ref.current;

        if(isValidStay()){
            console.log("[onClickSaveBtn]");

            const postData : StayType.Stay = {
                name: name.value,
                address: address.value,
                introduction1: introduction1.value,
                mainImgs: mainImgs,
                optionAvailable: optoinAvailbilty === 1 ? true : false,
            }
            

            if(targetStay && targetStay.id){
                postData.id = targetStay.id;
            }

            if(introduction2.value){
                postData.introduction2 = introduction2.value;
            }

            // console.log("[onClickSaveBtn] postData",postData);

            const upsertResult = await StayApi.Upsert({data : postData});
            
            if(upsertResult){
                window.alert(GeneralError.success);
                goToStayList();
            }else{
                window.alert(GeneralError.unknownError+GeneralError.tryLater);
            }
        }else{
            window.alert(GeneralError.fillTheAllTheForm);
        }

    } 

    const onClickAddAction = (imgSrc : string) => {
        setMainImgs([... mainImgs, imgSrc]);
        return true;
    }

    const onClickOpenImageLibrary = () => {
        setOpenImageLibrary(true);
    }

    const goToStayList = () => router.push("/admin/stay");

    const onClickDeleteImage = (index: number) => {
        setMainImgs((prev) => prev.filter((_, i) => i !== index));
      };

    return (
        <>
            <AdminWrapper>
                <div className="flex flex-row space-x-3 justify-end">
                    <IndigoRoundButton onClickFunction={goToStayList} btnName={"취소하기"} />
                    <IndigoRoundButton onClickFunction={onClickSaveBtn} btnName={"저장하기"} />
                </div>
                
                <div className="flex flex-col space-y-3">
                <div className="row-span-1">
                        <EditBox title={"대표사진 설정"}>
                            { ( (!targetStay.id) || (mainImgs && mainImgs.length < 3) ) && <IndigoRoundButton onClickFunction={onClickOpenImageLibrary} btnName={"이미지 추가하기"} /> }
                            { mainImgs && mainImgs.length > 0  && <div className="flex flex-row space-x-3 mt-3">
                                { mainImgs.map((src : string, index : number) =>  
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
                            </div> }
                        </EditBox>
                    </div>

                    <div className="row-span-1">
                        <EditBox title={"기본정보"}>
                            <div className="flex flex-col space-y-3">
                                <p>이름(20자까지)</p>
                                <CustomTextInput
                                    maxLength={20}
                                    inputVal={targetStay && targetStay.name || ''} 
                                    placeholder={""} 
                                    textRef={nameRef} 
                                />

                                <p className=" mt-5">주소(40자까지)</p>
                                <CustomTextInput  
                                    maxLength={40}
                                    inputVal={targetStay && targetStay.address || ''} 
                                    placeholder={""} 
                                    textRef={addressRef} />
                                
                                <p className="mt-5 justify-between flex">내용(윗줄) <span onClick={()=>setOpenPopUpModal(true)} className="text-sm hover:underline cursor-pointer font-bold">아래 입력한 내용이 표시되는 곳을 확인하시려면 여기를 클릭하세요.</span></p>
                                <CustomTextArea  
                                    inputVal={targetStay && targetStay.introduction1 || ''} 
                                    placeholder={""} 
                                    textRef={introduction1Ref} 
                                    />
                                <p className=" mt-5 justify-between flex">내용(아랫줄) <span onClick={()=>setOpenPopUpModal(true)} className="text-sm hover:underline cursor-pointer font-bold">아래 입력한 내용이 표시되는 곳을 확인하시려면 여기를 클릭하세요.</span></p>
                                <CustomTextArea  
                                    inputVal={targetStay && targetStay.introduction2 || ''} 
                                    placeholder={""} 
                                    textRef={introduction2Ref} 
                                    />
                            </div>
                        </EditBox>
                    </div>

                    <div className="row-span-1">
                        <EditBox title={"옵션 설정" }>
                            <select 
                                className="py-3 px-4 pe-9 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
                                value={optoinAvailbilty} onChange={(e)=>setOptoinAvailbilty(parseInt(e.target.value))}>
                                <option value={1}>사용</option>
                                <option value={0}>미사용</option>
                            </select>
                        </EditBox>
                    </div>

                    {/* <div className="row-span-1">
                        <EditBox title={"레이아웃 설정"}>
                            <p onClick={()=>setOpenPopUpModal2(true)} className="text-sm hover:underline cursor-pointer font-bold text-end">레이아웃 종류를 확인하려면 여기를 클릭하세요.</p>
                            <select 
                                className="py-3 px-4 pe-9 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" value={layout} 
                                onChange={(e)=>setLayout(parseInt(e.target.value) as LayoutType)}>
                                <option value={LayoutType.room}>객실 레이아웃 사용</option>
                                <option value={LayoutType.option}>옵션 레이아웃 사용</option>
                            </select>
                        </EditBox>
                    </div> */}

                    {/* <div className="col-span-3 row-span-1">
                        <EditBox title={"객실 설정"}>
                            <p></p>
                        </EditBox>
                    </div> */}

                </div>
            </AdminWrapper>
            {/* <div className="mt-3 flex flex-row space-x-3">
                <EditButton onClickFunction={onClickListProgram} btnName={"취소하기"} />
                <EditButton onClickFunction={onClickUpsertProgram} btnName={"저장하기"} />
            </div> */}
            
            { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setOpenImageLibrary(false)} onClickAddAction={onClickAddAction} />}

            { openPopUpModal && <ImagePopUp images={['/images/explain/exp-room-1.png', '/images/explain/exp-room-2.png']} onCloseModal={()=>setOpenPopUpModal(false)} />}
            { openPopUpModal2 && <ImagePopUp images={['/images/explain/exp-layout-1.png', '/images/explain/exp-layout-2.png']} onCloseModal={()=>setOpenPopUpModal2(false)} />}
        </>
    )
} 

export default function UpsertStay(){
    return(
        <Suspense>
            <UpsertContent />
        </Suspense>
    )
}