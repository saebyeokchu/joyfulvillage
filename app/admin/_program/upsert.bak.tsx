import { EditButton } from "@/app/_component/Button";
import { CustomTextInput } from "@/app/_component/CustomInput";
import { programService } from "@/app/_service";
import { useEffect, useState } from "react";
import Wysiwyg from "../_component/Wysiwyg";


export default function AddProgram(){
    const [content, setContent] = useState(null);
    const config = {
        readonly: false, // Make the editor editable , "underline", "|", "ul", "ol", "|", "undo", "redo"
        toolbar: true, // Show the toolbar
        toolbarButtonSize: 'small',
        buttons: ["bold", "italic" ,"underline", "ul", "ol", 'hr', 'font',
        'fontsize',"|", 'outdent', 'indent',  '|',"undo", "redo", "|", "image", "video", 'link'],
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        height: 600, // Editor height
    };


    return (
        <div className="flex flex-col p-20">
            <div className="flex flex-row justify-between">
                <p className="font-bold text-4xl">프로그램 추가</p>
                <div className="flex flex-row space-x-2">
                    <EditButton onClickFunction={undefined} btnName={"프로그램 목록으로 돌아가기"} />
                    <EditButton onClickFunction={undefined} btnName={"저장하기"} />
                </div>
            </div>
            <div className="flex flex-col space-y-3  mt-3 w-2/3">

                <CustomTextInput placeholder={"프로그램 이름"} textRef={undefined} />
                <CustomTextInput placeholder={"프로그램 한 줄 설명"} textRef={undefined} />

                <Wysiwyg content={content} setContent={setContent} config={config} />
            </div>
        </div>
    )
} 