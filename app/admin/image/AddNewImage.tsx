import { ImageArchive } from "@/types/Types";
import { imageArchiveService, soksoService } from "@/service"
import { useRef, useState } from "react";
import { EditButton, FileInput, Spinner } from "@/components/ui";
import { IndigoRoundButton } from "@/components/ui/Button";
import { ContentModal } from "@/components/layout";
import { ImageError } from "@/lib/messages";

export default function AddNewImage({ 
    setImages,
    onCloseModal 
}:{ 
    setImages : any,
    onCloseModal : any
}) {

    const imgRef = useRef(null);
    const [isUploading, setIsUploading]  = useState<boolean>(false);

    const onClickAddNewSokso = async () => {

        const newImg : any = imgRef.current;

        if(newImg){
            if(newImg.files[0] != null){
                const formData : FormData = new FormData();
                formData.append("image", newImg.files[0]);

                await imageArchiveService.upload(formData).then(response =>{
                    if(response){
                        imageArchiveService.getAll().then((response : ImageArchive[]) => setImages(response));
                        onCloseModal();
                    }
                });
                
            }
        }else{
            window.alert("추가할 이미지가 올바르지 않거나 업로드에 문제가 있습니다. 잠시 후 다시 시도하여 주세요.");
        }
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
                        setIsUploading(false);
                        onCloseModal();
                    }
                    
                }
            }else{
                window.alert("추가할 이미지가 올바르지 않거나 업로드에 문제가 있습니다. 잠시 후 다시 시도하여 주세요.");
                setIsUploading(false);
            }
        }

    }


    return(
        isUploading ? <ContentModal>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                    <div className="w-full h-full">
                        <Spinner /> 
                    </div>
                </div>
            </ContentModal>
                :
            <ContentModal>
            <div className="flex justify-between px-4 pt-4 font-arita text-joyful-indigo">
                <h3 className="font-bold text-2xl">
                새로운 이미지 추가하기
                </h3>
                <button type="button" onClick={onCloseModal} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border-0 border-0-transparent hover:bg-point-darker focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none " aria-label="Close" data-hs-overlay="#hs-basic-modal">
                <span className="sr-only">Close</span>
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
                </button>
            </div>
           <div className="p-3 overflow-y-auto font-arita">
                <FileInput imgRef={imgRef} />
                <div className="mt-5 flex justify-end gap-x-2">
                    <IndigoRoundButton onClickFunction={onClickAddImgBtn} btnName={"추가하기"} />
                </div>
            </div>
        </ContentModal>
    )
}