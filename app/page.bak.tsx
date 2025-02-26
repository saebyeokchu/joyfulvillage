"use client"

import { useEffect, useState } from "react";
import { GetHomeintrodcutionContent, GetHomeMainImgContent, GetHomeSpaceContent } from "../service/HomeService";
import { mobilePx } from "../lib/const";
import { useJoyfulContext } from "@/context/JoyfulContext";
import { GetHomeData } from "@/api/Home";

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
        <div className="flex flex-col bg-point pb-16  border-0 border-0-red-700 w-full" >
            {/* <EditModal /> */}

            {/* main image */}
            <div className="relative mt-3">
                <img src="/system/home/mainImg.jpg" alt={""} className="w-full object-cover md:h-screen " />
            </div>

            {/* main image text */}
            {/* <div className={`container flex justify-self-center border-0 border-0-slate-700 ${mobilePx} w-screen`}> */}
            <div className={`border-0 flex justify-center border-0-slate-700 w-full`}>
                <div className={`container border-0 border-0-red-700 ${mobilePx} text-center mt-24 text-sm md:text-xl md:mt-32`}>
                    <div
                        dangerouslySetInnerHTML={{ __html: introdcutionContent }}
                    />
                {/* <div className="flex justify-center items-center text-center joyful-text-black mt-16 text-sm md:text-xl md:mt-32">
                    <div
                        dangerouslySetInnerHTML={{ __html: introdcutionContent }}
                    />
                </div> */}
                </div>
            </div>
            
            {/* introduction */}
            <div className={`border-0 flex justify-center border-0-slate-700 w-full`}>
                <div className={`container border-0 border-0-red-700 ${mobilePx} text-center mt-24 text-sm md:text-xl md:mt-32`}>
                    <img 
                        src='/system/home/introduction.jpg' 
                        alt={""} 
                        className={`w-full h-auto text-sm `}
                        // style={{minWidth:'1071px',minHeight:'388px'}}
                    />
                </div>
            </div>

            {/* spaces */}
            <div className={`border-0 flex justify-center border-0-slate-700 w-full`}>
                <div className={`container border-0 border-0-red-700 ${mobilePx} text-center mt-24 text-sm md:text-xl md:mt-32`}>
                    <div className="flex flex-col space-y-3">
                        {/* 숲스테이도천 */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
                            <div className="col-span-1 md:col-span-8">
                                <img src='/system/home/spacesoop.jpg' alt={""} className="object-cover w-full h-48 md:h-96"/>
                            </div>
                            <div className="col-span-1 md:col-span-4 joyful-text-black">
                                <p className="text-2xl md:mt-16 font-bold">숲스테이도천</p>
                                {/* {spaceContents[0]} */}
                                <div className="mt-3 md:mt-6" style={{lineHeight:'28px'}} dangerouslySetInnerHTML={{ __html: spaceContents[0] }}>
                                    {/* '숲스테이 도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.
                                    <br />
                                    숲의 고요함과 맑은 공기를 느끼며, 일상에서 벗어나 완전한 휴식을 경험할 수 있습니다. */}
                                    
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 pt-24 md:pt-0 md:grid-cols-12">
                            <div className="col-span-1 md:col-span-8">
                                <img src='/system/home/spacebook.jpg' alt={""} className="object-cover w-full h-48 md:h-96"/>
                            </div>
                            <div className="col-span-1 md:col-span-4 joyful-text-black">
                                <p className="text-2xl md:mt-16 font-bold">북스테이도천</p>
                                {/* {spaceContents[0]} */}
                                <div className="mt-3 md:mt-6" style={{lineHeight:'28px'}} dangerouslySetInnerHTML={{ __html: spaceContents[1] }}>
                                    {/* '북스테이 도천'은 조이풀빌리지 1층에 위치해있으며 미디어를 잠시 멀리하며 책을 읽고 휴식을 즐길 수 있는 공간입니다.
                                    <br />
                                    자연과 책이 조화를 이루는 이곳에서 마음의 평온을 찾고, 독서의 즐거움을 만끽할 수 있습니다. */}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 pt-24 md:pt-0 md:grid-cols-12">
                            <div className="col-span-1 md:col-span-8">
                                <img src='/system/home/spacecafe.jpg' alt={""} className="object-cover w-full h-48 md:h-96"/>
                            </div>
                            <div className="col-span-1 md:col-span-4 joyful-text-black">
                                <p className="text-2xl md:mt-16 font-bold">카페도천</p>
                                {/* {spaceContents[0]} */}
                                <div className="mt-3 md:mt-6" style={{lineHeight:'28px'}} dangerouslySetInnerHTML={{ __html: spaceContents[2] }}>
                                {/* '카페 도천'은 조이풀빌리지 2층에 위치하여 산과 들의 아름다운 풍경을 바라보며 차와 브런치를 즐길 수 있는 공간입니다. */}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 
                    <div className="mb-24 lg:mb-80">
                        <p className="font-bold">'카페도천'</p>
                        <div className="relative">
                            <img src='/system/home/spacecafe.jpg' alt={""} className="h-auto max-w-full pt-7" />
                        </div>
                        <div className="pt-6 text-sm relative">
                            {spaceContents[2]}
                        </div>
                    </div> */}
                </div>
            </div>
        </div>  
    )
}