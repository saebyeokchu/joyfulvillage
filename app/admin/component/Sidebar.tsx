import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminMenuList = ({
    name,
    url,
    isDevelopeCompleted
} : {
    name : string,
    url : string
    isDevelopeCompleted : boolean
}) => (
    <li>
        <Link 
            href={url}
            className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:bg-gray-200 ${usePathname().includes(url) && 'bg-gray-200'}`} >
            {name} { isDevelopeCompleted  ? '✔️' : '(수정중)' }
        </Link>
    </li>
)

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <div id="hs-application-sidebar" className="
        w-64 h-100
        bg-white border-0-e border-0-gray-200
        lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
        dark:bg-neutral-800 dark:border-0-neutral-700 pt-10" role="dialog"  aria-label="Sidebar">
        <div className="relative flex flex-col h-full max-h-full">
            <div className="px-6 ">
                <Link href={"/admin"} >
                    <img src="/images/system/logo.png" width={80} height='auto' />
                </Link>
            </div>

            <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                <ul className="flex flex-col space-y-1">
                    {/* <li>
                    <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:text-white" href="#">
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        대시보드
                    </a>
                    </li>

                    <li className="hs-accordion" id="users-accordion">
                    <button type="button" className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200" aria-expanded="true" aria-controls="users-accordion-child">
                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        유저관리

                        <svg className="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 15-6-6-6 6" />
                        </svg>

                        <svg className="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                        </svg>
                    </button> 

                    <div id="users-accordion-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden" role="region" aria-labelledby="users-accordion">
                        <ul className="hs-accordion-group ps-8 pt-1 space-y-1" data-hs-accordion-always-open>
                        <li className="hs-accordion" id="users-accordion-sub-1">
                            <button type="button" className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200" aria-expanded="true" aria-controls="users-accordion-sub-1-child">
                            Sub Menu 1

                            <svg className="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m18 15-6-6-6 6" />
                            </svg>

                            <svg className="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                            </button>

                            <div id="users-accordion-sub-1-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden" role="region" aria-labelledby="users-accordion-sub-1">
                            <ul className="pt-1 space-y-1">
                                <li>
                                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200" href="#">
                                    Link 1
                                </a>
                                </li>
                                <li>
                                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200" href="#">
                                    Link 2
                                </a>
                                </li>
                                <li>
                                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200" href="#">
                                    Link 3
                                </a>
                                </li>
                            </ul>
                            </div>
                        </li>
                        <li className="hs-accordion" id="users-accordion-sub-2">
                            <button type="button" className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-200" aria-expanded="true" aria-controls="users-accordion-sub-2-child">
                            Sub Menu 2

                            <svg className="hs-accordion-active:block ms-auto hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m18 15-6-6-6 6" />
                            </svg>

                            <svg className="hs-accordion-active:hidden ms-auto block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                            </button>

                            <div id="users-accordion-sub-2-child" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden" role="region" aria-labelledby="users-accordion-sub-2">
                            <ul className="pt-1 space-y-1">
                                <li>
                                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200" href="#">
                                    Link 1
                                </a>
                                </li>
                                <li>
                                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200" href="#">
                                    Link 2
                                </a>
                                </li>
                                <li>
                                <a className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200" href="#">
                                    Link 3
                                </a>
                                </li>
                            </ul>
                            </div>
                        </li>
                        </ul>
                    </div>
                    </li>*/}

                    <li>
                        <Link 
                            href="/admin/home" 
                            className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:bg-gray-200 ${pathname.includes("home") && 'bg-gray-200'}`} >
                            홈(맨 앞페이지) 관리 ✔️
                        </Link>
                    </li>

                    <AdminMenuList name={"소개 관리"} url={"/admin/about"} isDevelopeCompleted={false} />

                    <li>
                        <Link 
                            href="/admin/stay" 
                            className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:bg-gray-200 ${pathname.includes("stay") && 'bg-gray-200'}`} >
                            스테이 관리(수정중)
                        </Link>
                    </li>

                    <li>
                        <Link 
                            href="/admin/program" 
                            className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:bg-gray-200 ${pathname.includes("program") && 'bg-gray-200'}`} >
                            프로그램 관리 ✔️
                        </Link>
                    </li>

                    <li><a className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-300 rounded-lg cursor-not-allowed" >
                        실시간 예약 관리
                    </a></li>

                    <li>
                        <Link 
                            href="/admin/cafe" 
                            className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:bg-gray-200 ${pathname.includes("cafe") && 'bg-gray-200'}`} >
                            카페도천✔️
                        </Link>
                        <ul className={`w-full ${pathname.includes("cafe") ? "flex" : "hidden" } flex-col items-start ps-4 gap-y-3.5 text-sm text-gray-800 rounded-lg mt-3 `}>
                            <Link className={`${pathname.includes("introduction") && "underline" } hover:underline`} href={"/admin/cafe/introduction"} >소개글✔️</Link>
                            <Link className={`${pathname.includes("image") && "underline" } hover:underline`} href={"/admin/cafe/image"}>이미지✔️</Link>
                            <Link className={`${pathname.includes("menu") && "underline" } hover:underline`} href={"/admin/cafe/menu"}>메뉴판✔️</Link>
                            <Link className={`${pathname.includes("special") && "underline" } hover:underline`} href={"/admin/cafe/special"}>스페셜 메뉴✔️</Link>
                            <Link className={`${pathname.includes("naverorderlink") && "underline" } hover:underline`} href={"/admin/cafe/naverorderlink"}>네이버 주문 링크✔️</Link>
                        </ul>
                    </li>

                    <li>
                        <Link 
                            href="/admin/inquiry" 
                            className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:bg-gray-200 ${pathname.includes("inquiry") && 'bg-gray-200'}`} >
                            문의하기 ✔️
                        </Link>
                    </li>

                    <hr />
                    
                    <AdminMenuList name={"운영 정보 관리"} url={"/admin/info"} isDevelopeCompleted={false} />

                    <li>
                        <Link 
                            href="/admin/image" 
                            className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:bg-gray-200 ${pathname.includes("image") && 'bg-gray-200'}`} >
                            이미지 관리하기 ✔️
                        </Link>
                    </li>

                    <hr />

                    
                    <AdminMenuList name={"홈으로 돌아가기"} url={"/"} isDevelopeCompleted={true} />
                
                </ul>
                </nav>
            </div>
        </div>
    </div>
    )
}