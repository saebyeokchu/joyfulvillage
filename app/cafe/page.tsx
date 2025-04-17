"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import { cafeService, headerInfoService, soksoService } from "../../service";
import { Cafe } from "../../types/Types";
import { CafeOption, CafeSection } from "../../lib/enums";
import { ImagePopUp, Loading, OptionPills, PageHeader } from "@/components/layout";
import { BelowArrow, CafeLogo, LeftArrow, RightArrow } from "@/lib/svgs";
import { imgAddress } from "@/lib/const";
import SectionSlider from "./component/SectionSlider";

const ImageTag = ({
    index,
    src,
    width = 810,
    height = 489
} : {
    index : number,
    src : string,
    width? : number ,
    height? : number ,
}) => (
    <Image //400 X 250
        key={`cafe-image-${index}`} 
        width={width} 
        height={height} 
        className="object-cover" 
        src={src} 
        loader={()=>src} 
        alt=""
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
        />
)

const FillImageTag = ({
    index,
    src,
} : {
    index : number,
    src : string,
}) => (
    <Image //400 X 250
        fill
        key={`cafe-image-${index}`} 
        className="object-cover" 
        src={src} 
        loader={()=>src} 
        alt=""
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
        />
)

// 숙소전체보기
export default function CafePage(){
    const [headerImgSrc, setHeaderImgSrc] = useState<string>("");
    const [ cafeContent, setCafeContent ] = useState<Cafe[]>([]);
    const [ mainImgs, setMainImgs ] = useState<Cafe[]>([]);
    const [ menus, setMenus ] = useState<Cafe[]>([]);
    const [ specials, setSpecials ] = useState<Cafe[]>([]);
    const [ coffee, setCoffee ] = useState<Cafe | null>(null);
    const [ nonCoffee, setNonCoffee ] = useState<Cafe | null>(null);
    const [ dessert, setDessert ] = useState<Cafe | null>(null);
    const [ tea, setTea ] = useState<Cafe | null>(null);

    // Create a ref for the slider container
  const sliderRef = useRef<HTMLDivElement>(null);

  const init = () => {
    cafeService.getAll().then(response => {
        console.log(response);
        setCafeContent(response);

        // //set sub title
        // let temp : any = response.filter((content : Cafe) => content.section==CafeSection.subTitle);
        // console.log("cafe subtitle : ", temp);
        // if(temp.length > 0){
        //     setSubTitle(temp[0].content);
        // }
        
        //set main imgs
        let temp = response.filter((content : Cafe) => content.section==CafeSection.mainImgs);
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
        console.log("specials", temp)
        }


         //set coffee
         temp = response.filter((content : Cafe) => content.section==CafeSection.coffee);
         if(temp.length > 0){
            setCoffee(temp[0]);
         }


         //set coffee
         temp = response.filter((content : Cafe) => content.section==CafeSection.noncoffee);
         if(temp.length > 0){
            setNonCoffee(temp[0]);
         }

         //set coffee
         temp = response.filter((content : Cafe) => content.section==CafeSection.dessert);
         if(temp.length > 0){
            setDessert(temp[0]);
         }

         //set tea
         temp = response.filter((content : Cafe) => content.section==CafeSection.tea);
         if(temp.length > 0){
            setTea(temp[0]);
         }
 

   
    });
}

  
  useEffect(()=>{
        init();
    },[]);


    const { headerInfo, isLoading, isError } = headerInfoService.GetById("cafe");

    useEffect(() => {
        if (headerInfo) {  
            if(headerInfo.imgSrc){
                setHeaderImgSrc(headerInfo.imgSrc);
            }
        }
    }, [headerInfo]);

    if (isLoading) {
        return (
            <div className="h-screen">
            <Loading />
            </div>
        );
        }
    
    
        
      if (!headerInfo ) {
        return (
          <div className="h-screen">
            {undefined}
          </div>
        );
      }
  
    
    return (
        <div className="border-0 border-0-red-700 " >
            {/* Header */}
            <PageHeader
                src={imgAddress + headerImgSrc}
                title={"카페도천"}
                subTitle1={headerInfo.introduction1}
                subTitle2={headerInfo.introduction2}
                alt={"cafe-header"}
            />
            
            {/* stay list md:mt-0 mx-8 my-10  md:mx-auto */}
            <div className="py-10 md:pt-24 md:pb-32 flex flex-col items-center justify-center border-0 border-red-500">

                {/* logo and introduction */}
                <div className="container flex flex-col text-center justify-center items-center space-y-3 px-5 md:mx-auto">
                   <div className="hidden md:block">
                        <CafeLogo width={300} height={80} />
                   </div>
                   <div className="block md:hidden">
                    <CafeLogo width={200} height={80} />
                   </div>
                   <div className="text-base md:text-xl md:pt-8">
                    {/* {subTitle} */}
                    <p>'카페 도천'은 조이풀빌리지 2층에 위치하여 산과 들의</p>
                    <p>아름다운 풍경을 바라보며 차와 브런치를 즐길 수 있는 공간입니다.</p>
                   </div>
                </div>

                <div className="flex flex-col px-5 space-y-7 mt-16 md:mt-20">
                    { mainImgs.map( (data : Cafe, index:number)  => data.img && <ImageTag key={`cafe-main-img-${index}`} index={0} src={imgAddress + data.img} /> ) }
                </div>

                {/* specials */}
                {specials.map((special : Cafe,index : number)=>
                    <div key={`cafe-special-div-${index}`} className="mt-16 md:mt-32 text-center border-0 border-red-500 place-items-center">
                        <div className="text-xl">
                            {special.note}
                        </div>
                        <div className="text-sm w-96 mt-4 border-0 border-red-500 break-words">
                            {/* 카페 도천에서는 매 시즌마다 특별한 수제청을 선보입니다. 100% 자연 재료로 정성껏 만든 수제청, 도천에서만 느낄 수 있는 특별한 맛을 경험해 보세요.
                            이번 시즌의 수제청은 ‘대추꿀생강청’ 입니다. 대추의 달콤함과 생강의 매운맛, 꿀의 부드러움이 어우러져 건강하고 따뜻한 맛을 전해줍니다. */}
                            {special.content}
                        </div>
                        <div className="flex flex-col space-y-7 mt-11 px-5">
                            <ImageTag index={index} src={imgAddress + special.img || "/images/cafe1.png"} />
                        </div>
                    </div>
                )}
                

                <div className="mt-16 md:mt-40 text-center border-0 border-red-500 place-items-center">
                    <div className="text-xl font-semibold">
                        카페도천의 메뉴
                    </div>
                    <div className="mt-12 border-0 border-red-500  px-5 md:px-0 grid grid-cols-1 md:grid-cols-2 md:grid-rows-1 md:gap-x-4 gap-y-16 md:gap-y-20 md:w-[800px]">
                        {coffee && <SectionSlider title={"COFFEE"} menus={coffee.content || ""} images={coffee.img?.split(";").map(e=>imgAddress+e) || ["/images/cafe-empty.png"]} />}
                        {nonCoffee && <SectionSlider title={"NON COFFEE"} menus={nonCoffee.content || ""} images={nonCoffee.img?.split(";").map(e=>imgAddress+e) || ["/images/cafe-empty.png"]}/>}
                        {dessert && <SectionSlider title={"BRUNCH & DESSERT"} menus={dessert.content || ""} images={dessert.img?.split(";").map(e=>imgAddress+e) || ["/images/cafe-empty.png"]} />}
                        {tea && <SectionSlider title={"TEA"} menus={tea.content || ""} images={tea.img?.split(";").map(e=>imgAddress+e) || ["/images/cafe-empty.png"]} />}
                    </div>
                </div>
            </div>
        </div>
        
    )
}