"use client"

import { useEffect, useMemo, useRef, useState } from "react";
import { FatButton } from "../.@/component/Button";
import { useJoyfulContext } from "../../_context/JoyfulContext";
import { UploadImageWithDeletion } from "../../_api/File";
import { EditOption, HomeSection } from "../../../lib/const";

import { UpdateHomeData } from "../../_api/Home";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(
    () => import('jodit-react'),
    { ssr: false}
  )

const TextEditor = ({
    content, setContent
}:{
    content:any, setContent : any
}) => {
	const editor = useRef(null);
    const config = {
        readonly: false, // Make the editor editable , "underline", "|", "ul", "ol", "|", "undo", "redo"
        toolbar: true, // Show the toolbar
        toolbarButtonSize: 'small',
        buttons: ["bold", "italic"],
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        height: 300, // Editor height
    };

	return (
		<JoditEditor
			ref={editor}
            config={config}
			value={content}
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			// onChange={newContent => setContent(newContent)}
		/>
	);
};

export default function EditModal(){
    const joyfulContext = useJoyfulContext();

    const [ imageType, setImageType ] = useState<string>('*');
    const [ editType, setEditType ] = useState<string>('image'); //image or text
	const [content, setContent] = useState('');
    
    useEffect(()=>{
        const title : string = joyfulContext.editModalTitle;

        /*
            main img -> jpg
            main content -> png
            introductionImg -> jpg
        */
        if(title == EditOption.homeMainImg || title == EditOption.introductionImg || title == EditOption.spacesoopImg || title == EditOption.spacebookImg || title == EditOption.spacecafeImg){
            setImageType('jpg');
        }else if(title == EditOption.homeMainContent){
            setImageType('png');
        }else if(title == EditOption.introductionContent || title == EditOption.sapcebookContent || title == EditOption.sapcesoopContent || title == EditOption.sapcecafeContent){
            setEditType('text');
            setContent(joyfulContext.editModalContent);
        }

    },[joyfulContext.editModalTitle])
    
    const closeEditModal = () => {
        joyfulContext.setOpenEditModal(false);
    }

    const onEditModalBtnClick = async () => {
        const inputVal : any = joyfulContext.editVal.current;

        if(inputVal ==null || inputVal.files[0] == null){
            window.alert("수정하고자 하는 내용을 입력하거나 파일을 선택해주세요.")
        }else{
            let updateResult : boolean = false;
            const title : string = joyfulContext.editModalTitle;

            const formData : FormData = new FormData();
            formData.append("image", inputVal.files[0]);

            if(title == EditOption.homeMainImg){
                formData.append("imageName","mainImg.jpg");
                formData.append("folderName","home");
            }else if(title == EditOption.homeMainContent){
                formData.append("imageName","mainContent.png");
                formData.append("folderName","home");
            }else if(title == EditOption.introductionImg){
                formData.append("imageName","introduction.jpg");
                formData.append("folderName","home");
            }else if(title == EditOption.spacesoopImg){
                formData.append("imageName","spacesoop.jpg");
                formData.append("folderName","home");
            }else if(title == EditOption.spacebookImg){
                formData.append("imageName","spacebook.jpg");
                formData.append("folderName","home");
            }else if(title == EditOption.spacecafeImg){
                formData.append("imageName","spacecafe.jpg");
                formData.append("folderName","home");
            }

            updateResult = await UploadImageWithDeletion(formData);
            

            if(updateResult && window.confirm("적용이 완료되었습니다. 새로고침 하시겠습니까?")){
                location.reload();
            }else{
                window.alert("반영이 지연되고 있습니다. 1분 후 시도해주세요.")
            }
            
        }
    }

    const onEditModalTextBtnClick = async() => {
        const title : string = joyfulContext.editModalTitle;
        let section : number = -1;

        if(title == EditOption.sapcebookContent){
            section = HomeSection.spacebook;
        }else if(title == EditOption.sapcesoopContent){
            section = HomeSection.spacesoop;
        }else if(title == EditOption.sapcecafeContent){
            section = HomeSection.spacecafe;
        }

        if(section > -1){
            let updateResult = await UpdateHomeData(section,content);

            if(updateResult && window.confirm("적용이 완료되었습니다. 새로고침 하시겠습니까?")){
                location.reload();
            }

            return;
        }

        window.alert("반영이 지연되고 있습니다. 1분 후 시도해주세요.")

        
    }



    return(
        joyfulContext.openEditModal &&
        <> 
            <div className="w-full size-full fixed top-0 start-0 z-[80]  opacity-60 bg-black "></div>
            <div className="hs-overlay size-full fixed top-0 start-0 z-[80]  overflow-x-hidden transition-all overflow-y-auto " role="dialog" aria-labelledby="hs-basic-modal-label" >
                <div className="z-[90] sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col  shadow-sm rounded-xl pointer-events-auto bg-white">
                    <div className="flex justify-between items-center py-3 px-4 ">
                        <h3 className="font-bold ">
                        {joyfulContext.editModalTitle}
                        </h3>
                        <button type="button" onClick={closeEditModal} className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent hover:bg-point-darker focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none " aria-label="Close" data-hs-overlay="#hs-basic-modal">
                        <span className="sr-only">Close</span>
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                        </button>
                    </div>
                    { editType == 'image' ?
                        <div className="p-4 overflow-y-auto">
                            <p className="mt-1">
                                <input ref={joyfulContext.editVal} type="file" id="img" name="img" accept={`image/${imageType}`} className="block cursor-pointer w-full  
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:bg-yellow-50 file:text-yellow-700
                                    hover:file:bg-yellow-100
                                "/>
                            </p>
                            <p><small>{joyfulContext.editModalTitle}는 {imageType}만 등록 가능합니다</small></p>
                            <p className="mt-2">
                                <FatButton onClickFunction={onEditModalBtnClick} btnName="수정하기" />
                            </p>
                        </div> :
                        <div className="p-4 overflow-y-auto">
                            <TextEditor content={content} setContent={setContent}/>
                            <p className="mt-2">
                                <FatButton onClickFunction={onEditModalTextBtnClick} btnName="수정하기" />
                            </p>
                        </div>
                    }
                    </div>
                </div>
            </div> 
        </>
)
}