export default function Loading(){
    return (
        <div className="relative flex flex-col max-w-[80rem]  w-full mx-auto md:flex md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
            <ol className="flex items-center whitespace-nowrap">
                <li className="inline-flex items-center">
                    <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="#">
                    프로그램
                    </a>
                </li>
            </ol>
            <div className="min-h-[38rem]">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="group flex flex-col h-full bg-white border-0 border-0-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-0-neutral-700 dark:shadow-neutral-700/70">
                        <img src="/forest.jpg"  className="rounded-xl"/>
                        <div className="p-4 md:p-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                                숲 N멍
                            </h3>
                            <small className="text-gray-300">숲 스테이 도천</small>
                            <p className="mt-3 text-gray-500 dark:text-neutral-500 text-sm">
                                자연 속에서의 진정한 휴식을 즐길 수 있는 네 가지 특별한 경험.
                            </p>
                        </div>
                        <div className="mt-auto flex border-0-t border-0-gray-200 divide-x divide-gray-200 dark:border-0-neutral-700 dark:divide-neutral-700">
                            <a className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-0-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="booking">
                            문의하기
                            </a>
                            <a className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-0-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="program/detail">
                            상세보기
                            </a>
                        </div>
                    </div>
                    <div className="group flex flex-col h-full bg-white border-0 border-0-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-0-neutral-700 dark:shadow-neutral-700/70">
                        <img src="/soop/3.jpg" className="rounded-xl"/>
                        <div className="p-4 md:p-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                                온전한 쉼
                            </h3>
                            <small className="text-gray-300">숲 스테이 도천</small>
                            <p className="mt-3 text-gray-500 dark:text-neutral-500 text-sm">
                                온전한 쉼은 바쁜 일상에서 벗어나 완벽한 휴식을 제공하는 프로그램 입니다.
                                <br />
                                자연 속에서 몸과 마음을 재충전하고, 소중한 순간들을 기록할 수 있는 다양한 활동을 제공합니다.
                            </p>
                        </div>
                        <div className="mt-auto flex border-0-t border-0-gray-200 divide-x divide-gray-200 dark:border-0-neutral-700 dark:divide-neutral-700">
                            <a className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-0-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
                            문의하기
                            </a>
                            <a className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-0-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="program/detail">
                            상세보기
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}