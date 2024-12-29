import { NaverBookingLink } from "@/app/_data/Const"
import Image from "next/image"
import Link from "next/link"

// 숙소전체보기
export default function Soop(){
    return (
        <div className="relative flex flex-col p-32 w-full mx-auto md:flex md:justify-between ">

            {/* head breadcrumble */}
            <ol className="flex items-center whitespace-nowrap">
                <li className="inline-flex items-center">
                    <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="/lodging">
                    숙소
                    </a>
                    <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                    <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="#">
                    숲스테이도천
                    </a>
                </li>
            </ol>

            {/* title */}
            <div className="flex w-full text-center justify-center content-center">
                <p className="text-3xl font-bold">숲스테이도천</p>
            </div>

            <div className="min-h-[38rem] mt-28">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="group flex flex-col h-full">
                        <Image className="mt-3" src="/soop-stay.jpg" width={345} height={276} alt={"soop-sokso-image"} />
                        <div >
                            <h3 className="mt-3 text-base font-bold ">
                                숲스테이도천1호
                            </h3>
                            <p className="mt-3 text-sm">독채 (원룸형, 침대1, 욕실1)</p>
                            <p className="mt-3 text-sm">
                                '숲스테이도천1호'는 조이풀 빌리지 옆 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.
                            </p>
                        </div>
                        <div className="flex flex-row space-x-3 text-sm font-bold w-full mt-3 ">
                            {/* <p className="bg-point-darker p-2 rounded-lg" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">예약하기</p> */}
                            {/* <button  className="bg-point-hover p-2 rounded-lg" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal"> */}
                            <a  className="bg-point-hover p-2 rounded-lg" href={NaverBookingLink} target="_blank">
                                예약하기
                            </a>
                            <Link href={{
                                    pathname: '/lodging/soop/detail',
                                    query: { roomId: '1' },
                                  }}
                            >
                                <p className="bg-point-hover p-2 rounded-lg cursor-pointer " >상세보기</p>
                            </Link>
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
                </div>
            </div>
        </div>
    )
}