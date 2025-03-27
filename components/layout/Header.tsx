"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BasicHeader from "./header/Basic";
import FlatHeader from "./header/Flat";
import { HeaderMenu } from "@/lib/enums";
import Loading from "./Loading";
import { useLoadingIndicator } from "@/hook/useLoadingIndicator";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const loading = useLoadingIndicator();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const mdFlatHeader = [HeaderMenu.inquiry,HeaderMenu.program,"/stay",HeaderMenu.cafe,"/admin","/about","/booking"].find((url : string) => pathname.includes(url)) ;
  const menuClicked : Record<HeaderMenu, boolean> = {
    [ HeaderMenu.home ] : false,
    [ HeaderMenu.about ] : false,
    [ HeaderMenu.stay ] : false,
    [ HeaderMenu.program ]  : false,
    [ HeaderMenu.cafe ] : false,
    [ HeaderMenu.booking ] : false,
    [ HeaderMenu.inquiry ] : false,
  }

  menuClicked[pathname as HeaderMenu] = true;

  // Handle scroll effect (optional)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClickMobileMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50  bg-white transition-all duration-300 ease-in-out
          ${
            isScrolled ? "bg-opacity-90" : "bg-opacity-80"
          }`}
      > 
        <div className={`container mx-auto `}>
          
          { mdFlatHeader ?
            // Flat header menu
            <FlatHeader onClickMobileMenu={onClickMobileMenu} menuClicked={menuClicked} />
            :
            // Basic header menu
            <BasicHeader onClickMobileMenu={onClickMobileMenu} menuClicked={menuClicked} />
          }
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col items-end pr-4 py-4 space-y-3 text-lg font-medium text-black ">
            <Link href="/about" className={`${menuClicked[HeaderMenu.about] && "underline"} hover:underline underline-offset-8`} onClick={() => setIsOpen(false)}>소개</Link>
            <Link href="/stay" className={`${menuClicked[HeaderMenu.stay] && "underline"} hover:underline underline-offset-8`} onClick={() => setIsOpen(false)}>스테이</Link>
            <Link href="/program" className={`${menuClicked[HeaderMenu.program] && "underline"} hover:underline underline-offset-8`} onClick={() => setIsOpen(false)}>프로그램</Link>
            <Link href="/cafe" className={`${menuClicked[HeaderMenu.cafe] && "underline"} hover:underline underline-offset-8`} onClick={() => setIsOpen(false)}>카페도천</Link>
            <Link href="/booking" className={`${menuClicked[HeaderMenu.booking] && "underline"} hover:underline underline-offset-8`} onClick={() => setIsOpen(false)}>실시간 예약</Link>
            <Link href="/inquiry" className={`${menuClicked[HeaderMenu.inquiry] && "underline"} hover:underline underline-offset-8`} onClick={() => setIsOpen(false)}>문의</Link>
          </nav>
        </div>
      </header>
      {loading  && <div className="h-screen">
        <Loading />
      </div>}
    </>
  );
};

export default Header;