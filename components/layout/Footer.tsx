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
        <footer className="py-5 lg:py-10 bg-joyful-indigo text-white font-arita" >
            <div className={`container px-5 md:px-16 py-10 md:py-0 md:mx-auto flex flex-col md:flex-row space-y-10 md:space-y-0 justify-between border-0 border-yellow-700`}>

                <div className="flex flex-col md:flex-row border-0 border-red-500 md:space-x-20 space-y-10 md:space-y-0">
                    <div className="text-sm flex flex-col space-y-3 md:text-base">
                        <div className="flex flex-row gap-y-2 gap-x-2">
                            <span>조이풀빌리지</span>
                            <span>경상북도 영덕군 남정뮨 산정로 320</span>
                        </div>
                        <div>월요일 - 토요일 10:00 - 18:00 일요일 off</div>
                        <div className="flex flex-row gap-y-2 gap-x-2">
                            <a href="/login/admin" >관리자 로그인</a>
                            <span>© 2024 Powered by Sharelife</span>
                        </div>
                    </div>

                    <div className="text-sm flex flex-col space-y-3 md:text-base ">
                        <div className="flex flex-row gap-y-2 gap-x-2">
                            <span>(주)투웰브마운틴즈</span>
                            <span>사업자등록번호 898-87-02686</span>
                        </div>
                        <div className="flex fflex-row gap-y-2 gap-x-2">
                            <Instagram />
                            <span className="cursor-pointer" onClick={()=>OpenWindow(InstagramHayoungingLink)}>@hayoungin7</span>
                            <span className="cursor-pointer ml-4" onClick={()=>OpenWindow(InstagramJoyfulLink)}>@joyvil_company</span>
                        </div>
                        <div className="flex flex-row gap-y-2 gap-x-2">
                            <NaverBlog />
                            <span className="cursor-pointer " onClick={()=>OpenWindow(NaverBlogTweleveMountLink)}>@(주)투웰브마운틴즈</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col border-0 border-red-500 space-y-5 md:items-end">
                    <Image src="/images/footer1.png" width={139} height={30}  alt="footer logo1" />
                    <Image src="/images/footer2.png" width={100} height={30} alt="footer logo2" />
                    <Image src="/images/footer3.png" width={119} height={25} alt="footer logo3" />
                    <Image src="/images/footer4.png" width={73} height={20} alt="footer logo4" />
                </div>

            </div>
        </footer>
    )
}