"use client"

import Image from "next/image"
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { cafeService, soksoService } from "../../service";
import { Cafe } from "../../types/Types";
import MobileSlider from "../sokso/[parent]/[detailId]/MobileSlider";
import { CafeSection } from "../../lib/enums";
import { StringDivider } from "../../lib/const";
import { BreadCrumbs } from "@/components/ui";

// 숙소전체보기
export default function CafePage(){
    const router = useRouter();
    const [ cafeContent, setCafeContent ] = useState<Cafe[]>([]);
    const [ mainImgs, setMainImgs ] = useState<string[]>([]);
    const [ menus, setMenus ] = useState<Cafe[]>([]);
    const [ specials, setSpecials ] = useState<Cafe[]>([]);

    useEffect(()=>{
        init();
    },[]);

    useEffect(()=>{
        console.log(cafeContent);
    });

    const init = () => {
        cafeService.getAll().then(response => {
            setCafeContent(response);
            
            //set main imgs
            let temp : any = response.filter((content : Cafe) => content.section==CafeSection.mainImgs);
            if(temp.length > 0 && temp[0].img){
                setMainImgs(temp[0].img);
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
                console.log("special",temp)
            }
        });
    }
    
    return (
        <div className="relative flex flex-col my-16 mx-12 md:mx-44 md:my-32 md:flex md:justify-between ">
            {/* head breadcrumble */}
            <BreadCrumbs crumbs={[{title:'카페',link:'/cafe'}]} />

            {/* title */}
            <div className="flex w-full text-center justify-center content-center">
                <p className="text-3xl font-bold">카페도천</p>
            </div>

            {/* sub title */}
            <p className="mt-20 flex text-center justify-center">
                { cafeContent.length > 0 && cafeContent.filter((content : Cafe) => content.section==CafeSection.subTitle)[0]?.content}
            </p>

            <div className="min-h-[38rem] mt-14 md:mt-28">
                {/* images */}
                <div className="flex flex-col items-center space-y-6">
                    { mainImgs.length > 0 && 
                        mainImgs.map((src : string, index : number)=>
                            <Image key={`cafe_image_${index}`} alt={`cafe_image_${index}`} src={"/images/"+src} width={1000} height={652} />)
                     }
                </div>

                {/* menus */}
                <div className="mt-14 md:mt-28">
                    <p className="flex text-center justify-center text-2xl font-bold">카페도천 메뉴</p>
                    <p className="mt-6">*카페도천만의 추천메뉴입니다.</p>
                    <div className="grid grid-cols-1 grid-rows-1 gap-x-4 gap-y-20 md:grid-cols-2 md:grid-rows-2 mt-12">
                        {menus.map( (menu : Cafe, index : number)=>
                            <div key={`cafe_menu_${index}`}>
                                <p className="flex text-center justify-center text-xl">{menu.note?.toUpperCase()}</p>
                                <div className="mt-5">
                                    { menu.img && menu.img.length > 0 && <MobileSlider images={menu.img}  autoPlay={false} /> }
                                </div>
                                <p className="mt-6">
                                    {menu.content}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* special menus */}
                { specials && specials.length > 0 &&
                    specials.map((special : Cafe, index : number)=>
                        <div className="mt-14 md:mt-28"  key={`cafe_special_${index}`}>
                            <p className="flex text-center justify-center text-2xl font-bold">{special.note}</p>
                            <p className="mt-6">{special.content?.split(StringDivider)[0]}</p>
                            <div className="flex flex-col items-center w-full">
                                { special.img && <Image alt="카페이미지3" src={"/images/"+special.img[0]} width={1000} height={652} className="mt-5" /> }
                            </div>
                            <p className="mt-7">{special.content?.split(StringDivider)[1]}</p>
                        </div>
                    )
                }

                <div className=" mt-14 md:mt-28 flex justify-center text-center ">
                    <div className="w-full h-32 border border-red-600">
                        <p className="text-2xl mt-3">이쪽에 전화번호 연결 부분이 들어가는게 어떨지?</p>
                    </div>
                </div>
             
                
            </div>
        </div>
    )
}