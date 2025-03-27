import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import ImageLibraryModal from "./ImageLibraryModal";
const JoditEditor = dynamic(
    () => import('jodit-react'),
    { ssr: false}
  )


export default function Wysiwyg({
    content, setContent, isImageAllowed = true, height = 600
}:{
    content:any, setContent : any, isImageAllowed : boolean, height : number
}){
    const editorRef = useRef<any>(null);
    // const [editorInstance, setEditorInstance] = useState<any | null>(null);
    // const [textContent, setTextContent] = useState<any | null>(null);
    // const [openImageLibrary, setOpenImageLibrary] = useState(false);

    const config : any= {
        readonly: false, // Make the editor editable
        toolbar: true, // Show the toolbar
        toolbarButtonSize: "small",
        buttons: [
          "bold",
          "italic",
          "underline",
          "ul", 
          "ol",
          "hr",
          "font",
          "fontsize",
          "fontColor",
          "|",
          "outdent",
          "indent",
          "align",
          "|",
          "undo",
          "redo",
          "|",
          "video",
          "link",
          "image",
          "|",
        ],
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        height: height, // Editor height
        removeButtons: ["source",  "spellcheck",  "speechRecognize"], // Remove extra buttons that may still appear
        toolbarSticky: false, // Ensure toolbar stays inside editor,
        "uploader": {
            "insertImageAsBase64URI": true
          }
      };

      // if(isImageAllowed){
      //   config.buttons.push({
      //       name: "이미지 추가",
      //       icon: "<i class='jodit-icon jodit-icon_image'></i>", // or use your own icon HTML
      //       tooltip: "Insert Image",
      //       exec: (editorInstance : any) => {
      //         // Custom logic: for example, using a file input or prompt.
      //         // Here we use a prompt for simplicity.
      //         // const imageUrl = prompt("Enter the image URL:");
      //         // if (imageUrl) {
      //         //   // Insert the image at the current cursor position
      //         //   editorInstance.s.insertHTML(`<img src="${imageUrl}" alt="Custom Image" />`);
      //         // }
      //       setOpenImageLibrary(true);
      //       setEditorInstance(editorInstance);
      //     },
      //   },);
      // }

      const insertCustomHTML = (html : string) => {
        console.log(html);
        if (editorRef.current) {
          // Access the underlying Jodit instance; depending on your version,
          // it may be available via `editorRef.current.editor`
          const instance = editorRef.current.editor;

          if (instance && instance.s) {
            instance.s.insertHTML(html);
          }
        }
      };

      // const onClickAddAction = (imgSrc: string) => {
      //   const instance = editorRef.current;
      //   if (instance) {
      //     console.log(instance.selection);
      //     instance.focus();
      //     instance.insertHTML(`<img src="${imgSrc}" alt="Custom Image" />`);
      //     setContent(instance.getEditorValue());
      //   }
      //   setOpenImageLibrary(false);
      //   return true;
      // };

    return (
        <>
        {/* { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setOpenImageLibrary(false)} onClickAddAction={onClickAddAction} />} */}
        <JoditEditor
            ref={editorRef}
            config={config}
            value={content}
            onBlur={newContent =>setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            // onChange={newContent =>  setTextContent(newContent)}
            // onChange={(newContent) => {
            //     // console.log("Content changed:", newContent);
            //     setContent(newContent);
            //   }}
            // onChange={newContent => setContent(newContent)}
        />
        </>
    );
}

