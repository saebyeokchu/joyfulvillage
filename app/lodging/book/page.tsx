"use client"
import { NaverBookingLink } from "@/app/_data/Const";
import { Book, Soops } from "@/app/_data/Room";
import { useParams, useSearchParams  } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image'

export default function LoadgingSoopDetail() {
  const topImageLayout = [
    'row-span-2 grid-cols-1',
    'col-span-1 row-span-1',
    'col-span-1 row-span-1'
  ]

    return(
        <div className="relative flex flex-col py-32 w-full md:flex md:justify-between ">
                {/* head breadcrumble */}
                <ol className="flex items-center whitespace-nowrap px-16">
                    <li className="inline-flex items-center">
                        <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="/lodging">
                        숙소
                        </a>
                        <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>
                        <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="/lodging/book">
                        북스테이도천
                        </a>
                        
                    </li>
                </ol>
                
                {/* title */}
                <nav className="flex px-3 justify-center text-center  py-5 align-middle">
                    <h1 className="text-3xl font-bold">{Book.title}</h1>
                </nav>
                
                {/* 대표 사진 부분  */}
                <div className="grid grid-cols-2 grid-rows-2 mt-9" style={{height:'500px'}}>
                    {  [0,1,2].map(index => {
                        return(
                        <div key={`main-${index}`} className={`${topImageLayout[index]}`} >
                            <img  src={`${Book.topImages[index]}`} className="object-cover w-full h-full" />
                        </div>
                        )
                    })}
                </div>
                    

                {/* 소개글 부분 */}
                <div className="grid grid-flow-row-dense grid-cols-3 px-16 mt-20">

                    <div className="flex flex-col col-span-2 p-5">
                        <div >
                            <h1 className="text-xl font-bold">{Book.title}</h1>
                            <p className="mt-2">
                                투룸형 숙소와 모임을 위한 추가 공간 포함
                            </p>
                            <p className="mt-2">
                            '북스테이 도천'은스테이 도천'은 책과 함께 머물며 휴식을 즐길 수 있는 공간입니다.
                                <br />
                                자연과 책이 조화를 이루는 이곳에서 마음의 평온을 찾고, 독서의 즐거움을 만끽할 수 있습니다.
                            </p>
                        </div>
                        <div className="flex flex-row mt-14 space-x-16">
                            <div className="  ">
                                <p>[숙소 공간]</p>
                                <br />
                                <ul>
                                    <li>- 조이풀라운지(서점 및 세미나실)</li>
                                    <li>- FAITH, HOPE(Room)</li>
                                    <li>- LOVE, JOY(Room)</li>
                                    <li>- 식당 및 공동주방</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    {/* 예약 링크 연결 */}
                    <div className="flex flex-col rounded-2xl w-72 h-fit"> 
                        {/* <span className="text-xl py-5 px-6 font-bold">130,000 ~ 150,000원</span>  style={{border:"0.719px solid #746E60"}}
                        <div
                            className="w-64 mx-auto" 
                            style={{
                                height: "0.719px",
                                backgroundColor: "#746E60"
                            }}
                        /> */}

                        <button type="button" className="mx-auto rounded-xl text-white h-12 w-64 my-5" style={{backgroundColor:'#6E8653'}} aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">
                            예약
                        </button>
                        <div id="hs-basic-modal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none" role="dialog" aria-labelledby="hs-basic-modal-label">
                            <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                                <div className="flex flex-col  shadow-sm rounded-xl pointer-events-auto bg-white">
                                <div className="flex justify-between items-center py-3 px-4 ">
                                    <h3 id="hs-basic-modal-label" className="font-bold ">
                                    예약하기 안내
                                    </h3>
                                    <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent hover:bg-point-darker focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none " aria-label="Close" data-hs-overlay="#hs-basic-modal">
                                    <span className="sr-only">Close</span>
                                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                    </svg>
                                    </button>
                                </div>
                                <div className="p-4 overflow-y-auto">
                                    <p className="mt-1">
                                        현재 전화문의(010-6513-8461)로 예약가능합니다. 
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" mt-32 mx-16"  style={{
                    height: "0.719px",
                    backgroundColor: "#746E60"
                }}></div>

                {/* 전체 사진 나열 부분 */}
                <div className="mt-16 mx-16">
                    {Book.contentImages.map((src : string, index : number) => <img key={`full-img-${index}`} src={src} alt={""} className="w-full h-auto mt-5"/>)}
                </div>
            </div> 
    )
}