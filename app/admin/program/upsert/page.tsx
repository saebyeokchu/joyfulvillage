"use client"

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { Program } from "@/types/Types";
import { isStrValid } from "@/lib/common";
import { GeneralError } from "@/lib/messages";
import { programService } from "@/service";
import { CustomTextInput, EditButton, FilledBadge } from "@/components/ui";
import Wysiwyg from "../../component/Wysiwyg";
import { ImageLibraryModal } from "../../_component";
import { ProgramClass } from "@/class/ProgramClass";
import { useProgramContext } from "@/context/ProgramContext";
import AdminWrapper from "../../component/AdminWrapper";
import { GrayRoundButton, IndigoRoundButton } from "@/components/ui/Button";
import { CustomTextArea } from "@/components/ui/CustomInput";
import { useRouter } from "next/navigation";


export default function UpsertProgram(){
    const [content, setContent] = useState<string>("");
    const [program, setProgram] = useState(new ProgramClass());
    const [openImageLibrary, setOpenImageLibrary] = useState(false);

    const programContext = useProgramContext();
    const router = useRouter();

    const targetProgram = useMemo(()=>{
        if(programContext.targetProgram.isValidProgram()){
            program.setProgram(programContext.targetProgram);
            setProgram(program);
            setContent(programContext.targetProgram.content);
        }
    },[programContext.targetProgram])

    console.log(targetProgram);

    const onTextInputChange = (event : any, column : string) => {
        const value = event.target.value;
        if(isStrValid(value) && program){
            if(column == "name"){
                program.name = value;
            }else if(column == "subName"){
                program.subName = value;
            }

            setProgram(program);
        }
    }

    const onClickUpsertProgram = async () => {
        
        //모든 정보 입력확인
        if(content && isStrValid(content)){
            program.content = content;
        }

        if(program.isValidProgram()){
            console.log("[onClickUpsertProgram]",program.getProgram());

            await programService.upsert(program.getProgram()).then((response : any)=>{
                if(response) {
                    window.alert(GeneralError.success);
                    onClickListProgram();
                }else{
                    window.alert(GeneralError.unknownError+GeneralError.tryLater);
                }
            });
        }else{
            window.alert(GeneralError.fillTheAllTheForm);
        }

    } 

    const onClickAddAction = (imgSrc : string) => {
        if(program){
            program.img = "/images/"+imgSrc;
            return true;
        }
    }

    const onClickOpenImageLibrary = () => {
        setOpenImageLibrary(true);
    }

    const onClickListProgram = () => router.push("/admin/program");

    return (
        <>
            <AdminWrapper>
                <div className="flex flex-row space-x-3 justify-end">
                    <IndigoRoundButton onClickFunction={onClickListProgram} btnName={"취소하기"} />
                    <IndigoRoundButton onClickFunction={onClickUpsertProgram} btnName={"저장하기"} />
                </div>
                
                <div className="flex flex-row rounded-3xl">
                    <div className="flex flex-col space-y-3 pr-5">
                        <p className=" mt-5 ">이름(20자까지)</p>
                        <CustomTextInput
                            maxLength={20}
                            inputVal={program.id && program.name || ''} 
                            placeholder={""} 
                            textRef={undefined} 
                            onChangeFunction={(event : any)=>onTextInputChange(event,"name")} 
                        />

                        <p className=" mt-5">한 줄 설명(60자까지)</p>
                        <CustomTextArea  
                            maxLength={60}
                            inputVal={program.id && program.subName || ''} 
                            placeholder={""} 
                            textRef={undefined} 
                            onChangeFunction={(event : any)=>onTextInputChange(event,"subName")} />

                        <p className=" mt-5">대표 이미지 설정</p>
                        { program && program.img ?
                        <IndigoRoundButton btnName={"수정하기"} onClickFunction={onClickOpenImageLibrary} />
                        :
                        <IndigoRoundButton onClickFunction={onClickOpenImageLibrary} btnName={"이미지 설정하기"} /> }
                        <Image 
                            src={ ( program && program.img ) || '/images/system/no-image.png'}
                            width={250}
                            height={350}
                            alt="upsert-main-img"
                            className="object-cover"
                        />
                    </div>
                    
                    <div className="col-span-2 flex flex-col space-y-3  flex-1">
                        <p className=" mt-5">프로그램 내용</p>
                        <Wysiwyg content={content} setContent={setContent} isImageAllowed={true} height={600} />
                    </div>
                </div>
            </AdminWrapper>
            {/* <div className="mt-3 flex flex-row space-x-3">
                <EditButton onClickFunction={onClickListProgram} btnName={"취소하기"} />
                <EditButton onClickFunction={onClickUpsertProgram} btnName={"저장하기"} />
            </div> */}
            
            { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setOpenImageLibrary(false)} onClickAddAction={onClickAddAction} />}
        </>
    )
} 
