"use client"

import Link from "next/link";
import { useJoyfulContext } from "../_context/JoyfulContext";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AdminCode } from "../_data/Const";
import { AuthError } from "../_data/Messages";
import DimBackground from "../_component/DimBackground";
import Notice from "../_component/Notice";
import { Soops } from "../_data/Room";
import { Programs } from "../_data/Programs";
import ManageLoading from "./_lodging/Page";
import ManageProgram from "./_program/Page";
import Sidebar from "./_component/Sidebar";
import EditHome from "./_home/EditHome";
import ManageInquiry from "./_inquiry/ManageInquiry";

export default function Admin(){

    const joyfulContext = useJoyfulContext();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [windowWidth, setWindowWidth] = useState(0);

    if (typeof window !== 'undefined') {
        useEffect(() => {
            // Check login status
          const adminLoginCompleted = localStorage.getItem("joyfuladminaccpedted");
      
          if (adminLoginCompleted != AdminCode) {
            window.alert(AuthError.NotAuthorized);
            router.back();
          } 
        },[localStorage.getItem("joyfuladminaccpedted")]);

        useEffect(()=>{
            setWindowWidth(window.innerWidth);
        },[window.innerWidth ])
    }
    

    //https://github.com/htmlstreamofficial/preline/blob/main/templates/admin/index.html
    return (
        <>
        <div className="block lg:hidden">
            <div className="sticky top-0 inset-x-0 z-[70] ">
                <DimBackground />
            </div>
            <div className="sticky top-0 inset-x-0 z-[70] ">
                <Notice />
            </div>
        </div>
        <div className="hidden bg-white h-100 lg:flex lg:flex-row">

           <Sidebar />
            
            {/* 수정내용 */}
            <div className="
                w-full  h-full
                 start-64 z-[60] bg-white">
                { (searchParams.get('m') == 'home' || searchParams.get('m') ==  null) && <EditHome />}
                { searchParams.get('m') == 'sokso' && <ManageLoading />}
                { searchParams.get('m') == 'program' && <ManageProgram />}
                { searchParams.get('m') == 'inquiry' && <ManageInquiry />}
            </div>
        </div>
        </>
    );
}