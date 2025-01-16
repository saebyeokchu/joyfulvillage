"use client"
import { usePathname, useRouter } from 'next/navigation'

import Footer from "./_component/Footer";
import Header from "./_component/Header";
import Admin from './admin/page';
import { JoyfulContextProvider, useJoyfulContext } from './_context/JoyfulContext';
import { useEffect } from 'react';
import { AdminCode } from './_data/Const';
import Announcement from './_component/Announcement';

export default function Middle({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const { setIsAdmin, openEditModal } = useJoyfulContext();
    const router = useRouter();
    const pathName = usePathname();

    if (typeof window !== 'undefined') {

      //check admin function
      useEffect(() => {
        // Check login status
        const adminLoginCompleted = localStorage.getItem("joyfuladminaccpedted");
    
        if (adminLoginCompleted == AdminCode) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

      }, [localStorage.getItem("joyfuladminaccpedted")]); // Add setIsAdmin to the dependency array

    }

// className={`${openEditModal && 'h-screen overflow-hidden'}`}
    return(
        <div className={`bg-point ${openEditModal && 'overflow-hidden'}`}>
          {/* <Announcement /> */}
          { !pathName.includes('admin') && <Header/>  }
          {children}
          { !pathName.includes('admin') && <Footer/>  }
        </div>
    )
}