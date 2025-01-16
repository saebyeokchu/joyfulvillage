import { EditButton } from "@/app/_component/Button"

export default function AddNewSokso({
    close
} : {
    close : any
}) {
    return(
        <> 
            <div className="w-full size-full fixed top-0 start-0 z-[80]  opacity-60 bg-black "></div>
            <div className="hs-overlay size-full fixed top-0 start-0 z-[80]  overflow-x-hidden transition-all overflow-y-auto " role="dialog" aria-labelledby="hs-basic-modal-label" >
                <div className="z-[90] sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="flex flex-col  shadow-sm rounded-xl pointer-events-auto bg-white">
                        <div className="flex justify-between items-center py-3 px-4 ">
                            <h3 className="font-bold ">
                                숙소 내용 수정하기
                            </h3>
                            <span className="sr-only">Close</span>
                            <svg onClick={close} className="shrink-0 size-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <div className="max-w-4xl p-2">
                                <div className="bg-whites p-4 sm:p-7 dark:bg-neutral-800">
                                    <form>
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

                                        <div className="mt-5 flex justify-end gap-x-2">
                                            <EditButton onClickFunction={undefined} btnName={"추가하기"} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    )
}