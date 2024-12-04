"use client"

import { useRef } from "react";
import ScrollOpacity from "./_component/ScrollOpaicty";
import Slider from "./_component/Slider";

export default function Home() {

  const intro3Ref1 = useRef<any>();
  const intro3Ref2 = useRef<any>();
  

  const onSection3Hover = (index : number) => {
    console.log("mouse enter");

    if (intro3Ref1.current && intro3Ref2.current) {
      //add class "col-span-2"
      if(index == 1){
        if (intro3Ref1.current) {
          intro3Ref1.current.classList.add('col-span-2');
          intro3Ref2.current.classList.add('hidden');
          intro3Ref1.current.children[0].classList.remove('hidden');
        }
      }else{
        if (intro3Ref2.current) {
          intro3Ref2.current.classList.add('col-span-2');
          intro3Ref1.current.classList.add('hidden');
          intro3Ref2.current.children[0].classList.remove('hidden');
        }
      }
    }
   
  }

  const onLeave3Hover = (index : number) => {
    console.log("mouse leave");

    if (intro3Ref1.current && intro3Ref2.current) {
      //remove class "col-span-2"
      if(index == 1){
        if (intro3Ref1.current) {
          intro3Ref1.current.classList.remove('col-span-2');
          intro3Ref2.current.classList.remove('hidden');
          intro3Ref1.current.children[0].classList.add('hidden');

        }
      }else{
        if (intro3Ref2.current) {
          intro3Ref2.current.classList.remove('col-span-2');
          intro3Ref1.current.classList.remove('hidden');
          intro3Ref2.current.children[0].classList.add('hidden');

        }
      }
    }
  }

  return (
    <div className="relative w-full mx-auto bg-white ">
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

      
      {/* introduction2
      <div className="bg-yellow-300 text-red-500">Introduction Section2 ~ 조이풀 빌리지의 생성과정을 짧게 사진과 이름으로 / 필요한 만큼 늘리기</div>
      <div className="grid grid-cols-2 min-h-96">
        <div className="introduction1-image h-screen"> 1 </div>
        <div> 1 </div>
        <div> 1 </div>
        <div className="introduction1-image h-screen"> 1 </div>
        <div className="introduction1-image h-screen"> 1 </div>
        <div> 1 </div>
      </div> */}

      <ScrollOpacity className="grid grid-cols-2 h-screen">
        <div 
          ref={intro3Ref1}
          className="cursor-pointer introduction3-1 " 
          onMouseEnter={(event : any)=>onSection3Hover(1)} 
          onMouseLeave={(event : any)=>onLeave3Hover(1)}
        >
          <div className="hidden"> 
            <div className="w-1/2 absolute text-right top-40 right-10 text-white z-20">
              <h1 className="text-3xl  font-bold sm:text-5xl lg:text-6xl lg:leading-tight  ">숲 스테이 도천</h1>
              <h3 className="pt-3">
                <p>도천숲은 마을의 400년 역사와 함께해온 깊고 그윽한 분위기의 숲입니다. 아치 모양의 나무 다리를 건너면 삼림욕장에 온듯 상쾌란 숲 향기가 먼저 반겨줍니다. </p>
                <p className="pt-3">아름드리 나무 사이로 내놓은 길 따라 천천히 걷기 좋고 군데군데 쉴 수 있는 정자, 탁자, 벤치도 있습니다.  영덕은 '맑은공기 특별시'라 명명할 만큼 공기 질이 좋지만 특히 이곳 도천숲은 무성한 나무가 뿜어내는 피톤치드로 인해 금방 머리가 맑아지고 마음이 평화로워집니다.  숲 속의 다양한 수종에는 각각 이름표가 있기 때문에 나무 이름을 하나 하나 불러보며 걷는 즐거움도 있습니다.</p> 
              </h3>
              <button type="button" className="mt-3 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none">
                숲 빌리지 예약하기
              </button>
            </div>
            <div
              className="z-10"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 1)',
                opacity: 0.3,
                pointerEvents: 'none', // Ensure the overlay doesn't block interactions
              }}
            ></div>
          </div>

        </div>
        <div 
          ref={intro3Ref2}
          className="introduction3-2 cursor-pointer " 
          onMouseOver={(event : any)=>onSection3Hover(2)}
          onMouseLeave={(event : any)=>onLeave3Hover(2)}
        >
           <div className="hidden"> 
            <div className="w-1/2 absolute text-right top-40 right-10 text-white z-20">
              <h1 className="text-3xl  font-bold sm:text-5xl lg:text-6xl lg:leading-tight  ">숲 스테이 도천</h1>
              <h3 className="pt-3">
                <p>도천숲은 마을의 400년 역사와 함께해온 깊고 그윽한 분위기의 숲입니다. 아치 모양의 나무 다리를 건너면 삼림욕장에 온듯 상쾌란 숲 향기가 먼저 반겨줍니다. </p>
                <p className="pt-3">아름드리 나무 사이로 내놓은 길 따라 천천히 걷기 좋고 군데군데 쉴 수 있는 정자, 탁자, 벤치도 있습니다.  영덕은 '맑은공기 특별시'라 명명할 만큼 공기 질이 좋지만 특히 이곳 도천숲은 무성한 나무가 뿜어내는 피톤치드로 인해 금방 머리가 맑아지고 마음이 평화로워집니다.  숲 속의 다양한 수종에는 각각 이름표가 있기 때문에 나무 이름을 하나 하나 불러보며 걷는 즐거움도 있습니다.</p> 
              </h3>
              <button type="button" className="mt-3 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none">
                숲 빌리지 예약하기
              </button>
            </div>
            <div
              className="z-10"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 1)',
                opacity: 0.3,
                pointerEvents: 'none', // Ensure the overlay doesn't block interactions
              }}
            ></div>
          </div>
        </div>
      </ScrollOpacity>

    </div>

      
  )
}