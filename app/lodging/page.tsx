import Image from "next/image"

// 숙소전체보기
export default function Loading(){
    return (
        <div className="relative flex flex-col p-32 w-full mx-auto md:flex md:justify-between ">
            {/* head breadcrumble */}
            <ol className="flex items-center whitespace-nowrap">
                <li className="inline-flex items-center">
                    <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="#">
                    숙소
                    </a>
                    {/* <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg> */}
                </li>
            </ol>

            {/* title */}
            <div className="flex w-full text-center justify-center content-center">
                <p className="text-3xl font-bold">숙소</p>
            </div>

            <div className="min-h-[38rem] mt-28">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="group flex flex-col h-full">
                        <Image className="mt-3" src="/soop-stay.jpg" width={345} height={276} alt={"soop-sokso-image"} />
                        <div >
                            <h3 className="mt-3 text-base font-bold ">
                                숲스테이도천
                            </h3>
                            <p className="mt-3 text-sm"></p>
                            <p className="mt-3 text-sm">
                                숲의 고요함과 맑은 공기를 느끼며, 일상에서 벗어나 완전한 휴식을 경험할 수 있습니다.
                            </p>
                        </div>
                        <div className="flex flex-row space-x-3 text-sm font-bold w-full mt-3 cursor-pointer ">
                            <p className="bg-point-hover p-2 rounded-lg">상세보기</p>
                        </div>
                    </div>
                    <div className="group flex flex-col h-full">
                        <Image className="mt-3" src="/book/5.jpeg" width={345} height={276} alt={"soop-sokso-image"} />
                        <div >
                            <h3 className="mt-3 text-base font-bold ">
                                북스테이도천
                            </h3>
                            <p className="mt-3 text-sm"></p>
                            <p className="mt-3 text-sm">
                                자연과 책이 조화를 이루는 이곳에서 마음의 평온을 찾고, 독서의 즐거움을 만끽할 수 있습니다.
                            </p>
                        </div>
                        <div className="flex flex-row space-x-3 text-sm font-bold w-full mt-3 cursor-pointer ">
                            <p className="bg-point-hover p-2 rounded-lg">상세보기</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}