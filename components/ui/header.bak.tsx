"use client"

import { MegaMenu, Title } from "@/types/Types";
import { useJoyfulContext } from "@/context/JoyfulContext";
import Link from "next/link";


const MenuWithClick = ({
  onClickFunction,
  name
}:{
  onClickFunction : any,
  name : string
}) => <a 
        className={`cursor-pointer p-2 flex items-center text-sm bg-point bg-point-hover rounded-lg focus:outline-none focus:bg-point-darker`} 
        aria-current="page"
        onClick={onClickFunction}
        >
        {name}
      </a>

const MenuWithHref = ({
  keyStr,
  hrefRoute,
  iconSvg,
  name
}:{
  keyStr : string
  hrefRoute : string,
  iconSvg: any,
  name : string,
}) => <a 
        key={keyStr}
        className={`p-2 flex items-center text-sm bg-point bg-point-hover rounded-lg focus:outline-none focus:bg-point-darker`} 
        href={hrefRoute} 
        aria-current="page"
        >
        {iconSvg}
        {name}
      </a>

export default function Header(){
    const joyfulContext = useJoyfulContext();

    const logoutAdmin = () => {
      localStorage.setItem("joyfuladminaccpedted","");
      joyfulContext.setIsAdmin(false);
      location.reload();
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
                <a className="p-3 flex gap-x-4 bg-point-hover focus:outline-none focus:bg-point-darker rounded-lg dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" href={sub.route}>
                  {/* <svg className="shrink-0 size-4 mt-1 text-gray-800 dark:text-neutral-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg> */}
                  <div className="grow">
                    <span className="block font-semibold text-sm  dark:text-neutral-200">{sub.name}</span>
                    {/* <p className="text-sm text-gray-500 dark:text-neutral-500">How you get the most accurate and up-to-date data</p> */}
                  </div>
                </a>

              </div>
            )
          })}
        </div>
      </div>
    </div>
    
    return(
      // border-0-point-bottom
      <header className="flex flex-wrap bg-point md:justify-start md:flex-nowrap z-50 w-full ">
        <nav className="relative w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-x-1">
            <Link className="flex-none font-semibold text-xl focus:outline-none focus:opacity-80 " href="/" aria-label="Brand">
              <img src="/logo.png" className="pt-3" width={80} height='auto' />
            </Link>

            <button type="button" className="hs-collapse-toggle md:hidden relative size-9 flex justify-center items-center font-medium text-[12px] rounded-lg border-0 border-0-gray-200 bg-point-hover focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none " id="hs-header-base-collapse"  aria-expanded="false" aria-controls="hs-header-base" aria-label="Toggle navigation"  data-hs-collapse="#hs-header-base" >
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

                      {/* { header_mega_menus.map((menu : MegaMenu, index : number) => {

                        if(menu.subTitle){
                          return DropDownMenu(menu, index);
                        }else{
                          return (
                            menu.disabled? <span key={`header-menu-${index}`} className="p-2 flex items-center text-sm text-gray-300">{menu.iconSvg}{menu.mainTitle}</span> :
                            <a 
                              key={`header-menu-${index}`}
                              className={`p-2 flex items-center text-sm bg-point bg-point-hover rounded-lg focus:outline-none focus:bg-point-darker`} 
                              href={menu.mainTitleRoute} 
                              aria-current="page"
                            >
                              {menu.iconSvg}
                              {menu.mainTitle}
                            </a>
                          )
                        }
                      })} */}
                      
                      {
                        joyfulContext.isAdmin && 
                        <>
                          <MenuWithHref name={"관리 페이지"} keyStr={"go-to-admin"} hrefRoute={"/admin"} iconSvg={undefined} />
                          <MenuWithClick onClickFunction={logoutAdmin} name={"관리자 모드 해재"} />
                        </>
                      }


                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
}