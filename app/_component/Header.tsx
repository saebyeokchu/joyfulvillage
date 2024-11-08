"use client"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { header_mega_menus, header_menus } from "../_data/Menu";
import { MegaMenu, Menu, Title } from "../_type/Menu";
import Link from "next/link";

export default function Header(){
    const [ showSubMenu, setShowSubMenu ] = useState(false);
    const router = useRouter();

    const openSubMenu = () => {
        setShowSubMenu(true);
    }

    const closeSubMenu = () => {
        setShowSubMenu(false);
    }
    
    return(
        <header  className="flex flex-col h-16 md:justify-start md:flex-nowrap z-50 w-full bg-white  dark:bg-neutral-800 dark:border-neutral-700"
            onMouseEnter={() => openSubMenu()}
            onMouseLeave={() => closeSubMenu()}
        >
            <nav className=" relative max-w-[85rem] z-50 w-full mx-auto md:flex md:items-center md:justify-between     md:gap-3 py-2 lg:px-8" >
                <div className="flex justify-between items-center gap-x-1 px-5">
                    <Link className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white " aria-label="Brand" href={"/"}>
                        <img src="/logo.png" width={80} height='auto' />
                    </Link>

                    <button type="button" className="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-[12px] rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" id="hs-header-base-collapse"  aria-expanded="false" aria-controls="hs-header-base" aria-label="Toggle navigation"  data-hs-collapse="#hs-header-base" >
                        <svg className="hs-collapse-open:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                        <svg className="hs-collapse-open:block shrink-0 hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        <span className="sr-only">Toggle navigation</span>
                    </button>
                </div>

                <div id="hs-header-base" className="hidden hs-collapse w-full overflow-hidden transition-all duration-300 basis-full grow bg-white md:block "  aria-labelledby="hs-header-base-collapse" >
                    <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                        <div className="py-2 md:py-0  flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
                            <div className="grow">
                                <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
                                    { header_menus.map((menu : Menu, index:number)=>
                                        <a key={`header-menu-${index}`} className="cursor-default p-2 flex items-center text-sm text-gray-800  dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#" onClick={openSubMenu}>
                                            {menu.iconSvg}
                                            {menu.title}
                                        </a>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`hidden md:flex ${ showSubMenu? "opacity-100" : "opacity-0" } ${showSubMenu ? "translate-y-0 " : "-translate-y-full"} absolute z-50 left-0 top-16 content-start transition-all ease-in-out duration-500  bg-white w-full text-center md:items-center md:justify-between`} >
                {header_mega_menus.map((menu : MegaMenu, index:number) => 
                    <div key={`header-mega-menu-${index}`} className="flex-1 min-h-32  cursor-pointer p-3 space-y-3" >
                        <p className="font-bold" onClick={()=>router.push(menu.mainTitleRoute)}>{menu.mainTitle}</p>
                        { menu.subTitle && menu.subTitle.map((title:Title)=>
                            <p key={`mega-menu-submenu-${index}`} onClick={()=>router.push(menu.mainTitleRoute)}>{title.name}</p>
                        )}
                    </div>  
                )}
            </div>
        </header>
    )
}