export default function Login() {
    return (
        <div className="relative flex flex-col h-screen max-w-[85rem] w-full mx-auto content-center justify-items-center self-center items-center place-self-center justify-self-center md:flex md:justify-between">
            <div className="mt-20 bg-white border border-gray-200 rounded-xl shadow-sm w-[30rem]">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">로그인</h1>
                    {/* <p className="mt-2 text-sm text-gray-600 ">
                        아직 계정이 없으신가요?
                        <a className="text-amber-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium " href="../examples/html/signup.html">
                        등록하기
                        </a>
                    </p> */}
                    </div>

                    <div className="mt-5">
                        <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm text-white font-medium rounded-lg border border-gray-200 bg-yellow-400 shadow-sm hover:bg-yellow-600 hover:text-white focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none ">
                            카카오 로그인
                        </button>

                        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Or</div>

                        <a href="/login/admin"><button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                            관리자 로그인
                        </button></a>
                    </div>

                </div>
            </div>
        </div>
    )
}