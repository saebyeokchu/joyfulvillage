"use client"

import ScrollOpacity from "./_component/ScrollOpaicty";
import Slider from "./_component/Slider";

export default function Home() {

  return (
    <div className="relative w-full mx-auto ">
      {/* slider info section */}
      {/* <div className="justify-center text-center slider-info-section border border-slate-600 h-screen w-full">
        <div className="bg-yellow-300 text-red-500">이미지 슬라이더</div>
      </div> */}
      {/* introduction1 - slider */}
      <div className="h-fit w-full lg:h-screen">
        <Slider />
      </div>
      
      {/* introduction2 - introudction title */}
      <ScrollOpacity className=" flex items-center object-center justify-center text-center w-full min-h-96 lg:h-screen" >
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="relative mx-auto max-w-4xl grid space-y-5 sm:space-y-10">
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-500 tracking-wide uppercase mb-3">
              폐교를 리모델링하여 만들어진 자연과 예술이 어우러진 공간
              </p>
              <h1 className="text-3xl text-gray-800 font-bold sm:text-5xl lg:text-6xl lg:leading-tight">
                <p className="text-pretty">자연 속 문화 예술 복합 공간의 </p>
                <p className="text-amber-500"> 조이풀 빌리지</p>
                
              </h1>
            </div>
          </div>
        </div>
      </ScrollOpacity>

      {/* introduction3 - joyful illustration */}
      <ScrollOpacity delay={300} className="fill">
        <img src="/landing-illustration.jpg" />
      </ScrollOpacity>

      
      {/* introduction2 */}
      <div className="bg-yellow-300 text-red-500">Introduction Section2 ~ 조이풀 빌리지의 생성과정을 짧게 사진과 이름으로 / 필요한 만큼 늘리기</div>
      <div className="grid grid-cols-2 min-h-96">
        <div className="introduction1-image h-screen"> 1 </div>
        <div> 1 </div>
        <div> 1 </div>
        <div className="introduction1-image h-screen"> 1 </div>
        <div className="introduction1-image h-screen"> 1 </div>
        <div> 1 </div>
      </div>

      {/* introduction3-도천의 세가지 공간 */}
      <div className="bg-yellow-300 text-red-500">Introduction Section3 ~ 세가지 공간</div>
      <div className="grid grid-cols-3 h-screen">
        <div className="introduction3-1 hover:opacity-50"></div>
        <div className="introduction3-2 hover:opacity-50"></div>
        <div className="introduction3-3 hover:opacity-50"></div>
      </div>
    </div>
  )
}