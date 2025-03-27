import Image from "next/image";
import { ContentModal } from "@/components/layout";
import { FilledIndigoBadge } from "@/components/ui/Badge";
import { GeneralError, ImageError } from "@/lib/messages";
import { headerInfoService } from "@/service";
import { HeaderInfo } from "@/types/HeaderInfo";
import { useEffect, useRef, useState } from "react";
import { imgAddress } from "@/lib/const";
import { CustomTextInput } from "@/components/ui";
import { IndigoRoundButton } from "@/components/ui/Button";
import ImageLibraryModal from "./ImageLibraryModal";


const UpsertHeaderInfo = ({
    onCloseModal,
    headerInfoName,
}:{
    onCloseModal : () => void,
    headerInfoName : string
}) => {
    const [headerImgSrc, setHeaderImgSrc] = useState<string | null>("");
    const [optionImageLibrary, setOptionImageLibrary] = useState(false);

    const introduction1Ref = useRef<HTMLInputElement>(null);
    const introduction2Ref = useRef<HTMLInputElement>(null);

    const { headerInfo, isLoading, isError } = headerInfoService.GetById(headerInfoName);

    useEffect(() => {
        console.log(headerInfo);
        if (headerInfo) {  
            if(headerInfo.imgSrc){
                setHeaderImgSrc(headerInfo.imgSrc);
            }
        }
    }, [headerInfo]);
   
    const onClickSaveHeaderInfo = async () => {
        const introduction1 = introduction1Ref.current;
        const introduction2 = introduction2Ref.current;
    
        if(headerImgSrc){
            console.log("[onClickSaveHeaderInfo]");

            const postData : HeaderInfo = {
                name: headerInfoName,
                imgSrc: headerImgSrc,
                introduction1 : '',
                introduction2 : '',
            }

            if(introduction1 && introduction1.value){
                postData.introduction1 = introduction1.value;
            }
            if(introduction2 && introduction2.value){
                postData.introduction2 = introduction2.value;
            }

            if(headerInfo && headerInfo.id){
                postData.id = headerInfo.id;
            }

            console.log("[onClickSaveHeaderInfo] upsertData", postData);

            const upsertResult = await headerInfoService.Upsert({data : postData});
            
            if(upsertResult){
                window.alert(GeneralError.success);
                onCloseModal();
            }else{
                window.alert(GeneralError.unknownError+GeneralError.tryLater);
            }
        }else{
            window.alert(ImageError.selectTheImage);
        }
    }
    
    const onClickAddAction = (imgSrc : string) => {
        setHeaderImgSrc(imgSrc);
        return true;
    }

    return (
        <ContentModal>
            <div className="flex flex-col space-y-5 p-3">
                <span className="text-2xl font-bold">헤더 정보 수정하기</span>
                <div className="flex flex-col space-y-3">
                    <p>대표 이미지</p>
                    <FilledIndigoBadge onClickFunction={() => setOptionImageLibrary(true)} name={"이미지 추가하기"} />
                    { headerImgSrc && <div className="border-0 relative" key={`stay-header-img`} >
                                <Image 
                                    loader={()=>imgAddress + headerImgSrc}
                                    src={ imgAddress + headerImgSrc}
                                    width={250}
                                    height={350}
                                    alt="stay-header-img"
                                    className="object-cover"
                                />
                                <p className="w-full flex cursor-pointer" >
                                    <span className="mx-auto h-8 pt-2 text-xs bg-joyful-indigo w-[250px] text-center absolute bottom-0 text-white" onClick={() => setHeaderImgSrc(null)}>삭제하기</span>
                                </p>
                            </div>}
                </div>
                <div className="flex flex-col space-y-3">
                    <p>헤더 설명 윗줄(40자 까지)</p>
                    <CustomTextInput
                        maxLength={40}
                        inputVal={headerInfo && headerInfo.introduction1 || ''} 
                        placeholder={""} 
                        textRef={introduction1Ref} 
                    />
                </div>
                <div className="flex flex-col space-y-3">
                    <p>헤더 설명 아랫줄(40자 까지)</p>
                    <CustomTextInput
                        maxLength={40}
                        inputVal={headerInfo && headerInfo.introduction2 || ''} 
                        placeholder={""} 
                        textRef={introduction2Ref} 
                    />
                </div>
                <div className="flex flex-row justify-center space-x-3 w-full ">
                    <IndigoRoundButton btnName="저장" onClickFunction={onClickSaveHeaderInfo} />
                    <IndigoRoundButton btnName="닫기" onClickFunction={onCloseModal} />
                </div>
            </div>

            { optionImageLibrary && <ImageLibraryModal  onClickCloseModal={() => setOptionImageLibrary(false)}  onClickAddAction={onClickAddAction}  />}
            
        </ContentModal>

    )
}

export default UpsertHeaderInfo;