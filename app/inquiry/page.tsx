"use client"
import { useEffect, useState } from "react"
import { GetQnaData } from "../_api/Qna";
import { AxiosResponse } from "../../lib/enums";
import { GetKakao } from "../_api/Biz";

declare global {
    interface Window {
        kakao: any;
    }
  }


export default function Inquiry(){

    const [qnaList, setQnaList ] = useState<any>([]);
    const [addressText, setAddressText ] = useState<string>("");
    const [openAnswerDiv, setOpenAnswerDiv] = useState<boolean[]>(
        qnaList.map(() => false)
      );
    

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
                let openDiv : boolean[] = [true];

                for(i=1;i<response.data.length;i++){
                    openDiv.push(false);
                }

                setOpenAnswerDiv(openDiv);
            }
        });
    }

    const onClickQuestion = (index: number) => {
        // Create a new array where only the clicked index is true, others false.
        const newOpenAnswerDiv = openAnswerDiv.map((_, i) => i === index);
        setOpenAnswerDiv(newOpenAnswerDiv);
      };
    
    

    return(
        <div className="bg-point text-point">
            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="flex-col flex">

                    <div className="h-min-[64px] mt-8  mx-12 md:mt-16 md:mx-28">
                        <h2 className="text-xl font-bold md:text-4xl md:leading-tight ">오시는 길</h2>
                        <span className={`block text-sm mt-4 md:text-base`}>
                            {addressText}</span>
                        <div id="map" className="border-point mt-3" style={{ width: "100%", height: "400px" }}>Kakao Map</div>
                    </div>

                    <div className=" mt-16  mx-12 md:mx-28">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold md:text-4xl md:leading-tight ">자주 묻는 질문</h2>
                            <div >
                                {
                                    // transition-all duration-500 ease-in-out
                                    qnaList.map((qna : any, index : number) => {
                                        return(
                                            <div key={index} className="flex flex-col my-5 py-5 border-b border-b-gray-300 space-y-3">
                                                <div
                                                    className="text-lg font-bold flex flex-row justify-between cursor-pointer"
                                                    onClick={() => onClickQuestion(index)}
                                                > 
                                                    <div>Q. {qna.question}</div>
                                                    <div>{openAnswerDiv[index] ? "-" : "+"}</div>
                                                </div>
                                                <div
                                                    className={`overflow-hidden  ${
                                                    openAnswerDiv[index] ? "max-h-96" : "max-h-0"
                                                    }`}
                                                >
                                                    <div className="pt-2">A. {qna.answer}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                
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