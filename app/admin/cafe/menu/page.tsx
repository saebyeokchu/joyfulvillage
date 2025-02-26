"use client"


import { CustomTextInput, EditButton, FileInput, FilledBadge, OutlineBadge } from "@/components/ui";
import { useRef, useState } from "react";
import AdminWrapper from "../../component/AdminWrapper";
import CafeWrapper from "../component/CafeWrapper";
import Image from "next/image";
import { ImagePopUp, Loading, SomeErrorPage } from "@/components/layout";
import useSWR from "swr";
import { Cafe } from "@/types/Types";
import { GetCafeDataBySection, ReplaceImg } from "@/lib/url";
import { getFetcher, postFetcher } from "@/lib/fetcher";
import { CafeSection } from "@/lib/enums";
import { useRouter } from "next/navigation";
import { GeneralError } from "@/lib/messages";
import { cafeService } from "@/service";


export default function CafeMenu(){

    const router = useRouter();
    const imgRef = useRef(null);

    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

    const subTitleRef = useRef<any>(null);
    const onClickEditBtn = async () => {

        try {
            const replaceTarget : any = imgRef.current;
            
            if(replaceTarget){
                if(replaceTarget.files[0] != null){
                    const formData = new FormData();
                    formData.append('previousPath', 'system/menu.png');
                    formData.append('image', replaceTarget.files[0]);
                    const data = await postFetcher([ReplaceImg, formData]);
                    console.log(data);
                    window.alert(GeneralError.success);
                }else{
                    window.alert(GeneralError.unknownError+GeneralError.tryLater);
                }
            }
          } catch (error) {
            console.error(error);
            window.alert(GeneralError.unknownError+GeneralError.tryLater);
          }

        // const subTitle = subTitleRef.current;

        // if(subTitle && subTitle.value){
        //     const response = await cafeService.updateCafe({ section : CafeSection.subTitle, content : subTitle.value});
        //     if(response){
        //         window.alert(GeneralError.successfullySaved);
        //     }
        // }else{
        //     window.alert("수정하고자하는 소개글을"+ GeneralError.fillTheInput)
        // }
    };

    // const { data, error, mutate } = useSWR<[string, any], any>(
    //     [GetCafeDataBySection, { section : CafeSection.subTitle}],
    //     postFetcher
    // );



    return (
        <>
            <AdminWrapper>
                <CafeWrapper subTitle="메뉴판 이미지 수정하기" buttons={[{onClickFunction : onClickEditBtn, btnName : "저장하기"}]}>
                    <FileInput imgRef={imgRef} />
                    <small>메뉴판 이미지는 캐시를 사용합니다. 반영되기까지 다소 시간이 소요되니 기다리시거나 캐시를 삭제하여 주세요.</small>
                    <Image src="/images/system/menu.png" alt="cafe-dochecn-menu" width={400} height={300} className="mt-3 hover:scale-105 hover:opacity-50 cursor-pointer duration-1000 ease-in-out transition-all" onClick={()=>setIsModalOpen(true)}/>
                </CafeWrapper>
            </AdminWrapper>
           
            {isModalOpen && <ImagePopUp images={["/images/system/menu.png"]} onCloseModal={()=>setIsModalOpen(false)} />}
            
        </>
    )
}