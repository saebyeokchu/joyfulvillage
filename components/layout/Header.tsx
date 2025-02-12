"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const webLogoWidth = pathname.toLowerCase() === "/about" ? 100 : 184;
  const webMenuTextClass = pathname.toLowerCase() === "/about" ? "space-x-16 text-sm" : "space-x-24 text-lg";

  // Handle scroll effect (optional)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 ease-in-out
        ${
          isScrolled ? "shadow-md" : "bg-opacity-50"
        }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex  justify-between md:flex-col md:justify-center items-center py-4 md:pt-11 md:pb-6">
          {/* Logo */}
          {/* 44 37 */}
          <Link href="/" className="flex items-center space-x-2 md:pb-9">
            <Image className="flex md:hidden" src="/logo.png" alt="Joyful Village Logo Web" width={80} height={50} />
            <Image className="hidden md:flex" src="/logo.png" alt="Joyful Village Logo Mobile" width={webLogoWidth} height={89} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-16 text-sm font-medium">
            <Link href="/about" className="hover:underline underline-offset-8">소개</Link>
            <Link href="/stay" className="hover:underline underline-offset-8">스테이</Link>
            <Link href="/programs" className="hover:underline underline-offset-8">프로그램</Link>
            <Link href="/cafe" className="hover:underline underline-offset-8">카페도천</Link>
            <Link href="/booking" className="hover:underline underline-offset-8">실시간 예약</Link>
            <Link href="/inquiry" className="hover:underline underline-offset-8">문의</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center bg-white py-4 space-y-3 text-lg font-medium border-t">
          <Link href="/about" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>소개</Link>
          <Link href="/stay" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>스테이</Link>
          <Link href="/programs" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>프로그램</Link>
          <Link href="/cafe" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>카페도첸</Link>
          <Link href="/booking" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>실시간 예약</Link>
          <Link href="/inquiry" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>문의</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;