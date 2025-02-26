export default function Slider() {
    return (
        <div data-hs-carousel='{
            "isAutoPlay": true,
            "loadingClasses": "opacity-0",
            "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-0-blue-700 size-3 cursor-pointer"
        }' className="relative">
        <div className="hs-carousel relative overflow-hidden bg-white w-full min-h-72 lg:h-screen">
            <div className="fill hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0 ">
            { ['https://naver.com'].map((url: string,index:number) => 
                <div className="hs-carousel-slide " key={`introduction-slider-${index}`}>
                    <div className="flex justify-center h-full bg-gray-100" >
                        <img src={url}  />
                    {/* <span className="self-center text-4xl text-gray-800 transition duration-700">First slide</span> */}
                    </div>
                </div>
            )}
            {/* <div className="hs-carousel-slide">
                <div className="flex justify-center h-full bg-gray-100 p-6">
                <span className="self-center text-4xl text-gray-800 transition duration-700">First slide</span>
                </div>
            </div>
            <div className="hs-carousel-slide">
                <div className="flex justify-center h-full bg-gray-200 p-6">
                <span className="self-center text-4xl text-gray-800 transition duration-700">Second slide</span>
                </div>
            </div>
            <div className="hs-carousel-slide">
                <div className="flex justify-center h-full bg-gray-300 p-6">
                <span className="self-center text-4xl text-gray-800 transition duration-700">Third slide</span>
                </div>
            </div> */}
            </div>
        </div>

        {/* <button type="button" className="hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-s-lg">
            <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"></path>
            </svg>
            </span>
            <span className="sr-only">Previous</span>
        </button>
        <button type="button" className="hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none focus:bg-gray-800/10 rounded-e-lg">
            <span className="sr-only">Next</span>
            <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"></path>
            </svg>
            </span>
        </button> */}

        {/* <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2"></div> */}
        </div>
    )
}