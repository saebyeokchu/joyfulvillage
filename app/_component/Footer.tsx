export default function Footer(){
    return(
        <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="col-span-full hidden lg:col-span-1 lg:block">
                    <a className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white" href="#" aria-label="Brand">
                    투웰브 마운틴즈
                    </a>
                    <div className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-neutral-400">
                       <p>경상북도 포항시 북구 대신로 33</p>
                       <p>경상북도 영덕군 남정면 산정로 320</p>
                       <p>010 6513 8461</p>
                       <p>사업자 번호 898-87-02686</p>
                    </div>
                    <div>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <h4 className="text-xs font-semibold text-gray-900 uppercase dark:text-neutral-100">운영시간</h4>
                    <div className="mt-3 grid space-y-3 text-sm">
                        <p>월요일 - 토요일</p>
                        <p>10:00 - 18:00</p>
                        <p>일요일</p>
                        <p>운영하지 않음</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}