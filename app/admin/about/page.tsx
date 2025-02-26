"use client"
import { Card } from "@/components/ui";
import AdminWrapper from "../component/AdminWrapper";
import { useState } from "react";
import Image from "next/image";
import { IndigoRoundButton } from "@/components/ui/Button";
import { ImageLibraryModal } from "../_component";
import useSWR from "swr";
import { HomeType } from "@/types";
import { AdminApiAddress } from "@/lib/const";
import { AddHomeImages, DeleteHomeImages, GetHomeImages } from "@/lib/url";
import { Comming, Loading, NotFound, SomeErrorPage } from "@/components/layout";
import { useRouter } from "next/navigation";
import { GeneralError } from "@/lib/messages";

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
        //image 선택했을때 추가하기
        try {
            const data = await fetcher(AddHomeImages + "/images/"+imgSrc);
            console.log(data);
          } catch (error) {
            console.error(error);
            return false;
          }
          handleRefetch();
          return true;
    }

    const onClickDeleteImg = async (id : number) => {
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
                <Comming />
            </AdminWrapper>

            { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setOpenImageLibrary(false)} onClickAddAction={onClickAddAction} />}
        </>
    )
}