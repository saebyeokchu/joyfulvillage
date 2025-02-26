"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

import { Get } from "@/api/Biz";
import { AxiosResponse } from "@/lib/enums";
import { Instagram, NaverBlog } from "@/lib/svgs";
import { OpenWindow } from "@/lib/common";
import { InstagramHayoungingLink, InstagramJoyfulLink, NaverBlogTweleveMountLink } from "@/lib/const";


export default function Footer(){

    const [addressText, setAddressText]=useState<string>("");
    const [runningTime, setRunningTime]=useState<string>("10:00 ~ 18:00");
    const [busniessNumber, setBusniessNumber]=useState<string>("");
    const [instaUrl, setInstalUrl]=useState<string>("");
    const [youtubeUrl, setYoutubeUrl]=useState<string>("");

    //call kakaomap
    useEffect(() => {
        getKakaoInfo()
          }, []);
    
          
    const getKakaoInfo = async () => {
        await Get().then(response => {
            if(response.status == AxiosResponse.Successful){
                const data = response.data[0];
                setAddressText(data.addressText);
                setRunningTime(data.runningHours);
                setBusniessNumber(data.busniessNumber);
                setInstalUrl(data.instagramUrl);
                setYoutubeUrl(data.youtubeUrl);
                setKakaoMap(data.latitude, data.longtitude);
            }
        });
    }

    const setKakaoMap = (lat : string, long :string) => {
        const kakaoMapScript = document.createElement('script')
        kakaoMapScript.async = false
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=4297b1d4febc7399cf0383c49b5b11d4&autoload=false`
        document.head.appendChild(kakaoMapScript);
        
        console.log(kakaoMapScript)
      
        const onLoadKakaoAPI = () => {
            if(window.kakao){
                window.kakao.maps.load(() => {
                    const container = document.getElementById('footerKakaoMap')
                    const options = {
                      center: new window.kakao.maps.LatLng(lat, long),
                      level: 3,
                    }
              
                    new window.kakao.maps.Map(container, options)
                  })
            }
        }
      
        kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
    }

    
          
    return(
        <footer className="py-5 lg:py-10 bg-joyful-indigo text-white " >
            <div className={`container px-5 md:mx-auto border-0 border-yellow-700`}>
                <div className="grid gap-12 md:*:gap-6 md:grid-cols-8 ">

                    <div className="col md:col-span-3">
                        <a className="flex-none text-xl   focus:outline-none focus:opacity-80" href="#" aria-label="투웰브 마운틴즈">
                            {/* <img src="/twelve-logo.png" width="100vh"/> */}
                            <div id="footerKakaoMap" className="border-0 border-0-slate-500 text-sm text-black w-full h-36 p-3">kakaomap</div>
                        </a>
                        <div className="text-sm flex flex-col space-y-3 mt-4 md:text-base">
                            <div>
                                <span className="font-bold">조이풀빌리지</span> {addressText}
                            </div>
                            <div>월요일 - 토요일 10:00 - 18:00 일요일 off</div>
                        </div>
                    </div>

                    <div className="col md:col-span-3">
                        <div className="text-sm flex flex-col gap-y-3">
                            <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2">
                                <span>(주)투웰브마운틴즈</span>
                                <span>사업자등록번호 898-87-02686</span>
                            </div>
                            <div className="flex flex-row gap-x-2">
                                <Instagram />
                                <span className="cursor-pointer" onClick={()=>OpenWindow(InstagramHayoungingLink)}>@hayoungin7</span>
                                <span className="cursor-pointer " onClick={()=>OpenWindow(InstagramJoyfulLink)}>@joyvil_company</span>
                            </div>
                            <div className="flex flex-row gap-x-2">
                                <NaverBlog />
                                <span className="cursor-pointer " onClick={()=>OpenWindow(NaverBlogTweleveMountLink)}>@(주)투웰브마운틴즈</span>
                            </div>
                        </div>
                    </div>

                    <div className="col md:col-span-1  md:col-start-8 flex flex-col h-full space-y-3 md:justify-between items-start md:items-end">
                        <Image src="/images/system/footer/1.png" width={139} height={30} alt="footer logo1" />
                        <Image src="/images/system/footer/2.png" width={100} height={30} alt="footer logo2" />
                        <Image src="/images/system/footer/3.png" width={119} height={25} alt="footer logo3" />
                        <Image src="/images/system/footer/4.png" width={73} height={20} alt="footer logo4" />
                    </div>

                </div>

                <div className="hidden lg:flex flex-row text-start justify-start w-full gap-x-2 md:mt-3 text-xs" >
                    <div className="text-sm ">
                        <a href="/login/admin" className="">관리자 로그인</a>
                    </div>
                    <div > | </div>
                    <div className="text-sm">
                        © 2024 Powered by Sharelife
                    </div>
                </div>
            </div>
        </footer>
    )
}