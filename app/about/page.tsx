"use client"

import Image from 'next/image';
import { EnglishLogo } from '@/lib/svgs';
import { OpenWindow } from '@/lib/common';
import { InstagramJoyfulLink, InstagramSoopStayLink, InstgramCafeDocehnLink } from '@/lib/const';

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
}) => <div className='flex flex-col lg:flex-row justify-center border-0 border-0-red-700 p-5 space-y-3 md:space-x-3 md:pb-3 ' >
    <Image src={`${imgSrc}`} alt="about-soop" layout="intrinsic" width={992} height={334} style={{maxHeight:"600px", objectFit:"cover"}} />
    <div className='flex flex-col justify-between'>
        <div>
            <p className="text-2xl md:text-3xl font-bold font-pretendard" >{title}</p>
            <p className="text-base font-bold mt-2 md:mt-6 font-pretendard">{address}</p>
            <div className="text-sm/7 mt-7 md:mt-14"  dangerouslySetInnerHTML={{ __html: description }}>
            </div>
        </div>

        <div className='flex flex-row space-x-3 mt-3 lg:mt-0 font-pretendard'>
            <div className="w-4 h-4">
                <a className="inline-flex cursor-pointer justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border-0 border-0-transparent bg-point-hover-rm focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none" >
                    <svg className="shrink-0 size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
                    </svg>
                </a>
            </div>
            <span className='cursor-pointer' onClick={() => OpenWindow(instagramLink)}>@{instagramId}</span>
        </div>
        
    </div>
</div>

const About = () => {
    return(
        <div className="container mx-auto flex flex-col py-14 border-0 border-0-red-700 md:mt-20 lg:mt-44 space-y-16 md:space-y-32" style={{color:"#4B5A62"}}>

            {/* Header Container */}
            <div className='flex flex-col lg:flex-row justify-center border-0 border-0-red-700 space-y-3 md:space-x-3 space-x-3 p-5 md:pb-3'>
                <Image src="/images/illustrator.png" alt="about-illustrator" layout="intrinsic" width={992} height={334} objectFit="cover" />
                <div className='flex flex-col justify-between '>
                    <div>
                        <div className='hidden md:block'>
                            <EnglishLogo />
                        </div>
                        <div className='block md:hidden'>
                            <EnglishLogo width={150} height={30}/>
                        </div>
                        <p className="text-base font-bold mt-2 md:mt-6 font-pretendard">영덕군 남정면 산정로 320</p>
                        <p className="text-sm/7 mt-7 md:mt-14">
                            조이풀빌리지는 1994년 폐교된 도천초등학교를 <br/>
                            리모델링하여 탄생한 문화예술 복합공간입니다.<br/>
                            이곳은 자연 속에서 온전한 쉼과 회복을 <br/>
                            경험할 수 있는 특별한 장소로 세 가지의 <br/>
                            주요 공간으로 이루어져 있습니다.
                        </p>
                    </div>

                    <div className='flex flex-row space-x-3 mt-3 lg:mt-0 font-pretendard'>
                        <div className="w-4 h-4">
                            <a className="inline-flex cursor-pointer justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border-0 border-0-transparent bg-point-hover-rm focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none" >
                                <svg className="shrink-0 size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
                                </svg>
                            </a>
                        </div>
                        <span className='cursor-pointer' onClick={() => OpenWindow(InstagramJoyfulLink)}>@joyvil_company</span>
                    </div>
                    
                </div>
            </div>
            
            <AboutContainer 
                imgSrc={'/images/soop/1.jpg'} 
                title={'숲스테이도천'} 
                address={'영덕군 남정면 산정로 320'} 
                description={`
                    숲스테이 도천'은 조이풀 빌리지 건너편 도천숲에<br/>
                    위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는<br/>
                    숙소입니다. 숲의 고요함과 맑은 공기를 느끼며,<br/>
                    일상에서 벗어나 완전한 휴식을 경험할 수 있습니다.
                `}
                instagramId={'forest_stay_docheon'} 
                instagramLink={InstagramSoopStayLink}
            />

            <AboutContainer 
                imgSrc={'/images/book/1.jpeg'} 
                title={'북스테이도천'} 
                address={'영덕군 남정면 산정로 320 1F'} 
                description={`
                    북스테이 도천'은 조이풀빌리지 1층에<br/>
                    위치해있으며 미디어를 잠시 멀리하며<br/>
                    책을 읽고 휴식을 즐길 수 있는 공간입니다.<br/>
                    자연과 책이 조화를 이루는 이곳에서 마음의<br/>
                    평온을 찾고, 독서의 즐거움을 만끽할 수 있습니다.
                `}
                instagramId={'joyvil_company'}
                instagramLink={InstagramJoyfulLink}
            />


            <AboutContainer 
                imgSrc={'/images/cafe/11.jpeg'} 
                title={'카페도천'} 
                address={'영덕군 남정면 산정로 320 2F'} 
                description={`
                    '카페 도천'은 조이풀빌리지 2층에 위치하여<br/>
                    산과 들의 아름다운 풍경을 바라보며 차와 브런치를<br/>
                    즐길 수 있는 공간입니다.
                `}
                instagramId={'cafe.dochen'} 
                instagramLink={InstgramCafeDocehnLink} />
        </div>
    );
}

export default About;