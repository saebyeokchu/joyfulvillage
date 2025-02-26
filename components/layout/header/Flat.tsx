import Link from "next/link";
import Image from "next/image";
import DesktopNavigation from "./component/DesktopNavigation";
import { HeaderMenu } from "@/lib/enums";

const FlatHeader = ({onClickMobileMenu, menuClicked}:{onClickMobileMenu : any, menuClicked : Record<HeaderMenu, boolean>}) => (
  <div className={`flex justify-between md:justify-center md:text-center md:items-center md:flex-col py-4  md:py-7 px-5 `}>
            {/* Logo */}
            {/* 44 37 */}
            <Link href="/" className="md:absolute md:left-8 flex items-center space-x-2 ">
              <Image className="flex md:hidden" src="/images/system/logo_without_undertext.png" alt="Joyful Village Logo Mobile" width={84} height={50} />
              <Image className="hidden md:flex " src="/images/system/logo_without_undertext.png" alt="Joyful Village Logo Web" width={117} height={33} />
            </Link>

            {/* Desktop Navigation */}
            <DesktopNavigation menuClicked={menuClicked}/>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-xl focus:outline-none text-black"
              onClick={onClickMobileMenu}
            >
              ☰
            </button>
          </div>
)
export default FlatHeader;