import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const JoditEditor = dynamic(
    () => import('jodit-react'),
    { ssr: false}
  )


export default function Wysiwyg({
    content, setContent, config
}:{
    content:any, setContent : any, config : any
}){
    const editor = useRef(null);
    const [value, setValue] = useState('');

    return (
        <JoditEditor
            ref={editor}
            config={config}
            value={content}
            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            // onChange={newContent => setContent(newContent)}
        />
    );
}