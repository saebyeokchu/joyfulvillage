import { useEffect, useState } from "react";
import Image from "next/image";

import { Get } from "@/lib/api/Biz";
import { AxiosResponse } from "@/lib/enums";
import { Instagram, NaverBlog } from "@/lib/svgs";


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
        <footer className="  bg-point w-full border-t border-amber-700 border-opacity-15 text-white" style={{backgroundColor:'#4B5A62'}}>
            <div className={`max-w-[85rem] mx-auto py-5 lg:pt-10 `}>
                <div className="grid gap-6 p-4 md:grid-cols-8 md:p-0">

                    <div className="col md:col-span-3">
                        <a className="flex-none text-xl   focus:outline-none focus:opacity-80" href="#" aria-label="투웰브 마운틴즈">
                            {/* <img src="/twelve-logo.png" width="100vh"/> */}
                            <div id="footerKakaoMap" className="border border-slate-500 text-sm text-black w-full h-36 p-3">kakaomap</div>

                        </a>
                        <div className="text-sm flex flex-col space-y-3 mt-4 md:text-base md:space-y-0">
                            <p>
                                <span className="font-bold">조이풀빌리지</span> {addressText}
                            </p>
                            <p>월요일 - 토요일 10:00 - 18:00 일요일 off</p>
                        </div>
                    </div>

                    <div className="col md:col-span-3">
                        <div className="text-sm flex flex-col gap-y-3">
                            <div className="flex flex-row gap-x-2">
                                <span>(주)투웰브마운틴즈</span>
                                <span>사업자등록번호 898-87-02686</span>
                            </div>
                            <div className="flex flex-row gap-x-2">
                                <Instagram />
                                <span>@hayoungin7</span>
                                <span>@joyvil_company</span>
                            </div>
                            <div className="flex flex-row gap-x-2">
                                <NaverBlog />
                                <span>@(주)투웰브마운틴즈</span>
                            </div>
                        </div>
                    </div>


                    <div className="col md:col-span-1  md:col-start-8 flex flex-row md:flex-col h-full justify-between items-start md:items-end">
                        <Image src="/images/system/footer/1.png" width={139} height={30} alt="footer logo1" />
                        <Image src="/images/system/footer/2.png" width={100} height={30} alt="footer logo2" />
                        <Image src="/images/system/footer/3.png" width={119} height={25} alt="footer logo3" />
                        <Image src="/images/system/footer/4.png" width={73} height={20} alt="footer logo4" />
                    </div>

                </div>

                <div className="flex flex-row justify-items-end text-end w-full gap-x-2 content-end items-end justify-end" style={{color:'#4B5A62'}}>
                    <div className="text-sm">
                        <a href="/login/admin" className="">관리자 로그인</a>
                    </div>
                    <div> | </div>
                    <div className="text-sm">
                        © 2024 Powered by Sharelife
                    </div>
                </div>
            </div>
        </footer>
    )
}