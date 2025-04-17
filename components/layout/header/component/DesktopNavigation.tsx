import { HeaderMenu } from "@/lib/enums";
import Link from "next/link";

const JoyfulVillageNaverLink = 'https://map.naver.com/p/entry/place/1024078581?placePath=%252Fhome%253Fentry%253Dplt&searchType=place&lng=129.3545276&lat=36.3070483&c=15.00,0,0,0,dh';

const DesktopNavigation = ({menuClicked} : {menuClicked : Record<HeaderMenu, boolean>}) => (
    <nav className={`hidden md:flex font-semibold space-x-24 text-sm font-arita text-joyful-indigo `}>
        <Link href="/about" className={`${menuClicked[HeaderMenu.about] && "underline"} hover:underline underline-offset-8`}>소개</Link>
        <Link href="/stay" className={`${menuClicked[HeaderMenu.stay] && "underline"} hover:underline underline-offset-8`}>스테이</Link>
        <Link href="/program" className={`${menuClicked[HeaderMenu.program] && "underline"} hover:underline underline-offset-8`}>프로그램</Link>
        <Link href="/cafe" className={`${menuClicked[HeaderMenu.cafe] && "underline"} hover:underline underline-offset-8`}>카페도천</Link>
        {/* <Link href="/booking" className={`${menuClicked[HeaderMenu.booking] && "underline"} hover:underline underline-offset-8`}>실시간 예약</Link> */}
        <a href={JoyfulVillageNaverLink}>실시간 예약</a>
        <Link href="/inquiry" className={`${menuClicked[HeaderMenu.inquiry] && "underline"} hover:underline underline-offset-8`}>문의</Link>
    </nav>
)

export default DesktopNavigation;