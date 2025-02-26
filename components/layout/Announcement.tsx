"use client"
import { useEffect, useState } from "react";

export default function Announcement(){
    const [showAnnouncement,setShowAnnouncement] = useState<boolean>(false);

    useEffect(()=>{
        const showAn = localStorage.getItem("showAnnouncement");

        if(showAn == null){
            setShowAnnouncement(true);
        }else{
            if(showAn == "closed"){
                setShowAnnouncement(false);
            }else{
                setShowAnnouncement(true);
            }
        }
    },[])

    const closeAnnouncement = () => {
        localStorage.setItem("showAnnouncement","closed");
        location.reload();
    }

    return(
        showAnnouncement && <div className="bg-white/60 backdrop-blur-lg ">
            <div className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 mx-auto">
                <div className="grid justify-center sm:grid-cols-2 sm:items-center gap-4">
                <div className="flex items-center gap-x-3 md:gap-x-5">
                    <div className="grow">
                    {/* <p className="md:text-xl text-gray-800 font-semibold dark:text-neutral-200">
                        Get started today.
                    </p> */}
                    <p className="text-sm  text-gray-800 ">
                        조이풀 빌리지는 웹에 최적화 되어 있습니다. 편리한 예약을 위해서 웹 버전을 이용해 주세요
                    </p>
                    </div>
                </div>

                <div className="text-center sm:text-start flex sm:justify-end sm:items-center gap-x-3 md:gap-x-4">
                    <a onClick={closeAnnouncement} className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border-0 border-0-transparent bg-yellow-600 text-white hover:bg-yellow-700 focus:outline-none focus:bg-yellow-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
                    닫기
                    </a>
                    {/* <a className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border-0 border-0-gray-800 text-gray-800 hover:border-0-gray-500 hover:text-gray-500 focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-0-white dark:text-white dark:hover:text-neutral-300 dark:hover:border-0-neutral-300 dark:focus:text-neutral-300 dark:focus:border-0-neutral-300" href="#">
                    Buy now
                    </a> */}
                </div>
                </div>
            </div>
        </div>
    )
}