"use client"

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { CustomTextInput, EditButton, FilledBadge } from "@/components/ui";
import { ImageLibraryModal } from "../../_component";
import AdminWrapper from "../../component/AdminWrapper";
import { GrayRoundButton, IndigoRoundButton } from "@/components/ui/Button";
import { CustomTextArea } from "@/components/ui/CustomInput";
import { useRouter, useSearchParams } from "next/navigation";
import { imgAddress } from "@/lib/const";
import { useAboutContext } from "@/context/AboutContext";
import { AboutApi } from "@/api";
import { AboutType } from "@/types/About";
import { aboutService } from "@/service";
import { GeneralError } from "@/lib/messages";
import { Loading } from "@/components/layout";

function UpsertContent(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const adminId = searchParams.get('adminId');

    const [openImageLibrary, setOpenImageLibrary] = useState(false);
    const [imgSrc, setImgSrc] = useState<null | string>(null);

    const nameRef = useRef<any>(null);
    const addressRef = useRef<any>(null);
    const contentRef = useRef<any>(null);
    const instagramIdRef = useRef<any>(null);
    const instagramLinkRef = useRef<any>(null);

    const isValidAbout = () => {
        const name = nameRef.current;
        const address = addressRef.current;
        const content = contentRef.current;
        const instagramId = instagramIdRef.current;
        const instagramLink = instagramLinkRef.current;

        return imgSrc && name.value && address.value && content.value && instagramId.value && instagramLink.value;
    }

    const {data, error, mutate} = aboutService.GetById(adminId);

    useEffect(()=>{
        if(data){
            setImgSrc(data.imgSrc ?? null);
        }
    },[data])


    const onClickSaveBtn = async () => {
        const name = nameRef.current;
        const address = addressRef.current;
        const content = contentRef.current;
        const instagramId = instagramIdRef.current;
        const instagramLink = instagramLinkRef.current;

        if(!imgSrc){
            return;
        }

        if(isValidAbout()){
            console.log("[onClickSaveBtn]");

            const targetAbout : AboutType = {
                imgSrc: imgSrc,
                title: name.value,
                address: address.value,
                content: content.value,
                InstagramId: instagramId.value,
                InstagramLink: instagramLink.value,
            }

            if(data){
                targetAbout.id = data.id;
            }
    

            await AboutApi.Upsert({data : targetAbout}).then((response : any)=>{
                if(response) {
                    window.alert(GeneralError.success);
                    goToAboutList();
                }else{
                    window.alert(GeneralError.unknownError+GeneralError.tryLater);
                }
            });
        }else{
            window.alert(GeneralError.fillTheAllTheForm);
        }

    } 

    const onClickAddAction = (imgSrc : string) => {
        setImgSrc(imgSrc);
        return true;
    }

    const onClickOpenImageLibrary = () => {
        setOpenImageLibrary(true);
    }

    const goToAboutList = () => router.push("/admin/about");

    return (
        <>
            <AdminWrapper>
                <div className="flex flex-row space-x-3 justify-end">
                    <IndigoRoundButton onClickFunction={goToAboutList} btnName={"취소하기"} />
                    <IndigoRoundButton onClickFunction={onClickSaveBtn} btnName={"저장하기"} />
                </div>
                
                <div className="flex flex-row space-x-10 pr-5">
                    <div className="flex flex-col space-y-3">
                        <p className=" mt-5 ">이름(20자까지)</p>
                        <CustomTextInput
                            maxLength={20}
                            inputVal={data && data.title || ''} 
                            placeholder={""} 
                            textRef={nameRef} 
                        />

                        <p className=" mt-5">주소(60자까지)</p>
                        <CustomTextArea  
                            maxLength={60}
                            inputVal={data && data.address || ''} 
                            placeholder={""} 
                            textRef={addressRef} />
                        
                        <p className=" mt-5">내용</p>
                        <CustomTextArea  
                            inputVal={data && data.content || ''} 
                            placeholder={""} 
                            textRef={contentRef} 
                            />
                    </div>

                    <div className="flex flex-col space-y-3">
                        <p className=" mt-5">인스타그램 아이디</p>
                        <CustomTextInput  
                            maxLength={30}
                            inputVal={data && data.InstagramId || ''} 
                            placeholder={""} 
                            textRef={instagramIdRef} />
                        
                        <p className=" mt-5">인스타그램 주소</p>
                        <CustomTextInput  
                            maxLength={60}
                            inputVal={data && data.InstagramLink || ''} 
                            placeholder={""} 
                            textRef={instagramLinkRef} />

                        { ( ( data && data.title != 'joyful') || data  == undefined ) && (
                            <>
                                <p className="mt-5">대표 이미지 설정</p>
                                {data && data.imgSrc ? (
                                    <IndigoRoundButton btnName={"수정하기"} onClickFunction={onClickOpenImageLibrary} />
                                ) : (
                                    <IndigoRoundButton onClickFunction={onClickOpenImageLibrary} btnName={"이미지 설정하기"} />
                                )}
                                <Image 
                                    loader={()=>imgAddress + (imgSrc || '/system/no-image.png')}
                                    src={imgAddress + (imgSrc || '/system/no-image.png')}
                                    width={250}
                                    height={350}
                                    alt="upsert-main-img"
                                    className="object-cover"
                                />
                            </>
                        )}
                    </div>
                </div>
            </AdminWrapper>
            {/* <div className="mt-3 flex flex-row space-x-3">
                <EditButton onClickFunction={onClickListProgram} btnName={"취소하기"} />
                <EditButton onClickFunction={onClickUpsertProgram} btnName={"저장하기"} />
            </div> */}
            
            { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setOpenImageLibrary(false)} onClickAddAction={onClickAddAction} />}
        </>
    )
}

export default function UpsertAbout(){

    return(
        <Suspense>
            <UpsertContent />
        </Suspense>
    )
} 
 