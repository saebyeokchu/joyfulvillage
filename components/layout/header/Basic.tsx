import Link from "next/link";
import Image from "next/image";
import DesktopNavigation from "./component/DesktopNavigation";
import { HeaderMenu } from "@/lib/enums";

const BasicHeader = ({onClickMobileMenu, menuClicked}:{onClickMobileMenu : any, menuClicked : Record<HeaderMenu, boolean>}) => (
    <div className={`flex justify-between md:justify-center md:text-center md:items-center md:flex-col py-4  md:pt-11 md:pb-6 px-5 md:px-0`}>
            {/* Logo */}
            {/* 44 37 */}
            <Link href="/" className="flex items-center space-x-2 md:pb-4">
              <Image className="flex md:hidden" src="/images/system/logo_without_undertext.png" alt="Joyful Village Logo Mobile" width={84} height={50} />
              <Image className="hidden md:flex " src="/images/system/logo_without_undertext.png" alt="Joyful Village Logo Web" width={184} height={56} />
            </Link>

            {/* Introduction */}
            <div className={`hidden md:block md:pb-4 space-x-16 font-medium text-joyful-indigo`}>
              문화예술영성 공간
            </div>

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
)
export default BasicHeader;