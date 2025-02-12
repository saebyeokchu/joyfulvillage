import { ImageArchive } from "@/types/Types";
import { imageArchiveService } from "@/service";
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { EditButton } from "@/app/_component/Button";
import { GeneralError, ImageError } from "@/lib/messages";
import { FileInput, FilledBadge, OutlineBadge } from "@/app/_component";


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
    const [option, setOption] = useState<string>("라이브러리");
    const imgRef = useRef(null);

    useEffect(()=>{
        init();
    }, []);

    const init = () => {
        imageArchiveService.getAll().then((response : ImageArchive[]) => setImages(response));
    }

    const onClickSelectImg = async (imgSrc : string) => {
        if(window.confirm(ImageError.confirmAdd)){
            const response = target ? await onClickAddAction(imgSrc,target) :  await onClickAddAction(imgSrc);

            if(response){
                window.alert(GeneralError.success);
                onClickCloseModal();
            }else{
                window.alert(GeneralError.unknownError+GeneralError.tryLater);
            }
        }

    }

    const onClickAddImage = ( ) => {
        setOpenNewModal(true);
    }

    const onClickAddNewSokso = async () => {

        const newImg : any = imgRef.current;

        if(newImg){
            if(newImg.files[0] != null){
                await imageArchiveService.upload(newImg.files[0]).then(response =>{
                    if(response){
                        imageArchiveService.getAll().then((response : ImageArchive[]) => setImages(response));
                        onClickSelectImg(response);
                    }
                });
                
            }
        }else{
            window.alert("추가할 이미지가 올바르지 않거나 업로드에 문제가 있습니다. 잠시 후 다시 시도하여 주세요.");
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
        <div className="w-full size-full fixed top-0 start-0 z-[80]  opacity-60 bg-black "></div>
        <div className="hs-overlay size-full fixed top-0 start-0 z-[80]  overflow-x-hidden transition-all overflow-y-auto " role="dialog" aria-labelledby="hs-basic-modal-label" >
            <div className="z-[90] sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div className="flex flex-col  shadow-sm rounded-xl pointer-events-auto bg-white">
                <div className="flex justify-between items-center py-3 px-4 ">
                    <h3 className="font-bold ">
                    이미지 라이브러리
                    </h3>
                    <button type="button" onClick={onClickCloseModal} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent hover:bg-point-darker focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none " aria-label="Close" data-hs-overlay="#hs-basic-modal">
                    <span className="sr-only">Close</span>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
                    <div className="px-4 pb-4 overflow-y-auto">
                        <div className="flex flex-row space-x-2">
                            {option == "라이브러리" ? <FilledBadge name={"라이브러리"} /> : <OutlineBadge name={"라이브러리"} onClickFunction={()=>setOption("라이브러리")}/> }
                            {option == "업로드" ? <FilledBadge name={"업로드"} /> : <OutlineBadge name={"업로드"} onClickFunction={()=>setOption("업로드")} /> }
                        </div>
                        
                        { option == "라이브러리" && <div className="grid grid-cols-3 gap-3 mt-3">
                            { images.length > 0 && images.map((img : ImageArchive, index : number) => 
                                <div className="border relative" key={`admin_image_${index}`}>
                                    <Image className="object-cover w-full h-40" src={"/images/"+img.imgSrc} width={500} height={400} alt={`image-archive-${index}`} />
                                    <p className="w-full flex cursor-pointer" onClick={()=>onClickSelectImg(img.imgSrc)}>
                                        <span className="mx-auto h-8 pt-2 text-xs bg-green w-full text-center absolute bottom-0 text-white" >선택하기</span>
                                    </p>
                                </div>
                            )}
                        </div> }

                        { option == "업로드" && <div className="overflow-y-auto mt-3">
                            <FileInput imgRef={imgRef} />
                            <div className="mt-5 flex justify-end gap-x-2">
                                <EditButton onClickFunction={onClickAddNewSokso} btnName={"추가하기"} />
                            </div>
                        </div>  }
                        
                    </div>
                </div>
            </div>
        </div> 
    </>
    )
}