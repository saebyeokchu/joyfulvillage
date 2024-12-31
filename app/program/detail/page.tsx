"use client"
import { NaverBookingLink } from "@/app/_data/Const";
import { Soops } from "@/app/_data/Room";
import { useParams, useSearchParams  } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import Image from 'next/image'
import { Programs } from "@/app/_data/Programs";
import DOMPurify from 'dompurify';

interface Props {
    htmlString: string;
  }
  

function DetailContent() {
    const searchParams = useSearchParams();
 
    const programId = searchParams.get('programId');
    const [info, setInfo] = useState<any>(null);
  
      useEffect(()=>{
          //인덱스로 정보불러오기
          if(programId){
              const info = Programs.find(e=>e.id==parseInt(programId));
              if(info){
                const htmlString = `<iframe 
                    src="https://www.youtube.com/embed/m7tHzK52bk8" 
                    width="600" 
                    height="400" 
                    frameborder="0" 
                    allow="autoplay; fullscreen"
                  ></iframe>`;
                const sanitizedHtml = DOMPurify.sanitize(info.content, {
                  ADD_TAGS: ['iframe'],
                  ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'src', 'style', 'width', 'height'],
                });
                info.content = sanitizedHtml;

                setInfo(info);
                //내용 parse하기
                
              }
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
                          <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="/program">
                          프로그램
                          </a>
                          <svg className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m9 18 6-6-6-6"></path>
                          </svg>
                          <a className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href="#">
                          {info && info.name}
                          </a>
                      </li>
                  </ol>
                  
                  {/* title */}
                  <nav className="flex flex-col px-3 justify-center text-center py-5 align-middle">
                    <p className="text-3xl font-bold">{info && info.name}</p>
                    <p className="mt-7">{info && info.subName}</p>
                  </nav>

                  {/* content */}
                  <div className="mx-44">
                    <div
                        dangerouslySetInnerHTML={{ __html: info.content }}
                    />
                  </div>
                  
              </div> : <div>loading ...</div> 
      )
}

export default function ProgramDetail() {
  return(
    <Suspense>
        <DetailContent />
    </Suspense>
  )
}