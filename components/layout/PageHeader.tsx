"use client"
import { imgAddress } from "@/lib/const";
import { useEffect, useState } from "react";

const PageHeader = ({
    src,
    title,
    subTitle1,
    subTitle2,
    alt,
    showBtn = false,
    btnName,
    onClickBtn,
    btnPhoneNumber
}:{
    src : string,
    title : string,
    subTitle1 : string | undefined | null,
    subTitle2? : string | undefined | null,
    alt : string,
    showBtn? : boolean,
    btnName? : string,
    onClickBtn? : string | any,
    btnPhoneNumber? : string | undefined
}) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();
        
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
      }, [src]);


    return (
        <div className="relative w-full  border-0 border-0-red-700 "  >
            {/* Header Text Section (Positioned Below) p-5 md:p-8*/} 
            <div
                className={`bg-cover bg-center border-0 border-red-500 h-[446px] ${isLoaded ? "opacity-100" : "opacity-0"}`}
                style={{ backgroundImage: `url(${src})` }}
            >
                {/* This inner div is absolutely positioned to stick at the bottom */}
                <div className="absolute bottom-16 left-0 right-0 text-white container mx-auto border-0 border-yellow-500 px-5 md:px-14">
                    <div className="flex flex-col md:flex-row md:space-x-6">
                        <p className="text-2xl font-bold md:text-5xl md:font-normal">{title}</p>
                        {/* md screen sub title */}
                        <p className={`hidden md:block text-sm ${!subTitle2 && 'mt-5'}  md:text-base md:font-bold font-arita font-medium`}>
                            {subTitle1} {subTitle2 && <><br />{subTitle2}</> }
                        </p>
                        {/* sm screen sub title */}
                        <p className="block md:hidden text-sm mt-2  md:text-base md:font-bold font-medium font-arita">
                            {subTitle1} {subTitle2}
                        </p>
                    </div>
                    
                    <div className="hidden md:block">
                        {showBtn  && 
                            ( isScrolled ? 
                            <div
                                
                                className={`fixed bottom-5 right-5 md:bottom-16 md:right-32 hidden md:flex w-20 h-20 text-center text-white rounded-full cursor-pointer items-center justify-center z-10`}
                                style={{ backgroundColor: "#6E8653E5" }}
                                >
                                { btnName === '문의하기' ? <a href={`tel:`+btnPhoneNumber}>{btnName}</a> : <span onClick={onClickBtn}>{btnName}</span>}
                            </div> : 
                            <div
                                className={`absolute bottom-5 right-5 md:bottom-0 md:right-14 hidden md:flex w-20 h-20 text-center text-white rounded-full cursor-pointer items-center justify-center`}
                                style={{ backgroundColor: "#6E8653E5" }}
                                >
                                { btnName === '문의하기' ? <a href={`tel:`+btnPhoneNumber}>{btnName}</a> : <span onClick={onClickBtn}>{btnName}</span>}

                            </div> )
                        }
                    </div>
                    
                </div>


                
            </div>

           
            {/* Mobile Header Text Section (Positioned Below) */}
            {/* <div className="flex md:hidden justify-center text-start w-full h-[350px]" style={{ backgroundImage: `url(${src})` }}>
                <div className="absolute bottom-0 left-0 right-0 container mx-auto border-2 border-yellow-500 p-5 md:p-8 text-white">
                    <p className="text-2xl font-bold md:font-normal ">{title}</p>
                    <p className="text-base mt-2 md:mt-5 md:text-lg  font-arita">{subTitle}</p>
                </div>
            </div> */}

            { showBtn && <div
                onClick={onClickBtn}
                className={`block md:hidden fixed bottom-5 right-5 pt-7  w-20 h-20 text-center text-white rounded-full cursor-pointer items-center justify-center z-10`}
                style={{ backgroundColor: "#6E8653E5" }}
                >
                <span className="">{btnName}</span>
            </div> }

        </div>
    )
}

export default PageHeader;