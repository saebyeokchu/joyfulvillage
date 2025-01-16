import { useEffect } from "react";

export default function Footer(){

    //call kakaomap
    useEffect(() => {
            const kakaoMapScript = document.createElement('script')
            kakaoMapScript.async = false
            kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=4297b1d4febc7399cf0383c49b5b11d4&autoload=false`
            document.head.appendChild(kakaoMapScript);
            
            console.log(kakaoMapScript)
          
            const onLoadKakaoAPI = () => {
                if(window.kakao){
                    window.kakao.maps.load(() => {
                        const container = document.getElementById('footerKakaoMap')
                        const options = {
                          center: new window.kakao.maps.LatLng(36.30700271705157, 129.35450572886586),
                          level: 3,
                        }
                  
                        new window.kakao.maps.Map(container, options)
                      })
                }
            }
          
            kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
          }, []);
    
          
    return(
        <footer className="mt-auto bg-point w-full border-t border-amber-700 border-opacity-15">
            <div className="mt-auto w-full max-w-[85rem] py-5 px-4 sm:px-6 lg:px-8 lg:pt-10 mx-auto">
                <div className="grid grid-cols-4 gap-6">

                    <div className="col-span-1">
                        <a className="flex-none text-xl  text-white focus:outline-none focus:opacity-80" href="#" aria-label="투웰브 마운틴즈">
                            {/* <img src="/twelve-logo.png" width="100vh"/> */}
                            <div id="footerKakaoMap" className="border border-slate-500 text-sm text-black w-full h-28 p-3">kakaomap</div>

                        </a>
                        <div className="flex flex-col mt-2">
                            <div>경상북도 영덕군 남정면 산정로 320</div>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h4 className="">운영시간</h4>

                        <div className="mt-3 grid space-y-2">
                        <p className="inline-flex gap-x-2 pt-5">월요일 - 토요일</p>
                        <p className="inline-flex gap-x-2   ">10:00 - 18:00</p>
                        <p className="inline-flex gap-x-2 pt-5">일요일 </p>
                        <p className="inline-flex gap-x-2  " >off</p>
                        </div>
                    </div>

                    <div className="col-span-1">
                        사업자 번호 898-87-02686
                    </div>


                    <div className="col-span-1 flex flex-row space-x-2">
                        <div className="w-6 h-6">
                            <a className="inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-point-hover focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none" href="#">
                                <svg className="shrink-0 size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/>
                                </svg>
                            </a>
                        </div>
                        <div className="w-6 h-6">
                            <svg height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 461.001 461.001" fill="#000000">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> <g> 
                                        <path fill="#000"  d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728 c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137 C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607 c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"></path> 
                                    </g> 
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-items-end text-end w-full gap-x-2 content-end items-end justify-end">
                    <div className="text-sm">
                        <a href="/login/admin" className="">관리자 로그인</a>
                    </div>
                    <div> | </div>
                    <div className="text-sm">
                        © 2024 Powered by Sharelife
                    </div>
                </div>
            </div>
        </footer>
    )
}