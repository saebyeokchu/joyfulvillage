import { useEffect, useState } from "react";
import { Program } from "@/types/Types";
import { isStrValid } from "@/lib/common";
import { ProgramClass } from "@/app/_data/_class/ProgramClass";
import { GeneralError } from "@/lib/messages";
import { programService } from "@/service";
import { CustomTextInput, EditButton, FilledBadge } from "@/components/ui";
import Wysiwyg from "../../_component/Wysiwyg";
import { ImageLibraryModal } from "../../_component";


export default function UpsertProgram({
    onClickListProgram,
    targetProgram
}:{
    onClickListProgram : any,
    targetProgram : ProgramClass
}){
    const [content, setContent] = useState<any>(null);
    let [program, setProgram] = useState(new ProgramClass());
    const [openImageLibrary, setOpenImageLibrary] = useState(false);

    useEffect(()=>{
        if(targetProgram.isValidProgram()){
            program.setProgram(targetProgram);
            setProgram(program);
            setContent(targetProgram.content);
        }
    },[targetProgram])

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
            program.img = imgSrc;
            return true;
        }
    }

    const onClickOpenImageLibrary = () => {
        setOpenImageLibrary(true);
    }

    return (
        <>
            <div className="mt-3 flex flex-row space-x-3">
                <EditButton onClickFunction={onClickListProgram} btnName={"취소하기"} />
                <EditButton onClickFunction={onClickUpsertProgram} btnName={"저장하기"} />
            </div>
            <div className="flex flex-col space-y-3 mt-3">

                <p className="font-bold mt-5">프로그램 이름</p>
                <CustomTextInput inputVal={program.id && program.name || ''} placeholder={""} textRef={undefined} onChangeFunction={(event : any)=>onTextInputChange(event,"name")} />

                <p className="font-bold mt-5">프로그램 한 줄 설명</p>
                <CustomTextInput inputVal={program.id && program.subName || ''} placeholder={""} textRef={undefined} onChangeFunction={(event : any)=>onTextInputChange(event,"subName")} />

                <p className="font-bold mt-5">프로그램 대표 이미지 설정</p>
                { program && program.img ?
                <p><span className="mr-3">이미지 : {program.img} </span><FilledBadge name={"수정하기"} onClickFunction={onClickOpenImageLibrary} /></p>
                :
                <EditButton onClickFunction={onClickOpenImageLibrary} csProps="w-fit" btnName={"이미지 설정하기"} /> }

                <p className="font-bold mt-5">프로그램 내용</p>
                <Wysiwyg content={content} setContent={setContent} isImageAllowed={true} height={600} />
            </div>

            { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setOpenImageLibrary(false)} onClickAddAction={onClickAddAction} />}
        </>
    )
} 
