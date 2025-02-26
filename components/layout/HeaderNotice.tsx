export default function HeaderNotice({
    message
} : {
    message : string
}) {
    return(
        <a className=" group block bg-gray-100 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 p-4 rounded-lg text-center transition duration-300 " href="#">
            <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
                <p className="me-2 inline-block text-sm text-gray-800 ">
                    {message}
                </p>
                {/* <span className="group-hover:underline group-focus:underline decoration-2 inline-flex justify-center items-center gap-x-2 font-semibold text-yellow-600 text-sm ">
                Shop now
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </span> */}
            </div>
        </a>
    )
}