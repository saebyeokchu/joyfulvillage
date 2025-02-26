// import { CafeSection } from "@/lib/enums";
// import { Cafe } from "@/types/Types";
// import { cafeService, imageArchiveService } from "@/service";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { GeneralError } from "@/lib/messages";
// import ImageLibraryModal from "../../component/ImageLibraryModal";

// export default function ManageMainImg({
//     cafeContent,
//     updateCafeContent
// }:{
//     cafeContent : Cafe[],
//     updateCafeContent : any
// }){
//     const [ images , setImages ] = useState<string[]>([]);
//     const [ openImageLibrary , setImageLibrary ] = useState<boolean>(false);

//     useEffect(()=>{
//         init();
//     },[cafeContent])

//     const init = async () => {
//         const temp : Cafe[] | undefined = await cafeService.getCafeSection(cafeContent, CafeSection.mainImgs);
//         if(temp && temp[0].img){
//             setImages(temp[0].img);
//         }
//     }

//     const onClickAddImage = () => {
//         setImageLibrary(true);
//     }

//     const onClickAddAction = async (imgSrc : string) => {
//         //make image string with string divider
//         images.push(imgSrc);
//         setImages(images);
//         const response = await cafeService.updateCafe({
//             section : CafeSection.mainImgs,
//             img : images
//         });

//         console.log("onClickAddAction", response);

//         if(response){
//             await updateCafeContent();
//             return true;
//         }

//     }

//     const onClickDeleteImage = async (imgSrc : string) => {
//         if(window.confirm("메인 소개 이미지에서 " + imgSrc + GeneralError.verifyDeletion)){
//             images.splice(images.indexOf(imgSrc), 1);
//             setImages(images);
//             console.log("delete iamges : ",images);
//             const response = await cafeService.updateCafe({
//                 section : CafeSection.mainImgs,
//                 img : images
//             });
    
//             console.log("onClickDeleteImage", response);
//             if(response){
//                 await updateCafeContent();
//                 return true;
//             }
//         }
//     }

//     return(
//         <>
//             <div className="flex flex-col space-y-3">
//                 <div className="grid grid-cols-3 gap-3">
//                     { images.length > 0 && images.map((src : string, index : number) => 
//                         <div className="border-0 relative" key={`manage_cafe_mainimg_${index}`}>
//                             <Image src={"/images/"+src} width={500} height={400} alt={`image-archive-${index}`} className="h-36 object-cover" />
//                             <p className="w-full flex cursor-pointer absolute bottom-0" >
//                                 <span className="mx-auto h-8 pt-2 text-xs bg-joyful-indigo w-full text-center  text-white" onClick={()=>onClickDeleteImage(src)}>삭제하기</span>
//                             </p>
//                         </div>
//                     )}
//                     <div className="flex border-0 h-36 items-center justify-center text-center self-center content-center place-content-center" >
//                         <svg onClick={()=>onClickAddImage()} className="h-20 cursor-pointer" fill="#6E8653" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 45.402 45.402" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path> </g> </g></svg>
//                     </div>
//                 </div>
//             </div>

//             { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setImageLibrary(false)} onClickAddAction={onClickAddAction} />}

//         </>
// )
// }