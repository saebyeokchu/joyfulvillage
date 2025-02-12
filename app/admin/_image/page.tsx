import { ImageArchive } from "@/app/_data/Types";
import { imageArchiveService } from "@/app/_service";
import { useEffect, useState } from "react"
import Image from "next/image"
import { EditButton } from "@/app/_component/Button";
import { GeneralError } from "@/app/_data/Messages";
import AddNewImage from "./AddNewImage";


export default function ManageImage(){
    const [images, setImages] = useState<ImageArchive[]>([]);
    const [openNewModal, setOpenNewModal]  = useState<boolean>(false);

    useEffect(()=>{
        init();
    }, []);

    useEffect(()=>{
        console.log(images);
    }, [images]);

    const init = () => {
        imageArchiveService.getAll().then((response : ImageArchive[]) => setImages(response));
    }

    const onClickAddImage = ( ) => {
        setOpenNewModal(true);
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
            <div className="flex flex-col p-20 space-y-3">
                <div className="flex flex-row justify-start">
                    <div className="font-bold text-4xl">이미지 관리</div>
                </div>

                <div className="flex">
                    <EditButton onClickFunction={()=>onClickAddImage()} btnName={"추가하기"} />
                </div>

                <div className="grid grid-cols-3 gap-3">
                    { images.length > 0 && images.map((img : ImageArchive, index : number) => 
                        <div className="border relative" key={`admin_image_${index}`}>
                            <Image className="object-cover w-full h-80"  src={"/images/"+img.imgSrc} width={500} height={400} alt={`image-archive-${index}`} />
                            <p className="w-full flex cursor-pointer" >
                                <span className="mx-auto h-8 pt-2 text-xs bg-green w-full text-center absolute bottom-0 text-white" onClick={()=>onClickDeleteImage(img)}>삭제하기</span>
                            </p>
                        </div>
                    )}
                </div>

            </div>

            { openNewModal && <AddNewImage setImages={setImages} onCloseModal={()=>setOpenNewModal(false)} /> }
        </>
    )
}