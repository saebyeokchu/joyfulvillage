import Image from "next/image"

// 숙소전체보기
export default function Program(){
    return (
        <div className="relative flex flex-col p-32 w-full mx-auto md:flex md:justify-between ">
            {/* title */}
            <div className="flex w-full text-center justify-center content-center">
                <p className="text-3xl font-bold">프로그램</p>
            </div>

            <div className="min-h-[38rem] mt-28">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="group flex flex-col h-full">
                        <Image className="mt-3 h-40 object-cover" src="/soop-n/1.jpeg" width={345} height={276} alt={"soop-n-dapyo"} />
                        <div >
                            <h3 className="mt-3 text-base font-bold ">
                            숲N멍
                            </h3>
                            <p className="mt-3 text-sm"></p>
                            <p className="mt-3 text-sm">
                            '숲N멍' 프로그램은 자연 속에서의 진정한 휴식을 즐길 수 있는 네 가지 특별한 경험을 제공합니다.
                            </p>
                        </div>
                        <div className="flex flex-row space-x-3 text-sm font-bold w-full mt-3 cursor-pointer ">
                            <a href="/program/detail?programId=1">
                                <p className="bg-point-hover p-2 rounded-lg">상세보기</p>
                            </a>
                        </div>
                    </div>
                    <div className="group flex flex-col h-full">
                        <Image className="mt-3 h-40 object-cover" src="/outside/1.jpg" width={345} height={276} alt={"rest-dapyo"} />
                        <div > 
                            <h3 className="mt-3 text-base font-bold ">
                            온전한 쉼
                            </h3>
                            <p className="mt-3 text-sm"></p>
                            <p className="mt-3 text-sm">
                            온전한 쉼은 바쁜 일상에서 벗어나 완벽한 휴식을 제공하는 프로그램입니다.
                            </p>
                        </div>
                        <div className="flex flex-row space-x-3 text-sm font-bold w-full mt-3 cursor-pointer ">
                            <a href="/program/detail?programId=2">
                            <p className="bg-point-hover p-2 rounded-lg">상세보기</p>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}