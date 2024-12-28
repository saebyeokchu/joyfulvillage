"use client"
import { useRef } from "react";

export default function LoadgingSoop() {
    const scrollRef = useRef<any>();

    const scrollLeft = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
      };
    
      const scrollRight = () => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
      };

    return(
        <div className="relative flex flex-col max-w-[80rem]  w-full mx-auto md:flex md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center whitespace-nowrap">
                <li className="inline-flex items-center">
                    <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="#">
                    숙소
                    </a>
                    <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </li>
                <li className="inline-flex items-center">
                    <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="#">
                    북 스테이 도천
                    </a>
                </li>
            </ol>
            
            
            <nav className="flex px-3 justify-between  py-5 align-middle">
                <h1 className="text-3xl font-bold">북 스테이 도천</h1>
                <span className="pt-3 cursor-pointer hover:underline">공유하기</span>
            </nav>
            
            {/* 대표 사진 부분  */}
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <div className="row-span-2 grid-cols-1 rounded-2xl">
                    <img  src="/book/1.jpeg" className="object-cover h-full rounded-2xl"/>
                </div>
                <div className="col-span-1 row-span-1   rounded-2xl">
                    <img  src="/book/2.jpeg" className="object-cover h-full rounded-2xl"/>
                </div>
                <div className="col-span-1 row-span-1   rounded-2xl">
                    <img  src="/book/3.jpeg" className="object-cover h-full rounded-2xl"/>
                </div>
            </div>

            {/* 소개글 부분 */}
            <div className="grid grid-flow-row-dense grid-cols-3">
                <div className="col-span-2 p-5">
                    <h1 className="text-2xl font-bold">숲 스테이 도천</h1>
                    <span className="mt-6 cursor-pointer text-slate-500">숲 스테이만의 체험 신청 가능</span>
                </div>
                <div className="flex flex-col rounded-2xl shadow-lg border border-slate-300 text-center p-5"> 
                    <span className="text-xl font-bold">예약하러 가기</span>
                    <button type="button" className="flex justify-center mt-3 py-3 px-4 items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none">
                        예약
                    </button>
                </div>
            </div>

            {/* 특징소개 부분 */}
            <div className="flex flex-col border-t  border-t-slate-300 ">
                <div className="space-y-3 p-5">
                    <dl className="flex flex-col sm:flex-row gap-1">
                        <ul className="space-y-4">
                            <li className="flex flex-row  gap-x-4">
                                <div className="col-span-1">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeWidth="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
                                    </svg>
                                </div>
                                <span>숲의 고요함과 맑은 공기</span>
                            </li>
                            <li className="flex flex-row gap-x-4">
                                <div className="col-span-1">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeWidth="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
                                    </svg>
                                </div>
                                <span>색 다른 프로그램</span>
                            </li>
                            <li className="flex flex-row  gap-x-4">
                                <div className="col-span-1">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeWidth="2" d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"/>
                                    </svg>
                                </div>
                                <span>자연 속에서 깊은 휴식</span>
                            </li>
                        </ul>
                    </dl>
                </div>
            </div>

            {/* 텍스트 입력 부분 */}
            <div className="flex flex-col p-5 border-t  border-t-slate-300">
                <strong className="text-red-500">이 부분은 직접 입력하여 수정할 수 있습니다</strong>
                <p className="mt-3">&apos;숲 스테이 도천&apos;은 조이풀 빌리지 옆 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다. <br />숲의 고요함과 맑은 공기를 느끼며, 일상에서 벗어나 완전한 휴식을 경험할 수 있습니다.</p>
                <p className="font-bold text-xl mt-3">* 숲 스테이 도천만의 투숙 경험</p>
                <p>숲 스테이 도천에 투숙하시면 색 다른 프로그램을 즐기실 수 있습니다<br/>(불멍, 숲멍, 물멍)</p>
            </div>

            {/* 프로그램 소개부분 */}
            <div className="flex flex-col p-5 border-t  border-t-slate-300">
                <div className="flex flex-row">
                    <h1 className="text-xl font-bold">연관 프로그램</h1>
                </div>
                    
                <div className="relative" >
                    <button
                            className="absolute left-0 top-1/2 bg-gray-300 rounded-full w-14"
                            onClick={scrollLeft}
                            aria-label="Scroll Left"
                    >
                        ◀
                    </button>
                    <button
                            className="absolute right-0 top-1/2 bg-gray-300 rounded-full w-14"
                            onClick={scrollRight}
                            aria-label="Scroll Right"
                        >
                            ▶
                        </button>

                    <div className="flex flex-row w-full overflow-hidden space-x-4 " ref={scrollRef}>
                        <div className="flex flex-col p-5 shadow-md rounded-md mt-3 border border-slate-200"> 
                            <img src="/soop-n/bulmeong.png" className="max-w-[25rem] object-cover"/>
                            <div className="p-5"><p><strong>불멍</strong></p>
                            <p><small>틀별한 바베큐 파티</small></p></div>
                        </div>
                        <div className="flex flex-col p-5 shadow-md rounded-md mt-3 border border-slate-200"> 
                            <img src="/soop-n/mulmeong.png" className="max-w-[25rem] object-cover"/>
                            <div className="p-5"><p><strong>물멍</strong></p>
                            <p><small>도천의 저수지 한마퀴</small></p></div>
                        </div>
                        <div className="flex flex-col p-5 shadow-md rounded-md mt-3 border border-slate-200"> 
                            <img src="/soop-n/soopmeong.png" className="max-w-[25rem] object-cover"/>
                            <div className="p-5"><p><strong>숲멍</strong></p>
                            <p><small>일생의 단한번, 오롯이 숲과 함께</small></p></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 리뷰 부분 */}
            <div className="flex flex-col p-5 border-t  border-t-slate-300">
                {/* 작성 부분  */}
                <div className="max-w-4xl mx-auto px-4 w-full  sm:px-6 lg:px-8">
                    <div className="relative">
                        <textarea className="p-4 pb-12 block w-full border border-slate-300 rounded-md  text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Ask me anything..."></textarea>

                        <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-white dark:bg-neutral-900">
                        <div className="flex justify-between items-center">
                            <button type="button" className="outline-none inline-flex shrink-0 justify-center items-center text-sm w-14 h-8 rounded-lg text-white bg-yellow-600 hover:bg-yellow-500 focus:z-10 focus:outline-none focus:bg-yellow-500">
                                등록
                            </button>
                        </div>
                        </div>
                    </div>
                </div> 

                {/* 댓글 부분 */}
                <div className="max-w-4xl mx-auto px-4  sm:px-6 lg:px-8">
                    <div>
                        <div className="flex justify-between pt-5 mt-5 border-t border-t-slate-300">
                            <p className="text-lg font-bold">Robert Karmazov</p>
                            <p className="text-sm text-slate-300"> 11월 9일 </p>
                        </div>
                        <div className="text-sm mt-3">
                            Colorless green ideas sleep furiously was composed by Noam Chomsky in his 1957 book Syntactic Structures as an example of a sentence that is grammatically well-formed, but semantically nonsensical.
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between pt-5 mt-5 border-t border-t-slate-300">
                            <p className="text-lg font-bold">Robert Karmazov</p>
                            <p className="text-sm text-slate-300"> 11월 9일 </p>
                        </div>
                        <div className="text-sm mt-3">
                            Colorless green ideas sleep furiously was composed by Noam Chomsky in his 1957 book Syntactic Structures as an example of a sentence that is grammatically well-formed, but semantically nonsensical.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}