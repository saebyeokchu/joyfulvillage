"use client"

import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react"
import Image from "next/image";

import { Cafe, Program } from "@/types/Types";
import { IndigoRoundButton } from "@/components/ui/Button";
import { GeneralError } from "@/lib/messages";
import { Loading, SomeErrorPage } from "@/components/layout";
import { Card, CustomTextInput, FileInput } from "@/components/ui";
import AdminWrapper from "../../component/AdminWrapper";
import CafeWrapper from "../component/CafeWrapper";
import useSWR from "swr";
import { AddCafeData, DeleteCafeDataById, GetCafeDataBySection, ReplaceImg, UpdateCafeData } from "@/lib/url";
import { CafeSection } from "@/lib/enums";
import { getFetcher, postFetcher, postJsonFetcher } from "@/lib/fetcher";
import { isStrValid } from "@/lib/common";
import { ImageLibraryModal } from "../../_component";
import { imgAddress, NoImgSrc } from "@/lib/const";


export default function ManageProgram(){
    const router = useRouter();
    const [ isOpenSpecialModal, setIsOpenSpecialModal ]= useState<boolean>(false);
    const [openImageLibrary, setOpenImageLibrary] = useState(false);
    const [ targetImgSrc, setTargetImgSrc ] = useState<null | string>(null);
    const [ note, setNote ] = useState<null | string>(null);
    const [ mainImgs, setMainImgs ] = useState<string[]>([]);

    const noteRef : any = useRef<string>("");

    const { data, error, mutate  } = useSWR<Cafe[]>(
        GetCafeDataBySection + CafeSection.coffee,
        getFetcher
    );

    console.log(data);

    useEffect(() => {
        if (data && data[0]?.img) {
          setMainImgs(data[0].img.split(";"));
        }

        if (data && data[0]?.content) {
            setNote(data[0].content);
          }
      }, [data]);
      
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


    const onClickDeleteImage = (index: number) => {
        setMainImgs((prev) => prev.filter((item : string, itemIdx : number) => index !== itemIdx));
    };
    
    const onClickSaveCoffee = async () => {
        const content : any = noteRef.current;

        if(content ){
            if(isStrValid(content.value) && mainImgs.length > 0){
                try{
                    const result = await postJsonFetcher([ UpdateCafeData, { data : {
                        id : data[0]?.id || null,
                        section: CafeSection.coffee,
                        content: content.value,
                        img : mainImgs.join(";")
                    } }]);
                    console.log(result);
                    window.alert(GeneralError.success);
                    mutate();
                } catch (error) {
                    console.error(error);
                    window.alert(GeneralError.unknownError+GeneralError.tryLater);
                }
              
            }else{
                window.alert(GeneralError.fillTheAllTheForm);
            }
        }else{
            window.alert(GeneralError.fillTheAllTheForm);
        }
    }

    const onClickAddAction = (imgSrc : string) => {
        setMainImgs([...mainImgs, imgSrc]);
        return true;
    }

    return (
        <>
        <AdminWrapper>
           <CafeWrapper subTitle={"커피 메뉴 관리하기"} buttons={[{onClickFunction :onClickSaveCoffee, btnName : "저장하기"}]}>
                {undefined}
           </CafeWrapper>
            <div className="flex flex-col  shadow-sm rounded-xl pointer-events-auto bg-white">
                <div className="flex justify-between items-center py-3 px-4 ">
                    <h3 id="hs-basic-modal-label" className="font-bold ">
                    커피 메뉴 관리하기
                    </h3>
                </div>
                <div className="p-4 overflow-y-auto">
                    <div className=" flex flex-col space-y-4">
                        <div>
                            <p>커피 메뉴 사진</p>
                            <IndigoRoundButton btnName={"추가하기"} onClickFunction={()=>setOpenImageLibrary(true)} />
                            <div className="flex flex-row space-x-3">
                                { mainImgs.map((src : string, index:number) => 
                                    <div className="border-0 relative bg-white " key={`manage_cafe_mainimg_${index}`}>
                                        <Image loader={()=>imgAddress + src} className="mt-3" height={180} width={200} src={imgAddress + src} alt={imgAddress + src} />
                                        <p className="w-full flex cursor-pointer " >
                                            <span className="mx-auto h-8 pt-2 text-xs bg-joyful-indigo w-full text-center  text-white" onClick={()=>onClickDeleteImage(index)}>삭제하기</span>
                                        </p>
                                </div>
                                ) }
                            </div>
                        </div>
                        <div>
                            <p>커피 메뉴 글씨</p>
                            <CustomTextInput textRef={noteRef} inputVal={note || undefined} placeholder={""} />
                        </div>
                    </div>
                </div>
            </div>
        </AdminWrapper>


        { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setOpenImageLibrary(false)} onClickAddAction={onClickAddAction} /> }
        </>
    )
} 