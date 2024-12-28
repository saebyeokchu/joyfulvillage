
export default function Home(){
    return (
        <div className="flex flex-col bg-point">
            {/* main image */}
            <div className="relative ">
                <img src='/outside/drone-outside.jpg' alt={""} className="h-auto max-w-full" />
                <img src='/system/landing-1.png' alt={""} className="h-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" width={362} />
            </div>
            {/* introduction */}
            <div className="my-80 mx-56 text-center ">
                <img src='/system/landing-2.png' alt={""} className="h-auto text-sm" width={1076} />
                <div className="pt-6">
                    <p>
                        조이풀빌리지는 <strong>1994년 폐교된 도천초등학교</strong>를 리모델링하여 탄생한 
                        <strong>문화예술 복합공간</strong>입니다.
                    </p>
                    <p>
                        이곳은 자연 속에서 온전한 쉼과 회복을 경험할 수 있는 특별한 장소로
                        세 가지의 주요 공간으로 이루어져 있습니다.
                    </p>
                </div>
            </div>
            {/* spaces */}
            <div className="flex flex-col text-center text-point mx-56 ">
                <div className="mb-80 ">
                    <p className="font-bold">'숲스테이도천'</p>
                    <img src='/soop/4.jpg' alt={""} className="h-auto max-w-full pt-7" />
                    <div className="pt-6 text-sm ">
                        <p>'숲스테이 도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.</p>
                        <p>숲의 고요함과 맑은 공기를 느끼며, 일상에서 벗어나 완전한 휴식을 경험할 수 있습니다.</p>
                    </div>
                </div>
                <div className="mb-80 ">
                    <p className="font-bold">'북스테이도천'</p>
                    <img src='/book/5.jpeg' alt={""} className="h-auto max-w-full pt-7" />
                    <div className="pt-6 text-sm ">
                        <p>'북스테이 도천'은 조이풀빌리지 1층에 위치해있으며 미디어를 잠시 멀리하며 책을 읽고 휴식을 즐길 수 있는 공간입니다.
                        자연과 책이 조화를 이루는 이곳에서 마음의 평온을 찾고, 독서의 즐거움을 만끽할 수 있습니다.
                        </p>
                    </div>
                </div>
                <div className="mb-80 ">
                    <p className="font-bold">'카페도천'</p>
                    <img src='/cafe/11.jpeg' alt={""} className="h-auto max-w-full pt-7" />
                    <div className="pt-6 text-sm ">
                        <p>''카페 도천'은 조이풀빌리지 2층에 위치하여 산과 들의 아름다운 풍경을 바라보며 차와 브런치를 즐길 수 있는 공간입니다.</p>
                    </div>
                </div>
            </div>
        </div>  
    )
}