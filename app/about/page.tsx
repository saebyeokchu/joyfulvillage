"use client"

import Image from 'next/image';
import { DochenIllustration, DochenIllustrationFlex, EnglishLogo } from '@/lib/svgs';
import { OpenWindow } from '@/lib/common';
import { imgAddress, InstagramJoyfulLink, InstagramSoopStayLink, InstgramCafeDocehnLink } from '@/lib/const';
import { AboutSection } from '@/lib/enums';
import { Abouts } from '@/lib/tempData';
import { AboutType } from '@/types/About';
import { GetAllAbout } from '@/lib/url';
import { getFetcher } from '@/lib/fetcher';
import { PageHeader, SomeErrorPage } from '@/components/layout';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

const AboutContainer = ({
    imgSrc,
    title,
    address,
    description,
    instagramId,
    instagramLink
}:{
    imgSrc : string,
    title : string,
    address : string,
    description : string,
    instagramId : string,
    instagramLink : string
}) => <div className='flex flex-col lg:flex-row justify-center  space-y-5 md:space-y-0 md:space-x-5 md:pb-3 border-0 border-red-500' >
     { title  =="joyful" ?
        <>
            <div className='hidden md:block' >
                <DochenIllustration width={936} height={590} />
            </div>
            <div className='block md:hidden' >
                <DochenIllustrationFlex />
            </div>
        </>
        :
        <Image 
        loader={() => imgAddress+imgSrc}
        src={imgAddress + imgSrc} 
        alt="about-soop" 
        layout="intrinsic" 
        width={936} height={590} 
        style={{maxHeight:"600px", objectFit:"cover"}} /> }
    <div className='flex flex-col justify-between border-0 border-red-500 '>
        <div>
            { title =="joyful" ?
                <>
                    <div className='hidden md:block'>
                        <EnglishLogo />
                    </div>
                    <div className='block md:hidden'>
                        <EnglishLogo width={150} height={30}/>
                    </div>
                </> :  <p className="text-2xl md:text-[32px] font-bold " >{title}</p> }
            <p className="text-base font-normal mt-2 md:mt-4 ">{address}</p>
            <div className="text-base/7 mt-7 md:mt-24" style={{wordBreak:'keep-all'}}>
                {description}
            </div>
        </div>

        <div className='flex flex-row space-x-3 mt-3 font-bold lg:mt-0 font-pretendard min-h'>
            {/* <div className="w-4 h-4">
                <a className="inline-flex cursor-pointer justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border-0 border-0-transparent bg-point-hover-rm focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none" >
                    <svg className="shrink-0 size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
                    </svg>
                </a>
            </div> */}
            <span className='cursor-pointer text-base' onClick={() => OpenWindow(instagramLink)}>@{instagramId}</span>
        </div>
        
    </div>
</div>

const About = () => {
    const router = useRouter();
    
    const { data, error, mutate  } = useSWR<AboutType[]>(
        GetAllAbout,
        getFetcher
    );


    if (error) {
        return (
            <SomeErrorPage onClickFunction={() => router.push("/")} error={error.message} />
        );
    }

    return(
        <>
        <div className="container mx-auto px-5 md:px-14 py-24 md:py-52 flex flex-col border-0 border-0-red-700 space-y-16 md:space-y-32 min-h-[2160px]" style={{color:"#4B5A62"}}>
            { data && data.map((about : AboutType, index : number)=>(
                 <AboutContainer 
                    key={`about-container-${index}`}
                    imgSrc={about.imgSrc}
                    title={about.title}
                    address={about.address}
                    description={about.content}
                    instagramId={about.InstagramId}
                    instagramLink={about.InstagramLink} 
                />
            )) }
        </div>
        </>
    );
}

export default About;