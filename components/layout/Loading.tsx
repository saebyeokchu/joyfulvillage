import { DimBackground } from "../ui";

const Loading = () => (
    <>
        <DimBackground />
        <div className="flex justify-center items-center w-full z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-screen">
            <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-yellow-600 rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    </>
)

export default Loading;