"use client"
import { useParams, useRouter, useSearchParams  } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image'

import { OpenWindow } from "@/lib/common";
import MobileSlider from "./MobileSlider";
import { useSoksoContext } from "@/context/SoksoContext";
import { Sokso, SoksoDetail } from "@/types/sokso";
import { GeneralError } from "@/lib/messages";
import { BreadCrumbs } from "@/components/ui";

export default function SoksoDetailPage() {
    const topImageLayout = [
    'row-span-2 grid-cols-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1'
    ]
    const router = useRouter();
    const soksoContext = useSoksoContext();

    const [parentSokso, setParentSokso] = useState<Sokso | null>(null)
    const [currentSokso, setCurrentSokso] = useState<Sokso | null>(null)
    const [detailSokso, setDetailSokso] = useState<SoksoDetail | null>(null)

    const params = useParams();
    const { parent } = params;

    useEffect(()=>{
        init();
    },[]);

    const init = () => {
        const contextParentSokso = soksoContext.parentSokso;
        const contextCurrentSokso = soksoContext.currentSokso;

        console.log("contextParentSokso",contextParentSokso);
        console.log("contextCurrentSokso",contextCurrentSokso);

        if(!contextParentSokso.id || !contextCurrentSokso.id){
            window.alert(GeneralError.notValidInfo);

            if(contextParentSokso.id ){
                router.push("/sokso/"+contextParentSokso.id);
            }else{
                router.push("/sokso");
            }
            return;
        }else{
            if(contextParentSokso && contextCurrentSokso && contextCurrentSokso.soksoDetail_Id){
                setParentSokso(contextParentSokso.getSokso());
                setCurrentSokso(contextCurrentSokso.getSokso());
                setDetailSokso(contextCurrentSokso.soksoDetail_Id);
                console.log(contextCurrentSokso.soksoDetail_Id);
            }
        }
    }

    return(
        <div className="relative flex flex-col my-16  md:my-32 md:flex md:justify-between ">

            {/* head breadcrumble */}
            <div className="mx-12 md:mx-44 flex">
                <BreadCrumbs 
                    crumbs={[
                        { title:'숙소',link:'/sokso'},
                        { title : (parentSokso && parentSokso.name)  || '' ,link:`/sokso/${parentSokso?.id}`},
                        { title : (currentSokso && currentSokso.name)  || '' ,link:'/'}
                    ]} />
            </div>

            {/* title */}
            <nav className="flex px-3 justify-center text-center  py-5 align-middle">
                <h1 className="text-3xl font-bold">{currentSokso && currentSokso.name}</h1>
            </nav>
            
            {/* 대표 사진 부분  */} 
            { detailSokso && <div className="hidden grid-cols-2 grid-rows-2 mt-9 max-w-7xl relative self-center md:grid" style={{height:'500px'}}>
                <span className="absolute top-0 left-0 text-red-600 text-xl bg-white">가로 최대 1600px(디자인 세로 크기 기준), 세로는 500px로 고정함<br/>이미지 크기 확인필요</span>
                {  [0,1,2].map(index => {
                    return(
                    <div key={`main-${index}`} className={`${topImageLayout[index]}`} >
                        <img  src={`${detailSokso.topImages[index]}`} className="object-cover w-full h-full" />
                    </div>
                    )
                })}
            </div> }

            { detailSokso &&<div style={{width:'100%',height: 'auto',maxHeight: '90vh'}} className="flex  relative md:hidden">
                <span className="absolute top-0 left-0 text-red-600 text-xl bg-white">
                    모바일은 슬라이드로 변경예정
                    <br />
                    모바일의 경우 가로는 여백을 두고 꽉 차고 화면 세로의 90%를 차지하게 설정
                </span>
                
                    <MobileSlider 
                        images={detailSokso.topImages} autoPlay={false}                    
                    />
                {/* {  [0].map(index => {
                    return(
                    <div key={`main-mobile-${index}`} className={`${topImageLayout[index]}`} >
                        <img  src={`${Book.topImages[index]}`} className="object-cover w-full h-full" />
                    </div>
                    )
                })} */}
            </div> }
                

            {/* 소개글 부분 - 웹 */}
            <div 
                className="hidden  min-h-96 border-0-b-brown justify-between mx-12 mt-20 md:mx-44 md:grid md:grid-cols-3"
                
            >
                {/* 소개글 부분 */}
                <div className="flex flex-col border-0 border-0-red-600 col-span-2 ">
                    <p className="text-xl font-bold">{currentSokso && currentSokso.name}</p>
                    <p className="text-lg mt-1">{currentSokso && currentSokso.introduction}</p>
                    <p className="text-lg mt-4 border-0 border-0-red-600">
                        { detailSokso && <div
                            dangerouslySetInnerHTML={{ __html: detailSokso.content }}
                        /> }
                    </p>
                </div >

                {/* 예약하기 버튼 */}
                <div className="border-0 border-0-blue-600 col-span-1 ">
                    {/* 링크가 있으면 링크 연결 없으면 모달처리 */}

                    {currentSokso && currentSokso.reserveLink  ?
                        <button 
                            type="button" 
                            className=" 
                                mx-auto 
                                rounded-xl 
                                text-white 
                                h-12 
                                w-full 
                                bg-green
                                p-3
                            "
                            onClick={() => OpenWindow(currentSokso.reserveLink!)}
                        >
                                예약하기
                        </button>
                        :
                        <a href={`tel:010-6513-8461`}>

                            <button 
                                type="button" 
                                className=" 
                                    mx-auto 
                                    rounded-xl 
                                    text-white 
                                    h-18 
                                    w-full 
                                    bg-green
                                    p-3
                                ">
                                    현재 전화문의(010-6513-8461)로 
                                    <br />예약가능합니다.
                            </button>

                        </a>
                    }
                    
                </div >
            </div>

            {/* 소개글 부분 - 모바일 */}
            <div 
                className="flex flex-col pb-16 border-0-b-brown justify-between mx-12 mt-16 md:mx-44 md:hidden"
                
            >
                 {/* 예약하기 버튼 */}
                 <div className="border-0 border-0-blue-600 col-span-1 ">
                    {/* 링크가 있으면 링크 연결 없으면 모달처리 */}

                    {currentSokso && currentSokso.reserveLink  ?
                        <button 
                            type="button" 
                            className=" 
                                mx-auto 
                                rounded-xl 
                                text-white 
                                h-12 
                                w-full 
                                bg-green
                                p-3
                            "
                            onClick={() => OpenWindow(currentSokso.reserveLink!)}
                        >
                                예약하기
                        </button>
                        :
                        <a href={`tel:010-6513-8461`}>

                            <button 
                                type="button" 
                                className=" 
                                    mx-auto 
                                    rounded-xl 
                                    text-white 
                                    h-18 
                                    w-full 
                                    bg-green
                                    p-3
                                ">
                                    현재 전화문의(010-6513-8461)로 
                                    <br />예약가능합니다.
                            </button>

                        </a>
                    }
                    
                </div >

                {/* 소개글 부분 */}
                <div className="flex flex-col border-0 border-0-red-600 col-span-2 mt-5">
                    <p className="text-xl font-bold">{currentSokso && currentSokso.name}</p>
                    <p className="text-lg mt-1">{currentSokso && currentSokso.introduction}</p>
                    <p className="text-lg mt-4 border-0 border-0-red-600">
                        여기는 직접입력하는 부분
                    </p>
                </div >

               
            </div>

            {/* 전체 사진 나열 부분 */}
            <div className="mt-16 mx-12 md:mx-44">
                {
                    detailSokso?.contentImages.map( (src : string, index : number) => 
                        <Image key={`content-image-${index}`} src={src} alt={""} layout="intrinsic" width={1000} height={700} className="w-full h-auto mt-5"/>
                    )
                }
                {/* {Book.contentImages.map((src : string, index : number) => 
                    <img key={`full-img-${index}`} src={src} alt={""} className="w-full h-auto mt-5"/>
                )} */}
            </div>
        </div> 
    )
}