
const PageHeader = ({
    src,
    title,
    subTitle,
    alt,
    showBtn = false,
    btnName,
    onClickBtn
}:{
    src : string,
    title : string,
    subTitle : string,
    alt : string,
    showBtn? : boolean,
    btnName? : string,
    onClickBtn? : string | any,
}) => {
    return (
        <div className="relative w-full  border-0 border-0-red-700 "  >

            {/* Header Text Section (Positioned Below) p-5 md:p-8*/} 
            <div
                className=" bg-cover bg-center border-0 border-red-500 h-[350px]"
                style={{ backgroundImage: `url(${src})` }}
            >
                {/* This inner div is absolutely positioned to stick at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 text-white container mx-auto border-0 border-yellow-500 p-5 md:p-8 ">
                    <p className="text-xl font-bold md:text-5xl md:font-normal">{title}</p>
                    <p className="text-sm mt-2 md:mt-5 md:text-lg md:font-bold font-pretendard">{subTitle}</p>
                    
                    {showBtn && 
                    <div
                        onClick={onClickBtn}
                        className="absolute bottom-5 right-5 md:bottom-8 md:right-8 hidden md:flex w-20 h-20 text-center text-white rounded-full cursor-pointer items-center justify-center"
                        style={{ backgroundColor: "#6E8653E5" }}
                        >
                        <span>{btnName}</span>
                    </div>}
                    
                </div>


                
            </div>

           
            {/* Mobile Header Text Section (Positioned Below) */}
            {/* <div className="flex md:hidden justify-center text-start w-full h-[350px]" style={{ backgroundImage: `url(${src})` }}>
                <div className="absolute bottom-0 left-0 right-0 container mx-auto border-2 border-yellow-500 p-5 md:p-8 text-white">
                    <p className="text-2xl font-bold md:font-normal ">{title}</p>
                    <p className="text-base mt-2 md:mt-5 md:text-lg  font-pretendard">{subTitle}</p>
                </div>
            </div> */}

        </div>
    )
}

export default PageHeader;