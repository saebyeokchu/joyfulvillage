import { useState } from "react";
// import Wysiwyg from "../_component/Wysiwyg";
import dynamic from "next/dynamic";
const Wysiwyg = dynamic(() => import("../_component/Wysiwyg"), { ssr: false });

export default function SoksoDetail(){
    const [content, setContent] = useState('');

    const config = {
        readonly: false, // Make the editor editable , "underline", "|", "ul", "ol", "|", "undo", "redo"
        toolbar: true, // Show the toolbar
        toolbarButtonSize: 'small',
        buttons: [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'ul',
            'ol',
            '|',
            'image',
            'file',
            'video',
            'table',
            '|',
            'undo',
            'redo'
        ],
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        height: 300, // Editor height
    };
    
    return(
        <div>
            <div>
                <div className="font-bold text-2xl">대표사진</div>

                <div className="grid gap-2 ">

                    <div className="sm:col-span-4">
                        <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                            숙소 대표 사진
                        </label>
                    </div>

                    <div className="sm:col-span-8">
                        <div className="flex items-center gap-5">
                            <div className="flex gap-x-2">
                            <div>
                                <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                                Upload photo
                                </button>
                            </div>
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
                                <input type="text" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="새로운 숙소 이름" />
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
                                <input type="text" maxLength={70} className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none " placeholder="" />
                        </div>
                    </div>


                </div>
            </div>
            <div className="font-bold text-2xl">전체사진</div>
            <div>
                <div className="font-bold text-2xl">소개글</div>
                <Wysiwyg content={undefined} setContent={undefined} config={config} />
            </div>
            <div>
                <div className="font-bold text-2xl">가격범위</div>
            </div>
        </div>
    )
}