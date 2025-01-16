"use client"

import { useEffect, useRef, useState } from "react"
import { AdminCode } from "../_data/Const";
import { useJoyfulContext } from "../_context/JoyfulContext";
import { GetHomeData } from "../_api/Home";
import EditModal from "../admin/editModal";
import { EditOption, HomeSection } from "../_data/Enums";
import { GetHomeintrodcutionContent, GetHomeMainImgContent, GetHomeSpaceContent } from "../_data/Home";

export default function Home(){

    const joyfulContext = useJoyfulContext();
    const [ mainImgContent, setMainImgContent ] = useState<[string,string,string]>(["","",""]);
    const [ introdcutionContent, setIntrodcutionContent ] = useState<string>("");
    const [ spaceContents, setSpaceContents ] = useState<[string,string,string]>(["","",""]);


    useEffect(() => {
        const homeDataUpdated : string | null =  localStorage.getItem("joyfulhomedataupdated");
        //update when page reloaded
        if(true){
            GetHomeData().then(response => {
                if(response.status == 200){
                    GetHomeMainImgContent(response.data, setMainImgContent);
                    GetHomeintrodcutionContent(response.data, setIntrodcutionContent);
                    GetHomeSpaceContent(response.data, setSpaceContents);
                }
            });
        }
    }, [])


    return (
        <div className="flex flex-col bg-point ">
            {/* <EditModal /> */}

            {/* main image */}
            <div className="relative ">
                <img src="/system/home/mainImg.jpg" alt={""} className="h-auto w-full" />
                <div className={`block w-full text-white text-center h-auto p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:hidden`}>
                    {/* <img  src="/system/home/mainContent.png" alt={""} className=" h-auto mx-auto" width={362} /> */}
                     <p className="text-xl font-bold">{mainImgContent[0]}</p>
                     <p className="text-sm mt-1">{mainImgContent[1]}<br /> {mainImgContent[2]}</p>
                </div>
                <div className={`hidden w-full text-white text-center h-auto p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:block`}>
                    {/* <img  src="/system/home/mainContent.png" alt={""} className=" h-auto mx-auto" width={362} /> */}
                     <p className="text-3xl font-bold">{mainImgContent[0]}</p>
                     <p className="text-base mt-1">{mainImgContent[1]}<br /> {mainImgContent[2]}</p>
                </div>
            </div>

            {/* introduction */}
            <div className="mt-24 mx-12 md:mt-80 md:mx-56 text-center relative">
                <div>
                    <img src='/system/home/introduction.jpg' alt={""} className={`h-auto min-h-36 text-sm ${joyfulContext.isAdmin && "border border-slate-600"}`} width={1076} />
                </div>
                <div className="pt-6 relative">
                    {introdcutionContent}
                </div>
            </div>

            {/* spaces */}
            <div className="flex flex-col text-center text-point mt-24  mx-12 md:mx-56 md:mt-80">
                <div className="mb-24 lg:mb-80">
                    <p className="font-bold">'숲스테이도천'</p>
                    <div className="relative">
                        <img src='/system/home/spacesoop.jpg' alt={""} className="h-auto max-w-full pt-7" />
                    </div>
                    <div className="pt-6 text-sm relative">
                        {spaceContents[0]}
                    </div>
                </div>
                <div className="mb-24 lg:mb-80">
                    <p className="font-bold">'북스테이도천'</p>
                    <div className="relative">
                        <img src='/system/home/spacebook.jpg' alt={""} className="h-auto max-w-full pt-7" />
                    </div>
                    {/* /book/5.jpeg */}
                    <div className="pt-6 text-sm relative">
                        {spaceContents[1]}
                    </div>
                </div>
                <div className="mb-24 lg:mb-80">
                    <p className="font-bold">'카페도천'</p>
                    <div className="relative">
                        <img src='/system/home/spacecafe.jpg' alt={""} className="h-auto max-w-full pt-7" />
                    </div>
                    {/* /cafe/11.jpeg */}
                    <div className="pt-6 text-sm relative">
                        {spaceContents[2]}
                    </div>
                </div>
            </div>
        </div>  
    )
}