const CustomTextInput = ({ placeholder, csProps, textRef, inputVal, onChangeFunction } : { placeholder : string, csProps? : string, textRef : any, inputVal? : string, onChangeFunction? : any }) => 
<input onChange={onChangeFunction} ref={textRef} type="text" className={`py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none ${csProps} border`} defaultValue={inputVal} placeholder={placeholder} />

const CustomNumberInput = ({ placeholder, csProps, textRef, inputVal, onChangeFunction } : { placeholder : string, csProps? : string, textRef : any, inputVal? : string, onChangeFunction? : any }) => 
    <input onChange={onChangeFunction} ref={textRef} type="number" className={`py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none ${csProps} border`} defaultValue={inputVal} placeholder={placeholder} />

const CustomTextArea = ({ placeholder, csProps, textRef, inputVal, onChangeFunction } : { placeholder : string, csProps? : string, textRef : any, inputVal? : string, onChangeFunction? : any }) => <textarea onChange={onChangeFunction} ref={textRef}  rows={5} className="w-full border shadow rounded p-2 mt-2" defaultValue={inputVal} placeholder={placeholder} />

const FileInput = ({ imgRef, csProps, onChangeFunction, acceptStr } : { csProps? : string, imgRef : any, onChangeFunction? : any, acceptStr? : string }) => 
<input ref={imgRef} type="file" id="img" name="img" accept={acceptStr || 'image/jpg'} 
    onChange={onChangeFunction}
    className={`{${csProps} block cursor-pointer w-full  
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:bg-yellow-50 file:text-yellow-700 file:cursor-pointer
        hover:file:bg-yellow-100
    `}/>;

export {
    CustomTextInput,
    CustomNumberInput,
    FileInput,
    CustomTextArea
}