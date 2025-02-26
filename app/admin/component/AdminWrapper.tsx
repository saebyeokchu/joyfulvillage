import { AuthError } from "@/lib/messages";
import { AdminCode } from "@/lib/const";
import { HeaderNotice } from "@/components/layout";
import { DimBackground } from "@/components/ui";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import Sidebar from "./Sidebar";
import { AdminHeaderMenu } from "@/lib/enums";
import moment from "moment";

const AdminWrapper = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const router = useRouter();
    const pathName = usePathname();
    useEffect(() => {
      // Check login status
      if (typeof window !== "undefined") {
        const adminLoginCompleted = localStorage.getItem("joyfuladminaccpedted");
        if (adminLoginCompleted !== AdminCode) {
          window.alert(AuthError.NotAuthorized);
          router.push("/");
        }
      }
    }, []); // Removed localStorage call from dependency array

    const subTitle : string = useMemo(()=>{
      const target : string = pathName.split("/")[2];
      return ( target && AdminHeaderMenu[target as keyof typeof AdminHeaderMenu] ) || '';
    },[pathName]);

    return (<>
        <div className="block lg:hidden min-h-screen">
            <div className="sticky top-0 inset-x-0 z-[70] ">
                <DimBackground />
            </div>
            <div className="sticky top-0 inset-x-0 z-[70] ">
                <HeaderNotice message="화면의 크기가 너무 작습니다. 화면의 크기를 조정해 주세요." /> 
            </div>
        </div>
        <div className="hidden bg-point min-h-screen lg:flex lg:flex-row font-pretendard border border-red-500 text-joyful-indigo">
            <Sidebar />
            <div className="p-10 border-2 w-full border-red-500">
              <div className="flex justify-between">
                <div className=" text-3xl font-bold">{subTitle}</div>
                <div>{moment().format('YYYY년 MM월 DD일')}</div>
              </div>
              <div>
                {children}
              </div>
            </div>
        </div>
    </>);
  }

export default AdminWrapper;