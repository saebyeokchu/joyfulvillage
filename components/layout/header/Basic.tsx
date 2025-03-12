import { HeaderMenu } from "@/lib/enums";
import HeaderLogos from "./component/Logo";
import DesktopNavigation from "./component/DesktopNavigation";
import Link from "next/link";
import { homeService } from "@/service";

const BasicHeader = ({onClickMobileMenu, menuClicked}:{onClickMobileMenu : any, menuClicked : Record<HeaderMenu, boolean>}) => {
  const { middleTitle } = homeService.GetMiddleTitle();
  
  return (
    <div className={`relative px-5 md:px-0 flex justify-between md:justify-normal md:items-center  md:flex-col  h-[66px] md:h-[197px] border-0 border-red-500`}>
      {/* <div className={`relative container px-5 md:mx-auto flex py-4 md:py-7 justify-between md:justify-center md:text-center md:items-center md:flex-col h-[66px]`}></div> */}
            {/* Logo md:justify-center md:text-center md:items-center */}
            {/* 44 37 */}
            <Link href="/" className="flex items-center space-x-2 border-0 border-red-500 md:mt-12">
              <HeaderLogos />
            </Link>

            {/* Introduction */}
            {/* <div className={`hidden md:block md:pb-4 space-x-16 font-medium text-joyful-indigo`}>
              {middleTitle}
            </div> */}

            {/* Desktop Navigation */}
            <div className="border-0 border-red-500 mt-11">
              <DesktopNavigation menuClicked={menuClicked} />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-xl focus:outline-none text-black"
              onClick={onClickMobileMenu}
            >
              ☰
            </button>
          </div>
)}
export default BasicHeader;