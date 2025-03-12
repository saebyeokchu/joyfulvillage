"use client"

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { Program } from "@/types/Types";
import { isStrValid } from "@/lib/common";
import { GeneralError } from "@/lib/messages";
import { programService } from "@/service";
import { CustomTextInput, EditButton, FilledBadge } from "@/components/ui";
import Wysiwyg from "../../component/Wysiwyg";
import { ImageLibraryModal } from "../../_component";
import { ProgramClass } from "@/class/ProgramClass";
import { useProgramContext } from "@/context/ProgramContext";
import AdminWrapper from "../../component/AdminWrapper";
import { GrayRoundButton, IndigoRoundButton } from "@/components/ui/Button";
import { CustomTextArea } from "@/components/ui/CustomInput";
import { useRouter, useSearchParams } from "next/navigation";
import { imgAddress } from "@/lib/const";
import { Loading } from "@/components/layout";


function UpsertContent(){
    const [content, setContent] = useState<string>("");
    const [imgSrc, setImgSrc] = useState<string>("");
    const [openImageLibrary, setOpenImageLibrary] = useState(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const programId = searchParams.get('programId');

    const nameRef = useRef<any>(null);
    const subNameRef = useRef<any>(null);
    const introductionRef = useRef<any>(null);

    const {data, error, mutate} = programService.GetById(programId);
    console.log(data);
    
    useEffect(()=>{
        if(data){
            setContent(data.content);
            setImgSrc(data.img)
        }
    },[data])

    if(programId && !data){
        return <div className="h-screen"><Loading /></div>
    }

    const isValidProgram = () => {
        if(nameRef.current && subNameRef.current && introductionRef.current){
            return isStrValid(nameRef.current.value) && isStrValid(subNameRef.current.value) && isStrValid(introductionRef.current.value) && isStrValid(content) && isStrValid(imgSrc);
        }

        return false;
    }

    const onClickUpsertProgram = async () => {
        setIsLoading(true);
        if(nameRef.current && subNameRef.current && introductionRef.current)
            if(isValidProgram()){
                console.log("[onClickUpsertProgram]");
                const targetProgram  : Program = {
                    id: ( data && data.id ) || null,
                    name: nameRef.current.value,
                    subName: subNameRef.current.value,
                    introduction: introductionRef.current.value,
                    img: imgSrc,
                    content: content
                }

                await programService.upsert(targetProgram).then((response : any)=>{
                    if(response) {
                        window.alert(GeneralError.success);
                        onClickListProgram();
                    }else{
                        window.alert(GeneralError.unknownError+GeneralError.tryLater);
                    }
                });
            }else{
                window.alert(GeneralError.fillTheAllTheForm);
            }
            setIsLoading(false);
       

    } 

    const onClickAddAction = (imgSrc : string) => {
        setImgSrc(imgSrc);
        return true;
    }

    const onClickOpenImageLibrary = () => {
        setOpenImageLibrary(true);
    }

    const onClickListProgram = () => router.push("/admin/program");

    return (
        <>
            <div className="container mx-auto pt-10">
                <div className="flex justify-between w-full">
                    <div className="text-3xl font-bold font-pretendard">프로그램 </div>
                    <div className="flex flex-row space-x-3 justify-end">
                        <IndigoRoundButton onClickFunction={onClickListProgram} btnName={"취소하기"} />
                        <IndigoRoundButton onClickFunction={onClickUpsertProgram} btnName={"저장하기"} />
                    </div>
                </div>

                <p className="hover:underline cursor-pointer hover:font-bold" onClick={()=>router.refresh()}>내용수정란이 정상적으로 로드되지 않았을때 여기를 눌러 새로고침 해주세요.</p>
                
                
                {isLoading ? <div className="h-screen">
                    <Loading />
                </div> : 
                <div className="flex flex-col border-0 border-red-500">
                    <div className="grid grid-cols-2 gap-12 border-0 border-red-500">
                        <div>
                            <p className=" mt-5 ">이름(20자까지)</p>
                            <CustomTextInput
                                maxLength={20}
                                inputVal={(data && data.name) || ''} 
                                placeholder={""} 
                                textRef={nameRef} 
                            />

                            <p className=" mt-5 ">한 줄 설명(40자까지/카드 중간부분)</p>
                            <CustomTextInput
                                maxLength={40}
                                inputVal={(data &&  data.subName) || ''} 
                                placeholder={""} 
                                textRef={subNameRef} 
                            />

                            <p className=" mt-5">소개(카드 맨 아래부분)</p>
                            <CustomTextArea  
                                inputVal={(data && data.introduction )|| ''} 
                                placeholder={""} 
                                textRef={introductionRef} 
                            />
                        </div>
                        <div>
                            <p className=" mt-5">대표 이미지 설정</p>
                            { imgSrc ?
                            <IndigoRoundButton btnName={"수정하기"} onClickFunction={onClickOpenImageLibrary} />
                            :
                            <IndigoRoundButton onClickFunction={onClickOpenImageLibrary} btnName={"이미지 설정하기"} />}
                            { imgSrc && <Image 
                                loader={ ()=> (imgAddress + imgSrc  || '/images/system/no-image.png' )}
                                src={ (imgAddress + imgSrc  || 'system/no-image.png' )}
                                width={250}
                                height={250}
                                alt="upsert-main-img"
                                className="object-cover mt-5"
                            /> }
                        </div>
                    </div>
                    
                    <div className="flex flex-col space-y-3  ">
                        <p className=" mt-5">프로그램 내용</p>
                        <Wysiwyg content={content} setContent={setContent} isImageAllowed={true} height={600} />
                    </div>
                </div> }
            </div>
            
            { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setOpenImageLibrary(false)} onClickAddAction={onClickAddAction} />}
        </>
    )
} 

export default function UpsertProgram(){
    return(
        <Suspense>
            <UpsertContent />
        </Suspense>
    )
}
