"use client"

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation'

import { AdminCode } from '../lib/const';
import Header from '@/components/layout/Header';
import { useJoyfulContext } from '@/context/JoyfulContext';

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
        <div className={`bg-point ${openEditModal && 'overflow-hidden'}`} >
          {/* <div style={{width:'1440px'}} className='flex flex-col mx-auto'> */}
          {/* <Announcement /> */}
          { !pathName.includes('admin') && 
            <div className="container flex justify-self-center">
              <Header />
            </div>
          }
          {children}
          {/* { !pathName.includes('admin') && 
            <div className="container flex justify-self-center">
              <Footer/>
            </div>  } */}
        </div>
    )
}