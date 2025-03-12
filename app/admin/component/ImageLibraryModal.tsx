import { useEffect, useRef, useState } from "react"
import Image from "next/image"

import { ImageArchive } from "@/types/Types";
import { imageArchiveService } from "@/service";
import { GeneralError, ImageError } from "@/lib/messages";
import { EditButton, FileInput, FilledBadge, OutlineBadge, Spinner } from "@/components/ui";
import { ContentModal } from "@/components/layout";
import { GrayRoundButton, IndigoOutlineRoundButton, IndigoRoundButton } from "@/components/ui/Button";
import { useJoyfulContext } from "@/context/JoyfulContext";
import { imgAddress } from "@/lib/const";


export default function ImageLibraryModal({
    onClickCloseModal, 
    onClickAddAction,
    target
}:{
    onClickCloseModal : any, 
    onClickAddAction : any,
    target? : any
}){
    const [images, setImages] = useState<ImageArchive[]>([]);
    const [openNewModal, setOpenNewModal]  = useState<boolean>(false);
    const [isUploading, setIsUploading]  = useState<boolean>(false);
    const [option, setOption] = useState<string>("라이브러리");
    const imgRef = useRef(null);

    const joyfulContext = useJoyfulContext();

    useEffect(()=>{
        init();
    }, []);

    const init = () => {
        imageArchiveService.getAll().then((response : ImageArchive[]) => setImages(response));
    }

    const onClickSelectImg = async (imgSrc : string, confirm : boolean = true) => {

        if(confirm){
            if(!window.confirm(ImageError.confirmAdd)){
                return;
            }
        }

        const response = target ? await onClickAddAction(imgSrc,target) :  await onClickAddAction(imgSrc);

        if(response){
            window.alert(GeneralError.success);
            onClickCloseModal();
        }else{
            window.alert(GeneralError.unknownError+GeneralError.tryLater);
        }

    }

    const onClickAddImage = ( ) => {
        setOpenNewModal(true);
    }

    const onClickAddImgBtn = async () => {

        const newImg : any = imgRef.current;
        if(window.confirm(ImageError.confirmAdd)){
            setIsUploading(true);

            if(newImg){
                const image =  newImg.files[0];
                if( image != null){
                    const formData = new FormData();
                    formData.append('image', image); // Append the file to FormData

                    const response = await imageArchiveService.upload(image);
                    if(response){
                        await imageArchiveService.getAll().then((response : ImageArchive[]) => setImages(response));
                        onClickSelectImg(response, false);
                        setIsUploading(false);
                    }
                    
                }
            }else{
                window.alert("추가할 이미지가 올바르지 않거나 업로드에 문제가 있습니다. 잠시 후 다시 시도하여 주세요.");
                setIsUploading(false);
            }
        }

    }

    const onClickDeleteImage = async ( targetImage : ImageArchive ) => {
        if(targetImage.id){
            if(window.confirm(targetImage.imgSrc +GeneralError.verifyDeletion)){
                await imageArchiveService.deleteByImageName(targetImage.id, targetImage.imgSrc).then((response : ImageArchive[]) => setImages(response));
            }
        }else{
            window.alert("유효한 이미지가 아닙니다. 잠시 후 다시 시도하여 주세요.");

        }
    }

    return (
        <>
            {isUploading ? 
                <ContentModal>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                        <div className="w-full h-full">
                            <Spinner /> 
                        </div>
                    </div>
                </ContentModal>
                : 
                <ContentModal>
                    <div className="flex justify-between px-4 pt-4 font-pretendard text-joyful-indigo">
                        <h3 className="font-bold text-2xl">
                            이미지 라이브러리
                        </h3>
                        <button type="button" onClick={onClickCloseModal} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border-0 border-0-transparent hover:bg-point-darker focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none " aria-label="Close" data-hs-overlay="#hs-basic-modal">
                        <span className="sr-only">Close</span>
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                        </button>
                    </div>
                    <div className="px-4 pb-4 overflow-y-auto font-pretendard">
                        <div className="flex flex-row space-x-2 mt-3">
                            {option == "라이브러리" ? <IndigoRoundButton btnName={"라이브러리"} /> : <IndigoOutlineRoundButton btnName={"라이브러리"} onClickFunction={()=>setOption("라이브러리")}/> }
                            {option == "업로드" ? <IndigoRoundButton btnName={"업로드"} /> : <IndigoOutlineRoundButton btnName={"업로드"} onClickFunction={()=>setOption("업로드")} /> }
                        </div>
                        
                        { option == "라이브러리" && <div className="grid grid-cols-3 gap-3 mt-3">
                            { images.length > 0 && images.map((img : ImageArchive, index : number) => 
                                <div className="border-0 relative" key={`admin_image_${index}`}>
                                    <Image loader={()=>imgAddress+img.imgSrc} className="object-cover w-full h-40" src={imgAddress+img.imgSrc} width={500} height={400} alt={`image-archive-${index}`} />
                                    <p className="w-full flex cursor-pointer" onClick={()=>onClickSelectImg(img.imgSrc)}>
                                        <span className="mx-auto h-8 pt-2 text-xs bg-joyful-indigo w-full text-center absolute bottom-0 text-white" >선택하기</span>
                                    </p>
                                </div>
                            )}
                        </div> }

                        { option == "업로드" && <div className="overflow-y-auto mt-3">
                                    <FileInput imgRef={imgRef} />
                                    <div className="mt-5 flex justify-end gap-x-2">
                                        <IndigoRoundButton onClickFunction={onClickAddImgBtn} btnName={"추가하기"} />
                                    </div>
                        </div> }
                    </div>
                </ContentModal> }
        </>
    )
}