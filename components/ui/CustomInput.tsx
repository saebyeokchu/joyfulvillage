const CustomTextInput = (
    { 
        placeholder, 
        csProps, 
        textRef, 
        inputVal, 
        onChangeFunction, 
        width ,
        maxLength = 500
    } : { 
        placeholder : string, 
        csProps? : string, 
        textRef : any, 
        inputVal? : string, 
        onChangeFunction? : any, 
        width?:string ,
        maxLength? : number
    }) => 
<input maxLength={maxLength} onChange={onChangeFunction} ref={textRef} type="text" className={`${width || 'w-full'} py-2 px-3 pe-11 block border-0-gray-200 shadow-sm rounded-lg text-sm focus:border-0-yellow-500 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none ${csProps} border`} defaultValue={inputVal} placeholder={placeholder} />

const CustomNumberInput = ({ placeholder, csProps, textRef, inputVal, onChangeFunction } : { placeholder : string, csProps? : string, textRef : any, inputVal? : string, onChangeFunction? : any }) => 
    <input onChange={onChangeFunction} ref={textRef} type="number" className={`py-2 px-3 pe-11 block w-full border-0-gray-200 shadow-sm rounded-lg text-sm focus:border-0-yellow-500 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none ${csProps} border-0`} defaultValue={inputVal} placeholder={placeholder} />

const CustomTextArea = (
    { 
        placeholder, 
        csProps, 
        textRef, 
        inputVal, 
        onChangeFunction,
        maxLength = 500
    } 
    : 
    { 
        placeholder : string, 
        csProps? : string, 
        textRef : any, 
        inputVal? : string, 
        onChangeFunction? : any,
        maxLength? : number
    }) => 
    <textarea 
        maxLength={maxLength}
        onChange={onChangeFunction} 
        ref={textRef}  
        rows={5} 
        className="w-full border shadow rounded p-2 mt-2" 
        defaultValue={inputVal} 
        placeholder={placeholder} 
    />

const FileInput = ({ imgRef, csProps, onChangeFunction, acceptStr, width } : { csProps? : string, imgRef : any, onChangeFunction? : any, acceptStr? : string, width?:number }) => 
<input ref={imgRef} type="file" id="img" name="img" accept={acceptStr || 'image/*'} 
    onChange={onChangeFunction}
    className={`{${csProps} block cursor-pointer ${width || 'w-full'} 
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border
        file:bg-joyful-indigo file:text-blue-950 file:cursor-pointer
    `}/>;



export {
    CustomTextInput,
    CustomNumberInput,
    FileInput,
    CustomTextArea
}