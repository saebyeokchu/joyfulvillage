"use client"
import { NaverBookingLink } from "@/app/_data/Const";
import { Soops } from "@/app/_data/Room";
import { useParams, useSearchParams  } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import Image from 'next/image'

function DetailContent() {
    const searchParams = useSearchParams();
 
    const roomId = searchParams.get('roomId');
    const [info, setInfo] = useState<any>(null);
  
    const topImageLayout = [
      'row-span-2 grid-cols-1',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1'
    ]
  
      useEffect(()=>{
          //인덱스로 정보불러오기
          if(roomId){
              const info = Soops.find(e=>e.id==parseInt(roomId));
              setInfo(info);
          }
      },[])
  
      // const scrollLeft = () => {
      //     if (scrollRef.current) {
      //       scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
      //     }
      //   };
      
      //   const scrollRight = () => {
      //     if (scrollRef.current) {
      //       scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
      //     }
      //   };
  
      return(
          info != null ? <div className="relative flex flex-col py-32 w-full md:flex md:justify-between ">
                  {/* head breadcrumble */}
                  <ol className="flex items-center whitespace-nowrap px-16">
                      <li className="inline-flex items-center">
                          <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="/lodging">
                          숙소
                          </a>
                          <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m9 18 6-6-6-6"></path>
                          </svg>
                          <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="/lodging/soop">
                          숲스테이도천
                          </a>
                          <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m9 18 6-6-6-6"></path>
                          </svg>
                          <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="#">
                          {info && info.title}
                          </a>
                      </li>
                  </ol>
                  
                  {/* title */}
                  <nav className="flex px-3 justify-center text-center  py-5 align-middle">
                      <h1 className="text-3xl font-bold">{info && info.title}</h1>
                  </nav>
                  
                  {/* 대표 사진 부분  */}
                  <div className="grid grid-cols-2 grid-rows-2 mt-9" style={{height:'500px'}}>
                      { info && [0,1,2].map(index => {
                          return(
                          <div key={`main-image-${index}`} className={`${topImageLayout[index]}`} >
                              <img  src={`${info.topImages[index]}`} className="object-cover w-full h-full" />
                          </div>
                          )
                      })}
                  </div>
                      
  
                  {/* 소개글 부분 */}
                  <div className="grid grid-flow-row-dense grid-cols-3 px-16 mt-20">
  
                      <div className="flex flex-col col-span-2 p-5">
                          <div >
                              <h1 className="text-xl font-bold">{info.title}</h1>
                              <p className="mt-2">
                                  기준 2인 (최대 5인) 독채 (원룸형, 침대1, 욕실1)
                              </p>
                              <p className="mt-2">
                                  천연기념물 '도천숲'에 위치한 독채 형태의 방갈로 숙소입니다.
                                  <br />
                                  바쁜 일상에서 벗어나 자연이 주는 기운과 평온함을 누리시길 바랍니다.
                              </p>
                          </div>
                          <div className="flex flex-row mt-14 space-x-16">
                              <div className="  ">
                                  <p>[객실 안내]</p>
                                  <br />
                                  <ul>
                                      <li>&lt;입실 및 퇴실&gt;</li>
                                      <li>- 15:00 입실 / 11:00 퇴실</li>
                                      <li>- 청소 및 원활한 운영을 위해 퇴실 시간을 지켜주세요</li>
                                  </ul>
                                  <br />
                                  <ul>
                                      <li>&lt;숙박 인원&gt;</li>
                                      <li>- 2인 기준 최대 5인</li>
                                      <li>- 추가 1인 당 1만원(침구류 제공)</li>
                                      <li>- 36개월 미만 무료 </li>
                                  </ul>
                                  <br />
                                  <ul>
                                      <li>&lt;추가 서비스&gt;</li>
                                      <li>- 바베큐 그릴 대여 : 2만원</li>
                                      <li>- 수영장 : 인당 5천원 (선착순 예약, 최대 15인 이용)</li>
                                  </ul>
                              </div>
                              <div className="pt-12">
                                  <ul>
                                      <li>&lt;구비시설&gt;</li>
                                      <li>- 퀸사이즈 침대, 2인 쇼파</li>
                                      <li>- 아일랜드 식탁, 스툴 4</li>
                                      <li>- 냉장고, 인덕션, 전자레인지, 전기포트, 토스터기 </li>
                                      <li>- 조리도구, 식기 </li>
                                  </ul>
                                  <br />
                                  <ul>
                                      <li>&lt;기본 제공 서비스&gt;</li>
                                      <li>- 비누</li>
                                      <li>- 바디워시 </li>
                                      <li>- 타올 </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                      
                      {/* 예약 링크 연결 */}
                      <div className="flex flex-col rounded-2xl w-72 h-fit" style={{border:"0.719px solid #746E60"}}> 
                          <span className="text-xl py-5 px-6 font-bold">130,000 ~ 150,000원</span>
                          <div
                              className="w-64 mx-auto" 
                              style={{
                                  height: "0.719px",
                                  backgroundColor: "#746E60"
                              }}
                          />
                          <a href={NaverBookingLink} className="mx-auto ">
                              <button type="button" className="rounded-xl text-white h-12 w-64 my-5" style={{backgroundColor:'#6E8653'}}>
                                  예약
                              </button>
                          </a>
                      </div>
                  </div>
  
                  <div className=" mt-32 mx-16"  style={{
                      height: "0.719px",
                      backgroundColor: "#746E60"
                  }}></div>
  
                  {/* 전체 사진 나열 부분 */}
                  <div className="mt-16 mx-16">
                      {info.contentImages.map((src : string, index : number) => <img key={`full-img-${index}`} src={src} alt={""} className="w-full h-auto mt-5"/>)}
                  </div>
              </div> : <div>loading ...</div> 
      )
}

export default function LoadgingSoopDetail() {
  return(
    <Suspense>
        <DetailContent />
    </Suspense>
  )
}