"use client"
import { useState } from "react";
import Image from "next/image";
import { IndigoRoundButton } from "@/components/ui/Button";
import useSWR from "swr";
import { HomeType } from "@/types";
import { AdminApiAddress, imgAddress } from "@/lib/const";
import { AddHomeImages, DeleteHomeImages, GetHomeImages } from "@/lib/url";
import { Loading, NotFound, SomeErrorPage } from "@/components/layout";
import { useRouter } from "next/navigation";
import { GeneralError } from "@/lib/messages";
import AdminWrapper from "../../component/AdminWrapper";
import { ImageLibraryModal } from "../../_component";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EditHome(){
   
    const [openImageLibrary, setOpenImageLibrary] = useState(false);
    const router = useRouter();
    
    const { data, error, mutate  } = useSWR<HomeType.Home[]>(
        GetHomeImages,
        fetcher
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

    // Later, trigger a refetch:
    const handleRefetch = () => {
        mutate(); // This will re-fetch data from '/api/data'
    };

    async function onClickAddAction(imgSrc : string) {
        try {
            const data = await fetcher(AddHomeImages + imgSrc);
            console.log(data);
          } catch (error) {
            console.error(error);
            return false;
          }
          handleRefetch();
          return true;
    }

    const onClickDeleteImg = async (id : number) => {
        //최소갯수는 1개
        if(data.length == 1){
            window.alert("홈 이미지는 최소 1개여야 합니다.");
            return;
        }
        
        if(window.confirm("해당하는 이미지" + GeneralError.verifyDeletion)){
            try {
                const data = await fetcher(DeleteHomeImages + id);
                console.log(data);
                window.alert(GeneralError.success);
                handleRefetch();
              } catch (error) {
                console.error(error);
                window.alert(GeneralError.unknownError+GeneralError.tryLater);
              }
        }
    }

    return (
        <>
            <AdminWrapper>
                <div className="flex flex-row space-x-3 justify-end">
                    <IndigoRoundButton onClickFunction={() => setOpenImageLibrary(true)}  btnName={"추가하기"} /> 
                    {/* <IndigoRoundButton onClickFunction={() => setOpenImageLibrary(true)}  btnName={"저장하기"} />  */}
                </div>
                <div className="grid grid-cols-3 gap-12 mt-3">
                    { data && data.length > 0 && data.map((d : HomeType.Home, i : number) => 
                        <div className="border-0 relative h-64" key={`admin_image_${i}`}>
                            <Image className="object-cover " fill src={imgAddress + d.imgSrc} loader={()=>imgAddress + d.imgSrc}  alt={`home-image-${i}`} />
                            <p className="w-full flex cursor-pointer" onClick={()=>onClickDeleteImg(d.id)}>
                                <span className="mx-auto h-8 pt-2 text-xs bg-joyful-indigo w-full text-center absolute bottom-0 text-white" >삭제하기</span>
                            </p>
                        </div>
                    ) }
                </div>
            </AdminWrapper>

            { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setOpenImageLibrary(false)} onClickAddAction={onClickAddAction} />}
        </>
    )
}