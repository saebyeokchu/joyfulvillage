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

    const DropDownMenu = (menu : MegaMenu, index : number) => <div key={`header-sub-menu-${index}`} className="hs-dropdown [--strategy:static] md:[--strategy:fixed] [--adaptive:none] [--is-collapse:true] md:[--is-collapse:false] ">
      <button id="hs-header-base-mega-menu-small" type="button" className="hs-dropdown-toggle w-full p-2 flex items-center text-sm bg-point-hover rounded-lg focus:outline-none focus:bg-point-darker dark:text-neutral-200 " aria-haspopup="menu" aria-expanded="false" aria-label="Mega Menu">
        {menu.iconSvg}
        {menu.mainTitle}
        <svg className="hs-dropdown-open:-rotate-180 md:hs-dropdown-open:rotate-0 duration-300 shrink-0 size-4 ms-auto md:ms-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>

      <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative md:w-80 hidden z-10 top-full bg-point md:rounded-lg md:shadow-md before:absolute before:-top-4 before:start-0 before:w-full before:h-5 " role="menu" aria-orientation="vertical" aria-labelledby="hs-header-base-mega-menu-small">
        <div className="py-1 md:px-1 space-y-0.5">
          {menu.subTitle?.map((sub : Title, index : number) => {
            return (
              <div key={`sub-menu-${index}`}>
                <a className="p-3 flex gap-x-4 bg-point-hover focus:outline-none focus:bg-gray-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href={sub.route}>
                  {/* <svg className="shrink-0 size-4 mt-1 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg> */}
                  <div className="grow">
                    <span className="block font-semibold text-sm  dark:text-neutral-200">{sub.name}</span>
                    {/* <p className="text-sm text-gray-500 dark:text-neutral-500">How you get the most accurate and up-to-date data</p> */}
                  </div>
                </a>

                {/* { index != ( menu.subTitle!.length - 1)  && <div className="my-2 border-t border-gray-100 dark:border-neutral-800"></div> } */}
              </div>
            )
          })}
{/* 
          <a className="p-3 flex gap-x-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
            <svg className="shrink-0 size-4 mt-1 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <div className="grow">
              <span className="block font-semibold text-sm text-gray-800 dark:text-neutral-200">Team <span className="inline ms-1 font-medium text-xs bg-blue-600 text-white py-1 px-2 rounded-full">We're hiring</span></span>
              <p className="text-sm text-gray-500 dark:text-neutral-500">Meet the people building products to help your business grow</p>
            </div>
          </a>

          <div className="my-2 border-t border-gray-100 dark:border-neutral-800"></div>

          <a className="p-3 flex gap-x-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
            <svg className="shrink-0 size-4 mt-1 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
            <div className="grow">
              <span className="block font-semibold text-sm text-gray-800 dark:text-neutral-200">Blog</span>
              <p className="text-sm text-gray-500 dark:text-neutral-500">The latest news, feature releases, and how to grow with data</p>
            </div>
          </a> */}
        </div>
      </div>
    </div>
    
    return(
      <header className="flex flex-wrap bg-point md:justify-start md:flex-nowrap z-50 w-full border-point-bottom">
        <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-x-1">
            <a className="flex-none font-semibold text-xl focus:outline-none focus:opacity-80 " href="/" aria-label="Brand">
              <img src="/logo.png" className="pt-3" width={80} height='auto' />
            </a>

            <button type="button" className="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-[12px] rounded-lg border border-gray-200 bg-point-hover focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none " id="hs-header-base-collapse"  aria-expanded="false" aria-controls="hs-header-base" aria-label="Toggle navigation"  data-hs-collapse="#hs-header-base" >
              <svg className="hs-collapse-open:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
              <svg className="hs-collapse-open:block shrink-0 hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>

          <div id="hs-header-base" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block "  aria-labelledby="hs-header-base-collapse" >
            <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-point-darker [&::-webkit-scrollbar-thumb]:bg-point-darker ">
              <div className="py-2 md:py-0  flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
                <div className="grow">
                  <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">

                      { header_mega_menus.map((menu : MegaMenu, index : number) => {

                        if(menu.subTitle){
                          return DropDownMenu(menu, index);
                        }else{
                          return (
                            <a 
                              key={`header-menu-${index}`}
                              className="p-2 flex items-center text-sm bg-point bg-point-hover rounded-lg focus:outline-none focus:bg-point-darker " 
                              href={menu.mainTitleRoute} aria-current="page">
                              {menu.iconSvg}
                              {menu.mainTitle}
                            </a>
                          )
                        }
                      })}

                    {/*<div className="hs-dropdown [--strategy:static] md:[--strategy:fixed] [--adaptive:none] [--is-collapse:true] md:[--is-collapse:false] ">
                      <button id="hs-header-base-mega-menu-small" type="button" className="hs-dropdown-toggle w-full p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" aria-haspopup="menu" aria-expanded="false" aria-label="Mega Menu">
                        <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                        Resources
                        <svg className="hs-dropdown-open:-rotate-180 md:hs-dropdown-open:rotate-0 duration-300 shrink-0 size-4 ms-auto md:ms-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                      </button>

                      <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 relative md:w-80 hidden z-10 top-full md:bg-white md:rounded-lg md:shadow-md before:absolute before:-top-4 before:start-0 before:w-full before:h-5 dark:md:bg-neutral-800" role="menu" aria-orientation="vertical" aria-labelledby="hs-header-base-mega-menu-small">
                        <div className="py-1 md:px-1 space-y-0.5">
                          <a className="p-3 flex gap-x-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                            <svg className="shrink-0 size-4 mt-1 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>
                            <div className="grow">
                              <span className="block font-semibold text-sm text-gray-800 dark:text-neutral-200">Data</span>
                              <p className="text-sm text-gray-500 dark:text-neutral-500">How you get the most accurate and up-to-date data</p>
                            </div>
                          </a>

                          <div className="my-2 border-t border-gray-100 dark:border-neutral-800"></div>

                          <a className="p-3 flex gap-x-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                            <svg className="shrink-0 size-4 mt-1 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            <div className="grow">
                              <span className="block font-semibold text-sm text-gray-800 dark:text-neutral-200">Team <span className="inline ms-1 font-medium text-xs bg-blue-600 text-white py-1 px-2 rounded-full">We're hiring</span></span>
                              <p className="text-sm text-gray-500 dark:text-neutral-500">Meet the people building products to help your business grow</p>
                            </div>
                          </a>

                          <div className="my-2 border-t border-gray-100 dark:border-neutral-800"></div>

                          <a className="p-3 flex gap-x-4 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                            <svg className="shrink-0 size-4 mt-1 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
                            <div className="grow">
                              <span className="block font-semibold text-sm text-gray-800 dark:text-neutral-200">Blog</span>
                              <p className="text-sm text-gray-500 dark:text-neutral-500">The latest news, feature releases, and how to grow with data</p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>

                    <a className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                      <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      Account
                    </a>

                    <a className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                      <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12h.01"/><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M22 13a18.15 18.15 0 0 1-20 0"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>
                      Work
                    </a>

                    <a className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                      <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
                      Blog
                    </a>

                    <a className="p-2 flex items-center text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href="#">
                      <svg className="shrink-0 size-4 me-3 md:me-2 block md:hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
                      로그인
                    </a> */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
        // <header  className="flex flex-col h-16 md:justify-start md:flex-nowrap z-50 w-full bg-white"
        //     onMouseEnter={() => openSubMenu()}
        //     onMouseLeave={() => closeSubMenu()}
        // >
        //     <nav className=" relative max-w-[85rem] z-50 w-full mx-auto md:flex md:items-center md:justify-between     md:gap-3 py-2 lg:px-8" >
        //         <div className="flex justify-between items-center gap-x-1 px-5">
        //             <Link className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80  " aria-label="Brand" href={"/"}>
        //                 <img src="/logo.png" width={80} height='auto' />
        //             </Link>

        //             <button type="button" className="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-[12px] rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none " id="hs-header-base-collapse"  aria-expanded="false" aria-controls="hs-header-base" aria-label="Toggle navigation"  data-hs-collapse="#hs-header-base" >
        //                 <svg className="hs-collapse-open:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
        //                 <svg className="hs-collapse-open:block shrink-0 hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        //                 <span className="sr-only">Toggle navigation</span>
        //             </button>
        //         </div>

        //         <div id="hs-header-base" className="hidden hs-collapse w-full overflow-hidden transition-all duration-300 basis-full grow bg-white md:block "  aria-labelledby="hs-header-base-collapse" >
        //             <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ">
        //                 <div className="py-2 md:py-0  flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
        //                     <div className="grow">
        //                         <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-0.5 md:gap-1">
        //                             { header_menus.map((menu : Menu, index:number)=>
        //                                 <a key={`header-menu-${index}`} className="cursor-default p-2 flex items-center text-sm text-gray-800 " href="#" onClick={openSubMenu}>
        //                                     {menu.iconSvg}
        //                                     {menu.title}
        //                                 </a>
        //                             )}

        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </nav>

        //     <div className={`hidden md:flex ${ showSubMenu? "opacity-100" : "opacity-0" } ${showSubMenu ? "translate-y-0 " : "-translate-y-full"} absolute z-50 left-0 top-16 content-start transition-all ease-in-out duration-500  bg-white w-full text-center md:items-center md:justify-between`} >
        //         {header_mega_menus.map((menu : MegaMenu, index:number) => 
        //             <div key={`header-mega-menu-${index}`} className="flex-1 min-h-32  cursor-pointer p-3 space-y-3" >
        //                 <p className="font-bold" onClick={()=>router.push(menu.mainTitleRoute)}>{menu.mainTitle}</p>
        //                 { menu.subTitle && menu.subTitle.map((title:Title,subIndex:number)=>
        //                     <p key={`mega-menu-submenu-${subIndex}`} onClick={()=>router.push(title.route)}>{title.name}</p>
        //                 )}
        //             </div>  
        //         )}
        //     </div>

    
        // </header>
    )
}