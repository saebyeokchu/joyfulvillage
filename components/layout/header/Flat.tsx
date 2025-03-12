import Link from "next/link";
import Image from "next/image";
import DesktopNavigation from "./component/DesktopNavigation";
import { HeaderMenu } from "@/lib/enums";
import HeaderLogos from "./component/Logo";

const FlatHeader = ({onClickMobileMenu, menuClicked}:{onClickMobileMenu : any, menuClicked : Record<HeaderMenu, boolean>}) => {
  const onClickMenu = () => {

  }

  return (
  <div className={`relative px-5 md:px-0  container md:mx-auto flex py-4 md:py-7 justify-between md:justify-center md:text-center md:items-center md:flex-col h-[66px]`}>
            {/* Logo */}
            {/* 44 37 */}
            <Link href="/" className="md:absolute md:left-10 flex items-center space-x-2 ">
              <HeaderLogos width={117} height={33} />
            </Link>

            {/* Desktop Navigation */}
            <DesktopNavigation menuClicked={menuClicked} />

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-xl focus:outline-none text-black"
              onClick={onClickMobileMenu}
            >
              ☰
            </button>
          </div>
)}
export default FlatHeader;