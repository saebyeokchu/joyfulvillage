"use client"
import { useEffect } from "react"

declare global {
    interface Window {
        kakao: any;
    }
  }

export default function Inquiry(){

    useEffect(() => {
        const kakaoMapScript = document.createElement('script')
        kakaoMapScript.async = false
        kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=4297b1d4febc7399cf0383c49b5b11d4&autoload=false`
        document.head.appendChild(kakaoMapScript);
        
        console.log(kakaoMapScript)
      
        const onLoadKakaoAPI = () => {
            if(window.kakao){
                window.kakao.maps.load(() => {
                    const container = document.getElementById('map')
                    const options = {
                      center: new window.kakao.maps.LatLng(36.30700271705157, 129.35450572886586),
                      level: 3,
                    }
              
                    new window.kakao.maps.Map(container, options)
                  })
            }
        }
      
        kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
      }, [])

    return(
        <div className="bg-point text-point">
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="flex-col flex">

                    <div className="h-min-[64px] mt-8  mx-12 md:mt-16 md:mx-28">
                        <h2 className="text-xl font-bold md:text-4xl md:leading-tight ">오시는 길</h2>
                        <span className={`block text-sm mt-4 md:text-base`}>
                            주소 경상북도 영덕군 남정면 산정로 320</span>
                        <div id="map" className="border-point mt-3" style={{ width: "100%", height: "400px" }}>Kakao Map</div>
                    </div>

                    <div className=" mt-16  mx-12 md:mx-28">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold md:text-4xl md:leading-tight ">자주 묻는 질문</h2>
                            <div className="pt-8">
                                <div className="hs-accordion-group divide-y divide-gray-200 ">
                                    <div className="hs-accordion pb-3 active " id="hs-basic-with-title-and-arrow-stretched-heading-one">
                                        <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start  rounded-lg transition focus:outline-none" aria-expanded="true" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">
                                            Q  운영시간은 어떻게 되나요?
                                            <svg className="hs-accordion-active:hidden block shrink-0 size-5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                            <svg className="hs-accordion-active:block hidden shrink-0 size-5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                                        </button>
                                        <div id="hs-basic-with-title-and-arrow-stretched-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
                                            <p>
                                                조이풀 빌리지의 운영시간은 월요일 부터 금요일까지는 오전 10시에서 6시입니다. (일요일은 별도로 운영하지 않습니다.)
                                            </p>
                                        </div>
                                    </div>

                                    <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-two">
                                        <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start  rounded-lg transition focus:outline-none" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                                        Q  입금 계좌는 어떻게 되나요?
                                            <svg className="hs-accordion-active:hidden block shrink-0 size-5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                            <svg className="hs-accordion-active:block hidden shrink-0 size-5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                                        </button>
                                        <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
                                            <p>
                                             입금계좌는 010-6513-8461로 문의주시면 안내해 드리겠습니다.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-three">
                                        <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start  rounded-lg transition focus:outline-none" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three">
                                        Q  환불 규정은 어떻게 되나요?
                                            <svg className="hs-accordion-active:hidden block shrink-0 size-5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                            <svg className="hs-accordion-active:block hidden shrink-0 size-5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                                        </button>
                                        <div id="hs-basic-with-title-and-arrow-stretched-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three">
                                            <p>
                                            환불규정은 010-6513-8461로 문의주시면 안내해 드리겠습니다.
                                            
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-16  mx-12 md:mx-28" >
                        <p className="font-bold pt-5">다른 궁금증이 있으신가요?</p>
                        <p className="mt-3">010-6513-8461 여기로 문의주시면 친절히 안내드리겠습니다.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}