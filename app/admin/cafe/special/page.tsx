"use client"

import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react"
import Image from "next/image";

import { Cafe, Program } from "@/types/Types";
import { programService } from "@/service";
import { ProgramClass } from "@/class/ProgramClass";
import { IndigoRoundButton } from "@/components/ui/Button";
import { GeneralError } from "@/lib/messages";
import { Loading, SomeErrorPage } from "@/components/layout";
import { Card, CustomTextInput, FileInput } from "@/components/ui";
import { useProgramContext } from "@/context/ProgramContext";
import AdminWrapper from "../../component/AdminWrapper";
import CafeWrapper from "../component/CafeWrapper";
import useSWR from "swr";
import { AddCafeData, DeleteCafeDataById, GetCafeDataBySection, ReplaceImg, UpdateCafeData } from "@/lib/url";
import { CafeSection } from "@/lib/enums";
import { getFetcher, postFetcher, postJsonFetcher } from "@/lib/fetcher";
import { isStrValid } from "@/lib/common";
import { ImageLibraryModal } from "../../_component";
import { NoImgSrc } from "@/lib/const";


export default function ManageProgram(){
    const router = useRouter();
    const [ isOpenSpecialModal, setIsOpenSpecialModal ]= useState<boolean>(false);
    const [openImageLibrary, setOpenImageLibrary] = useState(false);
    const [ targetImgSrc, setTargetImgSrc ] = useState<null | string>(null);
    const [ targetSpecial, setTargetSpecial ] = useState<null | Cafe>(null);

    const imgRef : any = useRef<any>(null);
    const nameRef : any = useRef<string>("");
    const introRef : any = useRef<string>("");

    const onClickEditBtn = (targetSpecial : Cafe | undefined) => {
        if(targetSpecial){
            // targetProgram.setProgram(targetSpecial);
            // setTargetProgram(targetProgram);
            // programContext.targetProgram.setProgram(program);
            setTargetImgSrc(targetSpecial.img || null);
            setTargetSpecial(targetSpecial);
            setIsOpenSpecialModal(true);
        }else{
            window.alert(GeneralError.unknownError + GeneralError.tryLater);
        }
    }

    const { data, error, mutate  } = useSWR<Cafe[]>(
        GetCafeDataBySection + CafeSection.specials,
        getFetcher
    );

    console.log(data);
      
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

    const onClickDeleteBtn = async ( id : number | null) => {
        if(id){
            if(window.confirm("해당 스페셜 매뉴" + GeneralError.verifyDeletion)){
                // images.splice(images.indexOf(imgSrc), 1);
                // setImages(images);
                try {
                    const data = await getFetcher(DeleteCafeDataById + id);
                    mutate();
                  } catch (error) {
                    window.alert(GeneralError.unknownError + " " + GeneralError.tryLater)
                  }
            }
        }else{
            window.alert(GeneralError.notValidInfo + " " + GeneralError.tryLater);
        }
    }
    
    
    const onClickSaveSpecial = async () => {
        const name : any = nameRef.current;
        const intro : any = introRef.current;

        if(name && intro && targetImgSrc ){
            if(isStrValid(name.value) && isStrValid(intro.value)){
                try{
                    console.log("targetImgSrc",targetImgSrc);
                    const result = await postJsonFetcher([targetSpecial ? UpdateCafeData : AddCafeData, { data : {
                        id : targetSpecial?.id || null,
                        section: CafeSection.specials,
                        content: intro.value,
                        note: name.value,
                        img: targetImgSrc
                    } }]);
                    console.log(result);
                    window.alert(GeneralError.success);
                    mutate();
                    setIsOpenSpecialModal(false);
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
        setTargetImgSrc("/images/"+imgSrc);
        return true;
    }


    return (
        <>
        <AdminWrapper>
           <CafeWrapper subTitle={"스페셜 메뉴 관리하기"}buttons={[{onClickFunction : ()=>setIsOpenSpecialModal(true), btnName : "추가하기"}]}>
                {undefined}
           </CafeWrapper>
            <div className="grid grid-cols-3 gap-12 mt-3">
                { data.map((d : Cafe)=>
                    <div key={`program-manage-${d.id}`} >
                        <Card 
                            name={d.note!} 
                            address={d.content!} 
                            images={[d.img!]} 
                            onClickImage={()=>onClickEditBtn(d)} 
                            wrapperId={d.id!.toString()} 
                            alt={""}
                            bgColor="bg-white p-5"
                        >
                            <div className="flex flex-row space-x-3 justify-center">
                                <IndigoRoundButton onClickFunction={()=>onClickEditBtn(d)} btnName={"수정하기"} />
                                <IndigoRoundButton onClickFunction={()=>onClickDeleteBtn(d.id!)} btnName={"삭제하기"} />
                            </div>
                        </Card>
                      
                    </div>
                )}
            </div>
        </AdminWrapper>

        { isOpenSpecialModal && <div id="hs-basic-modal" className="font-pretendard size-full fixed top-0 start-0 opacity-100 overflow-x-hidden transition-all overflow-y-auto pointer-events-none" role="dialog" aria-labelledby="hs-basic-modal-label">
            <div className="h-full w-full bg-black absolute bg-opacity-25 overflow-y-hidden"></div>
            <div className="fixed top-0 left-1/3 sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div className="flex flex-col  shadow-sm rounded-xl pointer-events-auto bg-white">
                <div className="flex justify-between items-center py-3 px-4 ">
                    <h3 id="hs-basic-modal-label" className="font-bold ">
                    스페셜 메뉴 추가하기
                    </h3>
                    <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border-0 border-0-transparent hover:bg-point-darker focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none " onClick={()=>setIsOpenSpecialModal(false)}>
                    <span className="sr-only">Close</span>
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                    </button>
                </div>
                <div className="p-4 overflow-y-auto">
                    <div className=" flex flex-col space-y-4">
                        <div>
                            <p>스페셜 메뉴 사진</p>
                            <IndigoRoundButton btnName={"선택하기"} onClickFunction={()=>setOpenImageLibrary(true)} />
                            <Image className="mt-3" height={180} width={200} src={targetImgSrc || NoImgSrc} alt={""} />
                        </div>
                        <div>
                            <p>스페셜 메뉴 이름</p>
                            <CustomTextInput placeholder={"스페셜 메뉴 이름"} textRef={nameRef} inputVal={targetSpecial?.note || undefined} />
                        </div>
                        <div>
                            <p>스페셜 메뉴 설명</p>
                            <CustomTextInput placeholder={"스페셜 메뉴 설명"} textRef={introRef} inputVal={targetSpecial?.content || undefined} />
                        </div>
                    </div>
                    <div className="mt-4 w-full flex justify-center space-x-3">
                        <IndigoRoundButton onClickFunction={()=>setIsOpenSpecialModal(false)} btnName={"닫기"} />
                        <IndigoRoundButton onClickFunction={()=>onClickSaveSpecial()} btnName={"저장하기"} />
                    </div>
                </div>
                </div>
            </div>
        </div> }

        { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setOpenImageLibrary(false)} onClickAddAction={onClickAddAction} /> }
        </>
    )
} 