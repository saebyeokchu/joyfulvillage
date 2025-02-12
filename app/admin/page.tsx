"use client"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useJoyfulContext } from "@/context/JoyfulContext";

import { AdminCode } from "../../lib/const";
import { AuthError } from "../../lib/messages";
import { 
    DimBackground,
    Notice
} from "@/components/ui";

import ManageLoading from "./_lodging/page";
import EditHome from "./_home/page"; 
import ManageInquiry from "./_inquiry/ManageInquiry";
import ManageImage from "./_image/page";
import ManageCafe from "./_cafe/page";
import ManageProgram from "./_program/page";
import ManageBusniess from "./_busniess/page";
import Sidebar from "./_component/Sidebar";

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
            router.push("/");
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

            { joyfulContext.openAdminLoading &&
            <>
                <DimBackground />
                <div className="flex justify-center items-center w-full z-10 absolute top-1/3">
                    <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-yellow-600 rounded-full" role="status" aria-label="loading">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </>}
            
            {/* 수정내용 */}
            <div className="
                w-full  h-full
                 start-64 bg-white">
                { (searchParams.get('m') == 'home' || searchParams.get('m') ==  null) && <EditHome />}
                { searchParams.get('m') == 'sokso' && <ManageLoading />}
                { searchParams.get('m') == 'program' && <ManageProgram />}
                {/* { searchParams.get('m') == 'addProgram' && <AddProgram />} */}
                { searchParams.get('m') == 'inquiry' && <ManageInquiry />}
                { searchParams.get('m') == 'image' && <ManageImage />}
                { searchParams.get('m') == 'cafe' && <ManageCafe />}
                { searchParams.get('m') == 'info' && <ManageBusniess />}
            </div>
            

        </div>
        </>
    );
}