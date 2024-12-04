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
                    <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="/program">
                    프로그램
                    </a>
                    <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </li>
                <li className="inline-flex items-center">
                    <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="#">
                    숲 N멍
                    </a>
                </li>
            </ol>
            
            <nav className="flex px-3 justify-between  py-5 align-middle">
                <h1 className="text-3xl font-bold">숲 N멍</h1>
                <span className="pt-3 cursor-pointer hover:underline">공유하기</span>
            </nav>
            
            {/* 대표 사진 부분  */}
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <div className="row-span-2 grid-cols-1 rounded-2xl">
                    <img  src="/soop-n/bulmeong.png" className="object-cover h-full rounded-2xl  w-full"/>
                </div>
                <div className="col-span-1 row-span-1   rounded-2xl">
                    <img  src="/soop/2.jpg" className="object-cover h-full rounded-2xl max-h-64 w-full"/>
                </div>
                <div className="col-span-1 row-span-1   rounded-2xl">
                    <img  src="/book/3.jpeg" className="object-cover h-full rounded-2xl max-h-64 w-full"/>
                </div>
            </div>

            
            {/* 특징소개 부분 */}
            <div className="flex flex-col border-t  border-t-slate-300 rounded-lg bg-slate-200 ">
                <div className="space-y-3 p-5">
                    <dl className="flex flex-col sm:flex-row gap-1">
                        <ul className="space-y-4">
                            <li >
                            •자연 속에서 깊은 휴식숲의 고요함과 맑은 공기
                            </li>
                            <li>
                            • 색 다른 프로그램
                            </li>
                            <li >
                            •자연 속에서 깊은 휴식
                            </li>
                        </ul>
                    </dl>
                </div>
            </div>


            {/* 프로그램 소개부분 */}
            <div className="flex flex-col p-5 border-t  border-t-slate-300">
                <div className="flex flex-row">
                    <h1 className="text-xl font-bold">연관 프로그램</h1>
                </div>
                    
                <div className="flex flex-col w-full overflow-hidden space-y-4 " ref={scrollRef}>
                    <div className="flex flex-row p-5 shadow-md rounded-md mt-3 border border-slate-200"> 
                        <img src="/soop-n/bulmeong.png" className="max-w-[25rem] object-cover rounded-lg"/>
                        <div className="p-5">
                            <p><strong>불멍</strong></p>
                            <p><small>틀별한 바베큐 파티</small></p>

                            <button type="button" className="mt-3 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none">
                                문의하기
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row p-5 shadow-md rounded-md mt-3 border border-slate-200"> 
                        <img src="/soop-n/mulmeong.png" className="max-w-[25rem] object-cover rounded-lg"/>
                        <div className="p-5">
                            <p><strong>물멍</strong></p>
                            <p><small>도천의 저수지 한마퀴</small></p>

                            <button type="button" className="mt-3 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none">
                                문의하기
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row p-5 shadow-md rounded-md mt-3 border border-slate-200"> 
                        <img src="/soop-n/soopmeong.png" className="max-w-[25rem] object-cover rounded-lg"/>
                        <div className="p-5">
                            <p><strong>숲멍</strong></p>
                            <p><small>일생의 단한번, 오롯이 숲과 함께</small></p>

                            <button type="button" className="mt-3 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none">
                                문의하기
                            </button>
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