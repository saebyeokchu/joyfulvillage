"use client"


import { useRef, useState } from "react";
import Image from "next/image";
import AdminWrapper from "../../component/AdminWrapper";
import { Cafe } from "@/types/Types";
import { cafeService } from "@/service";
import CafeWrapper from "../component/CafeWrapper";
import { CafeSection } from "@/lib/enums";
import { GeneralError } from "@/lib/messages";
import useSWR from "swr";
import { DeleteCafeDataById, GetCafeDataBySection } from "@/lib/url";
import { getFetcher } from "@/lib/fetcher";
import { Loading, SomeErrorPage } from "@/components/layout";
import { useRouter } from "next/navigation";
import { ImageLibraryModal } from "../../_component";
import { imgAddress } from "@/lib/const";


export default function CafeIntroduction(){
    const [ cafeContent, setCafeContent ] = useState<Cafe[]>([]);
    const [ openImageLibrary , setImageLibrary ] = useState<boolean>(false);
    const router = useRouter();

    const onClickAddImage = () => {
        setImageLibrary(true);
    }

    
    const { data, error, mutate  } = useSWR<Cafe[]>(
        GetCafeDataBySection + CafeSection.mainImgs,
        getFetcher
    );

        
    if (!data) {
        return <AdminWrapper>
            <Loading />
        </AdminWrapper>;
    }

    if (error) {
        return (
            <SomeErrorPage onClickFunction={() => router.push("/admin")} error={error} />
        );
    }

    const onClickAddAction = async (imgSrc : string) => {
        //make image string with string divider
        const response = await cafeService.create({
            section : CafeSection.mainImgs,
            img : imgSrc
        });

        console.log("onClickAddAction", response);

        if(response){
            mutate();
            return true;
        }

    }

    const onClickDeleteImage = async (id : number | undefined) => {
        if(id){
            if(window.confirm("해당 이미지" + GeneralError.verifyDeletion)){
                try {
                    await getFetcher(DeleteCafeDataById + id);
                    mutate();
                  } catch (error) {
                    window.alert(GeneralError.unknownError + " " + GeneralError.tryLater)
                  }
            }
        }else{
            window.alert(GeneralError.notValidInfo + " " + GeneralError.tryLater);
        }
        
    }
    const onClickEditBtn = () => {

    };

    return (
            <>
                <AdminWrapper>
                    <CafeWrapper 
                        subTitle="카페 도천 이미지" 
                        buttons={[{onClickFunction : onClickAddImage, btnName : "추가하기"}]}>
                        <div className="flex flex-col space-y-3">
                            <div className="grid grid-cols-3 gap-3">
                                { data.length > 0 && data.map((d : Cafe, index : number) => 
                                    <div className="border-0 relative bg-white h-[300px]" key={`manage_cafe_mainimg_${index}`}>
                                        {d.img && typeof d.img === 'string' && (
                                            <>
                                                <Image loader={()=>imgAddress + d.img} src={imgAddress + d.img} fill alt={`image-archive-${index}`} className="object-cover" />
                                                <p className="w-full flex cursor-pointer absolute bottom-0" >
                                                    <span className="mx-auto h-8 pt-2 text-xs bg-joyful-indigo w-full text-center  text-white" onClick={()=>onClickDeleteImage(d.id)}>삭제하기</span>
                                                </p>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CafeWrapper>
                </AdminWrapper>
                { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setImageLibrary(false)} onClickAddAction={onClickAddAction} />}
            </>
    )
}

