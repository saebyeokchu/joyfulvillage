import { Logo } from "@/lib/svgs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminMenuList = ({
    name,
    url,
    isDevelopeCompleted,
    isBlocked = false,
    onClickLink
} : {
    name : string,
    url : string
    isDevelopeCompleted : boolean,
    isBlocked? : boolean,
    onClickLink? : any
}) => (
    <li>
        <Link 
            href={url}
            onClick={onClickLink}
            className={`
                w-full 
                flex 
                items-center 
                gap-x-3.5 
                py-2 
                px-2.5 
                text-sm 
                ${ isBlocked ? 'text-gray-300' : 'text-gray-800' } 
                rounded-lg 
                hover:bg-gray-200 
                focus:bg-gray-200 
                ${ usePathname().includes(url) && url != '/' && 'bg-gray-200'}`} >
            {name} 
            {/* { isDevelopeCompleted  ? '✔️' : '(수정중)' } */}
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
                    <Logo width={80} />
                </Link>
            </div>

            <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                <ul className="flex flex-col space-y-1">
                    <AdminMenuList name={"홈(맨 앞페이지) 관리"} url={"/admin/home"} isDevelopeCompleted={true} />
                    <AdminMenuList name={"소개 관리"} url={"/admin/about"} isDevelopeCompleted={true} />
                    <AdminMenuList name={"스테이 관리"} url={"/admin/stay"} isDevelopeCompleted={true} />
                    <AdminMenuList name={"프로그램 관리"} url={"/admin/program"} isDevelopeCompleted={true} />
                    <AdminMenuList name={"실시간 예약 관리"} url={"/admin/booking"} isDevelopeCompleted={true} isBlocked={true} />
                    <li>
                        <Link 
                            href="/admin/cafe" 
                            className={`w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-200 focus:bg-gray-200 ${pathname.includes("cafe") && 'bg-gray-200'}`} >
                            카페도천
                        </Link>
                        <ul className={`w-full ${pathname.includes("cafe") ? "flex" : "hidden" } flex-col items-start ps-4 gap-y-3.5 text-sm text-gray-800 rounded-lg mt-3 `}>
                            {/* <Link className={`${pathname.includes("introduction") && "underline" } hover:underline`} href={"/admin/cafe/introduction"} >소개글</Link> */}
                            <Link className={`${pathname.includes("image") && "underline" } hover:underline`} href={"/admin/cafe/image"}>대표 이미지</Link>
                            {/* <Link className={`${pathname.includes("menu") && "underline" } hover:underline`} href={"/admin/cafe/menu"}>메뉴판</Link> */}
                            <Link className={`${pathname.includes("special") && "underline" } hover:underline`} href={"/admin/cafe/special"}>스페셜 메뉴</Link>
                            <Link className={`${pathname.includes("/coffee") && "underline" } hover:underline`} href={"/admin/cafe/coffee"}>커피 메뉴</Link>
                            <Link className={`${pathname.includes("non-coffee") && "underline" } hover:underline`} href={"/admin/cafe/non-coffee"}>논커피 메뉴</Link>
                            <Link className={`${pathname.includes("dessert") && "underline" } hover:underline`} href={"/admin/cafe/dessert"}>디저트 & 브런치 메뉴</Link>
                            <Link className={`${pathname.includes("tea") && "underline" } hover:underline`} href={"/admin/cafe/tea"}>티 메뉴</Link>
                        </ul>
                    </li>

                    <AdminMenuList name={"문의하기"} url={"/admin/inquiry"} isDevelopeCompleted={true} />

                    <hr />

                    <AdminMenuList name={"운영 정보 관리"} url={"/admin/info"} isDevelopeCompleted={false} />
                    <AdminMenuList name={"이미지 관리하기"} url={"/admin/image"} isDevelopeCompleted={true} />

                    <hr />

                    <AdminMenuList name={"홈으로 돌아가기"} url={"/"} isDevelopeCompleted={true} />
                    <AdminMenuList name={"로그아웃"} url={"/"} onClickLink={()=>localStorage.removeItem("joyfuladminaccpedted")} isDevelopeCompleted={true} />
                
                </ul>
                </nav>
            </div>
        </div>
    </div>
    )
}