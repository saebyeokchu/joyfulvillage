"use client"

import { CustomTextInput } from "@/components/ui";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { imgAddress } from "@/lib/const";
import { IndigoRoundButton } from "@/components/ui/Button";
import { FilledBadge, FilledIndigoBadge } from "@/components/ui/Badge";
import { CustomTextArea } from "@/components/ui/CustomInput";
import AdminWrapper from "@/app/admin/component/AdminWrapper";
import { ImageLibraryModal } from "@/app/admin/_component";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { StayType } from "@/types";
import { OptionApi } from "@/api";
import { GeneralError } from "@/lib/messages";
import { optionService } from "@/service";
import Wysiwyg from "@/app/admin/component/Wysiwyg";

const UpsertContent = () => {
    // const [optionMainImgs, setOptionMainImgs] = useState<string[]>([]);
    const [contentMainImgs, setContentMainImgs] = useState<string[]>([]);
    const [content, setContent] = useState(null);

    const [optionImageLibrary, setOptionImageLibrary] = useState(false);
    const [contentImageLibrary, setContentImageLibrary] = useState(false);

    const params = useParams();
    const { stayId } = params;
    const router = useRouter();


    const nameRef = useRef<any>(null);
    const introductionRef = useRef<any>(null);

    const goToOptionList = () => router.push("/admin/stay/option/"+stayId)

    if(!stayId){
        goToOptionList();
    }

    const searchParams = useSearchParams();
    const optionId = searchParams.get('id');

    const isValidOption = () => {
        const name = nameRef.current;
        const introduction = introductionRef.current;

        return contentMainImgs.length > 0 && name.value && introduction.value;
    }

    const callOption = optionService.GetById(optionId);
    const targetOption = useMemo(()=> {
        if(callOption && callOption.option){
            return callOption.option;
        }
    },[callOption, router]);

    const [initialLoaded, setInitialLoaded] = useState(false);

    useEffect(() => {
        if (callOption && callOption.option && !initialLoaded) {
          setContentMainImgs(callOption.option.mainImgs);
          setContent(callOption.option.content);
        //   setOptionMainImgs(callOption.option.mainImg);
          setInitialLoaded(true);
        }
      }, [callOption]);

    const onClickSaveBtn = async () => {
        const name = nameRef.current;
        const introduction = introductionRef.current;

        if(isValidOption() && stayId && typeof stayId == "string"){
            console.log("[onClickSaveBtn]");

            const data : StayType.Option = {
                id: targetOption && targetOption.id,
                name: name.value,
                introduction: introduction.value,
                content: content,
                mainImgs: contentMainImgs,
                stay_id: parseInt(stayId)
            }

            const upsertResult = await OptionApi.Upsert({data : data});
            
            if(upsertResult){
                window.alert(GeneralError.success);
                goToOptionList();
            }else{
                window.alert(GeneralError.unknownError+GeneralError.tryLater);
            }
        }else{
            window.alert(GeneralError.fillTheAllTheForm);
        }

    } 
    
    const onClickDeleteContentImage = (index: number) => {
        setContentMainImgs((prev) => prev.filter((_, i) => i !== index));
    };

    const onClickOptionContentImgAddAction = (imgSrc : string) => {
        setContentMainImgs([... contentMainImgs, imgSrc]);
        return true;
    }


    return (
        <>
        <AdminWrapper>
                <div className="flex flex-row justify-between">
                    <span className="text-xl font-bold mt-3">옵션 추가하기</span>
                    <div className="flex flex-row space-x-3 justify-between">
                    <IndigoRoundButton onClickFunction={goToOptionList} btnName={"취소하기"} />
                    <IndigoRoundButton onClickFunction={onClickSaveBtn} btnName={"저장하기"} />
                        </div>
                   
                </div>
                <div className=" py-4 flex flex-col space-y-2 overflow-y-auto font-arita">
                    {/* <p>대표 이미지(3개 까지)</p>
                    { optionMainImgs.length < 3 && <FilledIndigoBadge onClickFunction={() => setOptionImageLibrary(true)} name={"이미지 추가하기"} /> }
                    { optionMainImgs.length > 0  && <div className="flex flex-row space-x-3 mt-3">
                        { optionMainImgs.map((src : string, index : number) =>  
                            <div className="border-0 relative" key={`stay_upsert_image_${index}`}>
                                <Image 
                                    loader={()=> imgAddress + src}
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
                    </div>} */}

                    <p>이름(20자까지)</p>
                    <CustomTextInput
                        maxLength={20}
                        inputVal={targetOption && targetOption.name || ''} 
                        placeholder={""} 
                        textRef={nameRef} 
                    />

                    <p>한 줄 소개(60자까지)</p>
                    <CustomTextInput
                        maxLength={60}
                        inputVal={targetOption && targetOption.introduction || ''} 
                        placeholder={""} 
                        textRef={introductionRef} 
                    />

                    <p>내용</p>
                    <Wysiwyg content={content} setContent={setContent} isImageAllowed={false} height={0} />
                    {/* <CustomTextArea
                        inputVal={targetOption && targetOption.content || ''} 
                        placeholder={""} 
                        textRef={contentRef} 
                    /> */}

                    <p>내용 이미지</p>
                    <FilledIndigoBadge onClickFunction={() => setContentImageLibrary(true)} name={"이미지 추가하기"} />
                    { contentMainImgs.length > 0  && <div className="flex flex-row space-x-3 mt-3">
                        { contentMainImgs.map((src : string, index : number) =>  
                            <div className="border-0 relative" key={`stay_upsert_image_${index}`}>
                                <Image 
                                    loader={()=> imgAddress + src}
                                    src={ imgAddress + src}
                                    width={250}
                                    height={350}
                                    alt="upsert-main-img"
                                    className="object-cover"
                                />
                                <p className="w-full flex cursor-pointer" >
                                    <span className="mx-auto h-8 pt-2 text-xs bg-joyful-indigo w-full text-center absolute bottom-0 text-white" onClick={()=>onClickDeleteContentImage(index)}>삭제하기</span>
                                </p>
                            </div>
                        )}
                    </div> }
                </div> 
        </AdminWrapper>
{/* 
        { optionImageLibrary && 
            <ImageLibraryModal 
                onClickCloseModal={() => setOptionImageLibrary(false)} 
                onClickAddAction={onClickOptionMainImgAddAction}  />} */}
        
        { contentImageLibrary && 
            <ImageLibraryModal 
                onClickCloseModal={() => setContentImageLibrary(false)} 
                onClickAddAction={onClickOptionContentImgAddAction}  />}
    </>);
}

export default function UpsertOption() {
    return(
        <Suspense>
            <UpsertContent />
        </Suspense>
    )
}