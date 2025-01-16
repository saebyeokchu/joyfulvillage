function FatButton({
    onClickFunction,
    btnName
} : {
    onClickFunction : any,
    btnName : string
}){
    return(
        <button 
            onClick={onClickFunction} 
            className="
                w-full py-3 px-4 inline-flex 
                justify-center items-center gap-x-2 text-sm 
                font-medium rounded-lg border border-transparent 
                bg-amber-600 text-white hover:bg-amber-700 focus:outline-none focus:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none">
        {btnName}</button>
    )
}

function EditButton({
    onClickFunction,
    btnName
} : {
    onClickFunction : any,
    btnName : string
}){
    return(
        <button onClick={onClickFunction} type="button"   className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none " >
            {btnName}
        </button> 
    )
}

export {
    FatButton,
    EditButton
}