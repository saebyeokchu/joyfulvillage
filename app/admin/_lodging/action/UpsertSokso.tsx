import { useEffect, useRef } from "react";
import Image from "next/image"

import { getCurrentTimestamp } from "@/app/_api/Common";
import { GeneralError } from "@/lib/messages";
import { SoksoClass } from "@/app/_data/_class/SoksoClass";
import { Sokso } from "@/types/Types";
import { imageArchiveService, soksoService } from "@/service"
import { EditButton, FileInput } from "@/app/_component";

export default function UpsertSokso({ 
    level,
    group,
    onCloseModal,
    updateSoksos,
    targetSokso
 }:{ 
    level : number,
    group : null | number,
    onCloseModal : any,
    updateSoksos : any,
    targetSokso : Sokso | null
}) {

    const nameRef = useRef(null);
    const introductionRef = useRef(null);
    const reserveLinkRef = useRef(null);
    const mainImgRef = useRef(null);

    useEffect(()=>{
        init(); 
    },[]);

    const init = () => {
        if(targetSokso){
            const newName : any = nameRef.current;
            const newIntroduction : any = introductionRef.current;
            const newReserveLink : any = reserveLinkRef.current;

            if(newName){
                newName.value = targetSokso.name;
            }

            if(newIntroduction){
                newIntroduction.value = targetSokso.introduction;
            }

            if(newReserveLink){
                newReserveLink.value = targetSokso.reserveLink;
            }
        }
    }

    const uploadMainImg = async (imageFile : any) : Promise<string | undefined> => {
        const thisImgName : string = getCurrentTimestamp();
        const fileExtender : string = imageFile.name.split(".")[1];
        const formData : FormData = new FormData();
        formData.append("image", imageFile);
        formData.append("imageName", thisImgName);
            
        //확장자 필요
        const newImageName = thisImgName + "." + fileExtender;
        const uploadResult = await imageArchiveService.upload(formData);

        if(uploadResult){
            return newImageName;
        }
    }

    const onClickAddNewSokso = async () => {
        const newName : any = nameRef.current;
        const newIntroduction : any = introductionRef.current;
        const newMainImg : any = mainImgRef.current;
        const newReserveLink : any = reserveLinkRef.current;

        if(newName && newIntroduction && newMainImg && newReserveLink){
            const mainImg = newMainImg.files[0];
            // step 1 : add main image to public folder first
            if(mainImg && newName.value && newIntroduction.value){
               const newImageName = await uploadMainImg(mainImg);
               if(newImageName){
                 //step 2 : add to sokso database
                 let newSokso = new SoksoClass();
                 newSokso.level = level;
                 newSokso.group = group;
                 newSokso.name = newName.value;
                 newSokso.introduction = newIntroduction.value;
                 newSokso.mainImg=newImageName;
                 newSokso.reserveLink=newReserveLink.value;
                 await soksoService.upsertSokso(newSokso.getSokso()).then(async response => {
                     if(response){
                        //  await updateSoksos();
                        //  onCloseModal();
                     }else{
                         window.alert(GeneralError.unknownError);
                     }
                 });
               }
            }else{
                window.alert(GeneralError.fillTheAllTheForm);
            }   

            return;
        }else{
            window.alert(GeneralError.notValidInfo + GeneralError.tryLater);
        }
    }

    const onClickEditSokso = async () => {
        const newName : any = nameRef.current;
        const newIntroduction : any = introductionRef.current;
        const newMainImg : any = mainImgRef.current;
        const newReserveLink : any = reserveLinkRef.current;

        if(targetSokso && targetSokso.id){
            //step1 이미지처리
            const mainImg = newMainImg.files[0];
            let newImageName : string | undefined = '';
            if(mainImg){
                newImageName = await uploadMainImg(mainImg);
            }

            //step2 이미지, introduction, reservelink처리 
            let newSokso = new SoksoClass();
            newSokso.id = targetSokso.id;
            if(newName && newName.value){
                newSokso.name = newName.value;
            }
            if(newIntroduction && newIntroduction.value){
                newSokso.introduction = newIntroduction.value;
            }
            if(newReserveLink && newReserveLink.value){
                newSokso.reserveLink = newReserveLink.value;
            }
            if(newImageName){
                newSokso.mainImg=newImageName;
            }

            console.log("edit sokso", newSokso.getSokso());

            await soksoService.upsertSokso(newSokso.getSokso()).then(async response => {
                if(response){
                    await updateSoksos();
                    onCloseModal();
                }else{
                    window.alert(GeneralError.unknownError);
                }
            });
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
                                새로운 숙소 {targetSokso ? "수정" : "추가"}하기
                            </h3>
                            <span className="sr-only">Close</span>
                            <svg onClick={onCloseModal} className="shrink-0 size-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </div>
                        <div className=" overflow-y-auto">
                                <div className="bg-whites sm:p-7 ">
                                        <div className="grid gap-2 ">

                                            <div className="sm:col-span-4">
                                                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                                    숙소 대표 사진
                                                </label>
                                            </div>

                                            <div className="sm:col-span-8">
                                                <div className="flex items-center gap-5">
                                                    <div className="flex flex-col gap-x-2">
                                                        <div>
                                                            <FileInput imgRef={mainImgRef} />
                                                        </div>
                                                        {/* 수정할때 미리보기 */}
                                                        { targetSokso && targetSokso.mainImg !=  '' && <div>
                                                            <Image src={"/images/"+targetSokso.mainImg} alt={""} layout="intrinsic" width={600} height={400} />
                                                        </div> }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                                    숙소 이름
                                                </label>
                                            </div>

                                            <div className="sm:col-span-8">
                                                <div className="flex items-center gap-5">
                                                        <input ref={nameRef} type="text" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="새로운 숙소 이름" />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                                    숙소 소개
                                                    <br />
                                                    (최대 70자)
                                                </label>
                                            </div>

                                            <div className="sm:col-span-8">
                                                <div className="flex items-center gap-5">
                                                        <input ref={introductionRef} type="text" maxLength={70} className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="짧은 숙소 소개글" />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                                    예약링크
                                                </label>
                                            </div>

                                            <div className="sm:col-span-8">
                                                <div className="flex items-center gap-5">
                                                        <input ref={reserveLinkRef} type="text" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="예약하기 클릭 시 연결링크" />
                                                </div>
                                            </div>
                                            
                                         
                                        </div>

                                        <div className="mt-5 flex justify-end gap-x-2">
                                            {
                                                targetSokso ? 
                                                <EditButton onClickFunction={onClickEditSokso} btnName={"수정하기"} />
                                                :
                                                <EditButton onClickFunction={onClickAddNewSokso} btnName={"추가하기"} />
                                            }
                                        </div>
                                </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    )
}