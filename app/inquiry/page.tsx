"use client"
import { useEffect, useState } from "react"
import { AxiosResponse } from "../../lib/enums";
import { GetQnaData } from "@/api/Qna";
import { StayHeader } from "../stay/component";
import { GetKakao } from "@/api/Biz";
import { imgAddress } from "@/lib/const";
import { Loading, PageHeader } from "@/components/layout";
import { headerInfoService } from "@/service";

declare global {
    interface Window {
        kakao: any;
    }
  }

export default function Inquiry(){
    const [headerImgSrc, setHeaderImgSrc] = useState<string>("");

    const [qnaList, setQnaList ] = useState<any>([]);
    const [addressText, setAddressText ] = useState<string>("");
    const [openAnswerDiv, setOpenAnswerDiv] = useState<boolean[]>(
        qnaList.map(() => false)
      );
    
  const { headerInfo, isLoading, isError } = headerInfoService.GetById("inquiry");

    useEffect(() => {
        getKakaoInfo();
        getQnaList();
      }, []);

    const getKakaoInfo = async () => {
        await GetKakao().then(response => {
            if(response.status == AxiosResponse.Successful){
                const data = response.data[0];
                setAddressText(data.addressText);
                setKakaoMap(data);
            }
        });
    }

    const setKakaoMap = (data : any) => {
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
                      center: new window.kakao.maps.LatLng(data.latitude, data.longtitude),
                      level: 3,
                    }
              
                    new window.kakao.maps.Map(container, options)
                  })
            }
        }
      
        kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
    }

    const getQnaList = async () =>{
        await GetQnaData().then(response => {
            if(response.status == AxiosResponse.Successful){
                setQnaList(response.data);
                
                let i = 0;
                const openDiv : boolean[] = [false];

                for(i=1;i<response.data.length;i++){
                    openDiv.push(false);
                }

                setOpenAnswerDiv(openDiv);
            }
        });
    }

    const onClickQuestion = (index: number) => {
        // Create a new array where only the clicked index is true, others false.
        const newOpenAnswerDiv = openAnswerDiv.map((_, i) => !openAnswerDiv[index] && i === index);
        setOpenAnswerDiv(newOpenAnswerDiv);
      };

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


    

    return(
        <div className=" border-0 border-0-red-700 " >
            {/* Header */}
            <PageHeader
                src={imgAddress + headerImgSrc}
                title={""}
                subTitle1={headerInfo.introduction1}
                subTitle2={headerInfo.introduction2}
                alt={"inquiry-header"}
            />

            {/* inquiry list */}
            <div className="container pt-24 pb-[400px] px-10 md:px-8 md:mx-auto w-full border-0 border-0-purple-500 md:min-h-screen flex flex-col space-y-20 md:space-y-24 justify-center items-center text-center">
                <div className="w-full md:w-[810px] flex flex-col border-0 border-0-red-500"> 
                    <h2 className="font-bold text-xl md:leading-tight font-arita text-joyful-indigo">자주 묻는 질문</h2>
                    <div className="pt-16 flex flex-col space-y-10">
                            {
                            // transition-all duration-500 ease-in-out
                            qnaList.map((qna : any, index : number) => {
                                return(
                                    <div key={index} className=" border-0-b border-0-b-gray-300 ">
                                        <div
                                            className="text-lg flex flex-row justify-between cursor-pointer"
                                            onClick={() => onClickQuestion(index)}
                                        > 
                                            <div className="break-words text-sm">Q. {qna.question}</div>
                                            <div>{openAnswerDiv[index] ?
                                                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(180)" >
                                                    <path d="M0.215427 0.705986C-0.0718095 0.979698 -0.0718094 1.42099 0.215427 1.6947L5.08673 6.33661C5.31535 6.55446 5.68465 6.55446 5.91327 6.33661L10.7846 1.6947C11.0718 1.42099 11.0718 0.979697 10.7846 0.705986C10.4973 0.432275 10.0342 0.432275 9.747 0.705986L5.49707 4.7502L1.24714 0.700402C0.96576 0.432277 0.496802 0.432276 0.215427 0.705986Z" fill="#D6D6D6"/>
                                                </svg>
                                                :
                                                <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.215427 0.705986C-0.0718095 0.979698 -0.0718094 1.42099 0.215427 1.6947L5.08673 6.33661C5.31535 6.55446 5.68465 6.55446 5.91327 6.33661L10.7846 1.6947C11.0718 1.42099 11.0718 0.979697 10.7846 0.705986C10.4973 0.432275 10.0342 0.432275 9.747 0.705986L5.49707 4.7502L1.24714 0.700402C0.96576 0.432277 0.496802 0.432276 0.215427 0.705986Z" fill="#D6D6D6"/>
                                                </svg>
                                            }</div>
                                            

                                        </div>
                                        <div
                                            className={`flex text-start overflow-hidden text-sm  ${
                                            openAnswerDiv[index] ? "h-fit" : "h-0"
                                            }`}
                                        >
                                            <div className="pt-2 break-words">A. {qna.answer}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>

                <hr className="w-full md:w-[810px] h-1" style={{backgroundColor:"$E6E2D8"}}/>

                <div className="w-full md:w-[810px] h-min-[64px] ">
                        <h2 className="text-xl font-bold  md:leading-tight font-arita text-joyful-indigo">오시는 길</h2>
                        <span className={`block text-sm mt-4 md:text-base font-arita text-joyful-indigo`}>
                            {addressText}</span>
                       <div id="map" className="border-0-point mt-10" style={{ width: "100%", height: "400px" }}>Kakao Map</div>
                   </div>
                </div>
        </div>
    )
}