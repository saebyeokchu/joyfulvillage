"use client"
import DOMPurify from 'dompurify';

import { useParams, useSearchParams  } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useProgramContext } from "@/app/_context/ProgramContext";
import { Program } from "@/app/_data/Types";
import { BreadCrumbs } from "@/app/_component";

interface Props {
    htmlString: string;
  }
  

function DetailContent() {
    const params = useParams();
    const programContext = useProgramContext();
    
    const { id } = params;
    const [info, setInfo] = useState<Program | null>(null);

    // const programId = searchParams.get('programId');
    // const [info, setInfo] = useState<any>(null);
  
      useEffect(()=>{
        const info = programContext.currentProgram.getProgram();
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
        info && 
          <div className="relative flex flex-col my-16 mx-12 md:mx-44 md:my-32 md:flex md:justify-between ">
              {/* head breadcrumble */}
              <BreadCrumbs crumbs={[{title:'프로그램',link:'/program'}, {title:info.name,link:'/program'}]} />
  
              
              {/* title */}
              <nav className="flex flex-col justify-center align-middle">
                <p className="text-3xl font-bold text-center">{info && info.name}</p>
                <p className="mt-7 md:mt-32">{info && info.subName}</p>
              </nav>

              {/* content */}
              <div className="">
                <div
                    dangerouslySetInnerHTML={{ __html: info.content }}
                />
              </div>
          </div> 
      )
}

export default function ProgramDetail() {
  return(
    <Suspense>
        <DetailContent />
    </Suspense>
  )
}