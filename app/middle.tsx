"use client"
import { usePathname } from 'next/navigation'

import Footer from "./_component/Footer";
import Header from "./_component/Header";
import Admin from './admin/page';

export default function Middle({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const pathname = usePathname()

    console.log(pathname)

    return(
        <div>
            { pathname === "/admin" ? <Admin /> : <div>
                <Header />
                {children}
                <Footer />
            </div>}

        </div>
    )
}