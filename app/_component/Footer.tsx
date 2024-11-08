export default function Footer(){
    return(
        <>
        <footer className="mt-auto bg-gray-900 w-full dark:bg-neutral-950">
        <div className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="col-span-full lg:col-span-1">
                <a className="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80" href="#" aria-label="투웰브 마운틴즈">
                    <img src="/twelve-logo.png" width="100vh"/>
                </a>
            </div>

            <div className="col-span-1">
                <h4 className="font-semibold text-gray-100">투웰브 마운틴즈</h4>

                <div className="mt-3 grid space-y-3">
                    <div className="flex flex-col text-gray-400 ">
                        <div>경상북도 포항시 북구 대신로 33</div> 
                        <div>경상북도 영덕군 남정면 산정로 320</div>
                    </div>
                    <p><span className="inline-flex gap-x-2 text-gray-400 " >010-6513-8461</span></p>
                    <p><span className="inline-flex gap-x-2 text-gray-400 " >사업자 번호 898-87-02686</span></p>
                </div>
            </div>

            <div className="col-span-1">
                <h4 className="font-semibold text-gray-100">운영시간</h4>

                <div className="mt-3 grid space-y-3">
                <p className="inline-flex gap-x-2 text-gray-200 font-bold">월요일 - 토요일</p>
                <p className="inline-flex gap-x-2 text-gray-400 ">10:00 - 18:00</p>
                <p className="inline-flex gap-x-2 text-gray-200 font-bold">일요일 </p>
                <p className="inline-flex gap-x-2 text-gray-400" >운영하지 않음</p>
                </div>
            </div>

            <div className="col-span-2">
                <h4 className="font-semibold text-gray-100">할인소식 받기</h4>

                <form>
                <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 bg-white rounded-lg p-2 dark:bg-neutral-900">
                    <div className="w-full">
                    <label className="sr-only">Subscribe</label>
                    <input type="text" id="hero-input" name="hero-input" className="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="이메일을 입력해 주세요" />
                    </div>
                    <a className="w-full sm:w-auto whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
                    등록
                    </a>
                </div>
                <p className="mt-3 text-sm text-gray-400">
                    이메일을 등록하시면 할인 소식을 전해드립니다.
                </p>
                </form>
            </div>
            </div>

            <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-400 dark:text-neutral-400">
                © 2024 Powered by Sharelife
                </p>
            </div>

            <div>
                <a className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none" href="#">
                <svg className="shrink-0 size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
                </svg>
                </a>

            </div>
            </div>
        </div>
        </footer>
        </>
    )
}