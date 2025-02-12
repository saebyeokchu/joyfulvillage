import { EditButton } from "@/app/_component/Button"
import { FileInput } from "@/app/_component/CustomInput";
import { SoksoClass } from "@/app/_data/_class/SoksoClass";
import { ImageArchive } from "@/app/_data/Types";
import { imageArchiveService, soksoService } from "@/app/_service"
import { useRef } from "react";

export default function AddNewImage({ 
    setImages,
    onCloseModal 
}:{ 
    setImages : any,
    onCloseModal : any
}) {

    const imgRef = useRef(null);

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


    return(
        <> 
            <div className="w-full size-full fixed top-0 start-0 z-[80]  opacity-60 bg-black "></div>
            <div className="hs-overlay size-full fixed top-0 start-0 z-[80]  overflow-x-hidden transition-all overflow-y-auto " role="dialog" aria-labelledby="hs-basic-modal-label" >
                <div className="z-[90] sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col  shadow-sm rounded-xl pointer-events-auto bg-white">
                        <div className="flex justify-between items-center py-3 px-4 ">
                            <h3 className="font-bold ">
                                새로운 이미지 추가하기
                            </h3>
                            <span className="sr-only">Close</span>
                            <svg onClick={onCloseModal} className="shrink-0 size-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <FileInput imgRef={imgRef} />
                            <div className="mt-5 flex justify-end gap-x-2">
                                <EditButton onClickFunction={onClickAddNewSokso} btnName={"추가하기"} />
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    )
}