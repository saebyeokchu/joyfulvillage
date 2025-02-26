"use client"

import { ImageArchive } from "@/types/Types";
import { imageArchiveService } from "@/service";
import { useEffect, useState } from "react"
import Image from "next/image"
import { GeneralError } from "@/lib/messages";
import AddNewImage from "./AddNewImage";
import { EditButton } from "@/components/ui";
import { IndigoRoundButton } from "@/components/ui/Button";
import AdminWrapper from "../component/AdminWrapper";


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
            <AdminWrapper>
                <div className="flex flex-row space-x-3 justify-end">
                    <IndigoRoundButton onClickFunction={() => onClickAddImage()}  btnName={"추가하기"} /> 
                    {/* <IndigoRoundButton onClickFunction={() => setOpenImageLibrary(true)}  btnName={"저장하기"} />  */}
                </div>
                <div className="grid grid-cols-3 gap-12 mt-3">
                    { images.length > 0 && images.map((img : ImageArchive, index : number) => 
                        <div className="border-0 relative" key={`admin_image_${index}`}>
                            <Image className="object-cover w-full h-80"  src={"/images/"+img.imgSrc} width={500} height={400} alt={`image-archive-${index}`} />
                            <p className="w-full flex cursor-pointer" >
                                <span className="mx-auto h-8 pt-2 text-xs bg-joyful-indigo w-full text-center absolute bottom-0 text-white" onClick={()=>onClickDeleteImage(img)}>삭제하기</span>
                            </p>
                        </div>
                    )}
                </div>
            </AdminWrapper>
            { openNewModal && <AddNewImage setImages={setImages} onCloseModal={()=>setOpenNewModal(false)} /> }
        </>
    )
}