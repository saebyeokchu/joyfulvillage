export default function Preview({
    closePreview,
    previewUrl = '/'
} : {
    closePreview: () => void,
    previewUrl : string
}) {
    return(
        <> 
            <div className="fixed w-full h-screen  top-0 start-0 z-[80]  overflow-x-hidden overflow-y-scroll my-10" >
                <div className="z-[90] w-2/3  m-3 sm:mx-auto"> 
                    <div className="flex flex-col min-h-[1080px] shadow-sm border-0 border-0-slate-400 rounded-xl pointer-events-auto bg-white">
                        <div className="flex justify-between items-center py-3 px-4 cursor-pointer" onClick={closePreview}>
                            <h3 className="font-bold ">
                                미리보기
                            </h3>
                            <span className="sr-only">Close</span>
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </div>
                        <div className="min-h-[1080px]">                        
                            <iframe className="w-full min-h-[1080px]" src={previewUrl} title="description" />
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}
