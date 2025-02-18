
const StayHeader = ({
    src,
    title,
    subTitle,
    alt
}:{
    src : string,
    title : string,
    subTitle : string,
    alt : string
}) => {
    return (
        <div className="relative w-full   border border-red-700 "  >

            {/* Header Text Section (Positioned Below) */}
            <div className="hidden md:flex justify-center md:text-start *:md:bg-cover md:bg-center w-full md:h-[350px]" style={{ backgroundImage: `url(${src})` }}>
                <div className="absolute bottom-0  max-w-[85rem] mx-auto w-full md:text-white -mt-10 p-5 md:p-8 text-center md:text-start border-4 border-yellow-500 ">
                    <p className="text-2xl font-bold md:text-5xl md:font-normal">{title}</p>
                    <p className="text-sm mt-2 md:mt-5 md:text-lg">{subTitle}</p>
                </div>
            </div>

            {/* Header Text Section (Positioned Below) */}
            <div className="flex md:hidden justify-center text-center w-full h-[200px]" >
                <div className="absolute bottom-0  max-w-[85rem] mx-auto w-full md:text-white -mt-10 p-5 md:p-8 text-center md:text-start border-4 border-yellow-500 ">
                    <p className="text-2xl font-bold md:text-5xl md:font-normal">{title}</p>
                    <p className="text-sm mt-2 md:mt-5 md:text-lg">{subTitle}</p>
                </div>
            </div>
            
        </div>  
    )
}

export default StayHeader;