"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { cafeService, soksoService } from "../../service";
import { Cafe } from "../../types/Types";
import MobileSlider from "../sokso/[parent]/[detailId]/MobileSlider";
import { CafeOption, CafeSection } from "../../lib/enums";
import { StringDivider } from "../../lib/const";
import { BreadCrumbs, Divider } from "@/components/ui";
import { ImagePopUp, OptionPills, PageHeader } from "@/components/layout";
import { BelowArrow } from "@/lib/svgs";
import { GrayRoundButton, IndigoRoundButton } from "@/components/ui/Button";
import { OpenWindow } from "@/lib/common";

// 숙소전체보기
export default function CafePage(){
    const router = useRouter();
    const [ cafeContent, setCafeContent ] = useState<Cafe[]>([]);
    const [ subTitle, setSubTitle ] = useState<string>("");
    const [ mainImgs, setMainImgs ] = useState<Cafe[]>([]);
    const [ menus, setMenus ] = useState<Cafe[]>([]);
    const [ specials, setSpecials ] = useState<Cafe[]>([]);
    const [ naverorderlink, setNaverorderlink ] = useState<string>("");

    const [ option, setOption ] = useState<CafeOption>(CafeOption.cafe);

    const [isModalOpen,setIsModalOpen] = useState<boolean>(false);

    // Create a ref for the slider container
  const sliderRef = useRef<HTMLDivElement>(null);

  // Desktop arrow handlers – they call scrollBy on the container
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -1000, // adjust as needed
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 1000, // adjust as needed
        behavior: "smooth",
      });
    }
  };

    useEffect(()=>{
        init();
    },[]);

    useEffect(()=>{
        console.log(cafeContent);
    });

    const init = () => {
        cafeService.getAll().then(response => {
            console.log(response);
            setCafeContent(response);

            //set sub title
            let temp : any = response.filter((content : Cafe) => content.section==CafeSection.subTitle);
            console.log("cafe subtitle : ", temp);
            if(temp.length > 0){
                setSubTitle(temp[0].content);
            }
            
            //set main imgs
            temp = response.filter((content : Cafe) => content.section==CafeSection.mainImgs);
            if(temp.length > 0){
                setMainImgs(temp);
                console.log("mainImgs : ", temp);
            }

            //set menus
            temp = response.filter((content : Cafe) => content.section==CafeSection.menus);
            if(temp.length > 0){
                setMenus(temp);
            }

            //set specials
            temp = response.filter((content : Cafe) => content.section==CafeSection.specials);
            if(temp.length > 0){
                setSpecials(temp);
            }

            //set naver order link
            temp = response.filter((content : Cafe) => content.section==CafeSection.naverorderlink);
            if(temp.length > 0){
                setNaverorderlink(temp[0].content);
            }
        });
    }
    
    return (
        <div className="border-0 border-0-red-700 " >
            {/* Header */}
            <PageHeader src={"/images/cafe/11.jpeg"} title={"카페"} subTitle={subTitle} alt={"cafe-header"} />

            {/* stay list md:mt-0 mx-8 my-10  md:mx-auto */}
            <div className="py-20 flex flex-col items-center justify-center border-0 border-red-500">

                {/* logo and introduction */}
                <div className="container mx-auto  flex flex-col text-center justify-center items-center space-y-3">
                   <div className="text-xl">조이풀빌리지</div>
                   <Image width={300} height={80} src={"/images/system/logo_cafe.png"} alt={"cafe-dochen-logo"} />
                   <div className="text-xl pt-8">
                    {subTitle}
                   </div>
                </div>

                {/* cafe images */}
                <div className="relative mt-20 ">
                    {/* Desktop Arrow Buttons – hidden on mobile */}
                    <button
                        className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
                        onClick={handlePrev}
                        aria-label="Previous"
                    >
                        <svg width="43" height="43" viewBox="0 0 43 43" fill="none"  xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.5))" }}>
                        <path d="M25.5 9.5L13 22L25.5 34.5" stroke="#fff" strokeWidth={5} />
                        </svg>
                    </button>
                    <button
                        className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
                        onClick={handleNext}
                        aria-label="Next"
                    >
                        <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.5))" }}>
                        <path d="M17.5 33.5L30 21L17.5 8.5" stroke="#fff" strokeWidth={5} />
                        </svg>
                    </button>

                    {/* Image slider container */}
                    <div
                        ref={sliderRef}
                        className="flex w-full h-96 space-x-3 overflow-x-hidden scroll-smooth overflow-hidden"
                    >
                        {mainImgs.map((d : Cafe, index : number) => (
                            <Image key={`cafe-image-${index}`} width={600} height={400} className="object-cover" src={d.img} alt="" />
                        ))}
                    </div>
                    </div>

                {/* menus */}
                <div className="container mx-auto mt-20 border-0 border-red-500">
                    <div className=" grid gird-cols-1 justify-center md:grid-cols-3 gap-12 border-0 border-gray-600">
                        <div className="w-[390px] border-0 border-gray-600 overflow-hidden ">
                            <div className="relative w-[390px] h-[270px] border border-gray-600 overflow-hidden">
                                <Image 
                                    src="/images/system/menu.png"  
                                    alt="cafe-menu"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="border-0 border-red-500 cursor-pointer duration-1000 transition-all ease-in-out hover:scale-105 hover:opacity-50"
                                    onClick={() => setIsModalOpen(true)}
                                />
                            </div>
                            <div className="text-3xl font-bold font-pretendard text-joyful-indigo mt-5">
                                카페 도천의 메뉴
                            </div>
                            <div className="mt-5 md:mtmt-10 text-joyful-indigo text-sm">
                                카페 도천만의 메뉴를 확인해 보세요.
                            </div>
                        </div>
                        {specials.map((special : Cafe, index : number) => (
                            <div  className="w-[390px]"  key={`cafe-special-${index}`}>
                                <div className="relative w-[390px] h-[270px] border-0 border-gray-600 overflow-hidden">
                                <Image style={{ objectFit: "cover" }} src={special.img ?? ''} fill alt="cafe-signature" className="border-0 border-red-500" />
                                </div>
                                <div className="text-3xl font-bold font-pretendard text-joyful-indigo mt-5">
                                    {special.note}
                                </div>
                                <div className="mt-5 md:mtmt-10 text-joyful-indigo text-sm">
                                    {special.content}
                                </div>
                            </div>
                        ))}
                        
                        {/* <div  className="w-[390px]">
                            <Image src="/images/cafe/signature.jpeg" width={390} height={270} alt="cafe-signature" />
                            <div className="text-3xl font-bold font-pretendard text-joyful-indigo mt-10">
                                대추꿀생강청
                            </div>
                            <div className="mt-10 text-joyful-indigo text-sm">
                            카페 도천에서는 매 시즌마다 특별한 수제청을 선보입니다. 100% 자연 재료로 정성껏 만든 수제청, 도천에서만 느낄 수 있는 특별한 맛을 경험해 보세요.
                            이번 시즌의 수제청은 ‘대추꿀생강청’입니다. 대추의 달콤함과 생강의 매운맛, 꿀의 부드러움이 어우러져 건강하고 따뜻한 맛을 전해줍니다.
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* arrows */}
                <div className="flex flex-col space-y-3 mt-20">
                    <BelowArrow />
                    <BelowArrow />
                    <BelowArrow />
                </div>
                
                {/* go to naver */}
                <IndigoRoundButton className="mt-10" btnName={"네이버 주문"} onClickFunction={()=>OpenWindow(naverorderlink)} />


                 {/* Modal overlay for expanded image slider */}
                {isModalOpen && <ImagePopUp images={["/images/system/menu.png"]} onCloseModal={()=>setIsModalOpen(false)} />}
            
                 
{/* 
                 <div className="min-h-[38rem] mt-14 md:mt-28">
                     <div className="flex flex-col items-center space-y-6">
                         { mainImgs.length > 0 && 
                        mainImgs.map((src : string, index : number)=>
                            <Image key={`cafe_image_${index}`} alt={`cafe_image_${index}`} src={"/images/"+src} width={1000} height={652} />)
                     }
                </div> 

                

                
             
                
            </div> */}         
            </div>
        </div>
        // <div className="relative flex flex-col my-16 mx-12 md:mx-44 md:my-32 md:flex md:justify-between ">
        //     {/* head breadcrumble */}
        //     <BreadCrumbs crumbs={[{title:'카페',link:'/cafe'}]} />

        //     {/* title */}
        //     <div className="flex w-full text-center justify-center content-center">
        //         <p className="text-3xl font-bold">카페도천</p>
        //     </div>

        //     {/* sub title */}
        //     <p className="mt-20 flex text-center justify-center">
        //         { cafeContent.length > 0 && cafeContent.filter((content : Cafe) => content.section==CafeSection.subTitle)[0]?.content}
        //     </p>

        //     <div className="min-h-[38rem] mt-14 md:mt-28">
        //         {/* images */}
        //         <div className="flex flex-col items-center space-y-6">
        //             { mainImgs.length > 0 && 
        //                 mainImgs.map((src : string, index : number)=>
        //                     <Image key={`cafe_image_${index}`} alt={`cafe_image_${index}`} src={"/images/"+src} width={1000} height={652} />)
        //              }
        //         </div>

        //         {/* menus */}
        //         <div className="mt-14 md:mt-28">
        //             <p className="flex text-center justify-center text-2xl font-bold">카페도천 메뉴</p>
        //             <p className="mt-6">*카페도천만의 추천메뉴입니다.</p>
        //             <div className="grid grid-cols-1 grid-rows-1 gap-x-4 gap-y-20 md:grid-cols-2 md:grid-rows-2 mt-12">
        //                 {menus.map( (menu : Cafe, index : number)=>
        //                     <div key={`cafe_menu_${index}`}>
        //                         <p className="flex text-center justify-center text-xl">{menu.note?.toUpperCase()}</p>
        //                         <div className="mt-5">
        //                             { menu.img && menu.img.length > 0 && <MobileSlider images={menu.img}  autoPlay={false} /> }
        //                         </div>
        //                         <p className="mt-6">
        //                             {menu.content}
        //                         </p>
        //                     </div>
        //                 )}
        //             </div>
        //         </div>

        //         {/* special menus */}
        //         { specials && specials.length > 0 &&
        //             specials.map((special : Cafe, index : number)=>
        //                 <div className="mt-14 md:mt-28"  key={`cafe_special_${index}`}>
        //                     <p className="flex text-center justify-center text-2xl font-bold">{special.note}</p>
        //                     <p className="mt-6">{special.content?.split(StringDivider)[0]}</p>
        //                     <div className="flex flex-col items-center w-full">
        //                         { special.img && <Image alt="카페이미지3" src={"/images/"+special.img[0]} width={1000} height={652} className="mt-5" /> }
        //                     </div>
        //                     <p className="mt-7">{special.content?.split(StringDivider)[1]}</p>
        //                 </div>
        //             )
        //         }

        //         <div className=" mt-14 md:mt-28 flex justify-center text-center ">
        //             <div className="w-full h-32 border-0 border-0-red-600">
        //                 <p className="text-2xl mt-3">이쪽에 전화번호 연결 부분이 들어가는게 어떨지?</p>
        //             </div>
        //         </div>
             
                
        //     </div>
        // </div>
    )
}