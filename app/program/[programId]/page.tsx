"use client"
import DOMPurify from 'dompurify';

import { useParams, useRouter, useSearchParams  } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Program } from "@/types/Types";
import { useProgramContext } from '@/context/ProgramContext';
import { BreadCrumbs } from '@/components/ui';
import { Loading, PageHeader } from '@/components/layout';
import { IndigoRoundButton } from '@/components/ui/Button';
import { imgAddress } from '@/lib/const';

interface Props {
    htmlString: string;
  }
  

function DetailContent() {
    const params = useParams();
    const programContext = useProgramContext();
    const router = useRouter();
    
    const { programId } = params;
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
          window.scrollTo(0, 0);
          //내용 parse하기
        }
      },[])
  
    const handleReturnClick = useCallback(() => {
        router.push(`/program`);
    },[router]);
    
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

      if(!programId) {
        return <div className='h-screen'><Loading /></div>
      }
  
      return(
        info && 
          <div className="border-0 border-0-red-700 " >
            
              {/* head breadcrumble */}
              {/* <BreadCrumbs crumbs={[{title:'프로그램',link:'/program'}, {title:info.name,link:'/program'}]} /> */}
            {/* Header */}
            <PageHeader src={imgAddress + info.img} title={info.name} subTitle1={info.subName} alt={"program-detail-header"} />
              
            {/* title */}
            {/* <nav className="flex flex-col justify-center align-middle">
              <p className="text-3xl font-bold text-center">{info && info.name}</p>
              <p className="mt-7 md:mt-32">{info && info.subName}</p>
            </nav> */}

            {/* content */}
            <div className="container py-24 px-5 md:px-14 md:mx-auto ">
              <div className='flex flex-row justify-center'>
                <div
                  className='pt-3'
                    dangerouslySetInnerHTML={{ __html: info.content }}
                />
              </div>
              {/* width="560" height="315" */}
              <div className='flex justify-center py-24'>
                { info.name.includes('숲 N멍') &&
                  <iframe className='w-full h-[315px] md:h-[720px]' src="https://www.youtube.com/embed/m7tHzK52bk8?si=hlkeLtU-i5deVE6c&amp;controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                }
              </div>


              {/* return button */}
              <div className="mt-10 flex justify-end border-0 border-0-red-400 max-w-[85rem] mx-8 md:mx-auto">
                  <IndigoRoundButton btnName={"목록으로"} onClickFunction={handleReturnClick}/>
              </div>
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



