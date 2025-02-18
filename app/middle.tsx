"use client"

import { useEffect } from 'react';
import { usePathname } from 'next/navigation'
import { useJoyfulContext } from '@/context/JoyfulContext';

import { AdminCode } from '../lib/const';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Middle({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const { setIsAdmin, openEditModal } = useJoyfulContext();
    const pathName = usePathname();

    //define the excluded paths
    const excludeHeaderPaths = ["/admin"]; // Add more if needed
    const excludeFooterPaths = ["/admin", "/"]; // Hides footer on `/admin` & `/`

    useEffect(() => {
      const adminLoginCompleted = localStorage.getItem("joyfuladminaccpedted");
      setIsAdmin(adminLoginCompleted == AdminCode);
    },[]);

    //dynamically check if header or footer should be displayed
    const showHeader = !excludeHeaderPaths.some((path)=>pathName == path);
    const showFooter = !excludeFooterPaths.some((path)=>pathName == path);

    return(
        <div className={`bg-point ${openEditModal && 'overflow-hidden'}`} >
          { showHeader && 
            <div className="container flex justify-self-center">
              <Header />
            </div>
          }
          {children}
          { showFooter &&  <Footer /> }
        </div>
    )
}