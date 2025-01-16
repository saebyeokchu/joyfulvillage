const CustomTextInput = ({ placeholder, csProps, textRef } : { placeholder : string, csProps? : string, textRef : any }) => <input  ref={textRef} type="text" className={`py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-yellow-500 focus:ring-yellow-500 disabled:opacity-50 disabled:pointer-events-none ${csProps} border`} placeholder={placeholder} />

const FileInput = ({ imgRef, csProps } : { csProps? : string, imgRef : any }) => <input ref={imgRef} type="file" id="img" name="img" accept={`image/jpg`} className={`{${csProps} block cursor-pointer w-full  
file:mr-4 file:py-2 file:px-4
file:rounded-full file:border-0
file:bg-yellow-50 file:text-yellow-700 file:cursor-pointer
hover:file:bg-yellow-100
`}/>;

export {
    CustomTextInput,
    FileInput
}