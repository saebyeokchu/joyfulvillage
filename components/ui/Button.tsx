import { clsx } from 'clsx';

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
    btnName,
    csProps,
} : {
    onClickFunction : any,
    btnName : string,
    csProps? : string,
}){
    
    return(
        <button  onClick={onClickFunction} type="button"   className={`${csProps} py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none `} >
            {btnName} 
        </button> 
    )
}

function DisabledEditButton({
    btnName,
    csProps,
} : {
    btnName : string,
    csProps? : string,
}){
    
    return(
        <button disabled type="button"   className={`${csProps} py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none `} >
            {btnName} 
        </button> 
    )
}

const GrayRoundButton = ({
    onClickFunction,
    btnName,
    className,
} : {
    onClickFunction? : any,
    btnName : string,
    className? : string,
}) => <button 
    onClick={onClickFunction} 
    style={{backgroundColor : '#F2F2F2'}} 
    className={clsx(`font-bold rounded-3xl w-[107px] h-8`, className)}
     >
{btnName}
</button>
export {
    FatButton,
    EditButton,
    DisabledEditButton,
    GrayRoundButton
}