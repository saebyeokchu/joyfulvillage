import { CustomTextInput, EditButton } from "@/app/_component";
import { CafeSection } from "@/lib/enums";
import { Cafe } from "@/types/Types";
import { cafeService, imageArchiveService } from "@/service";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ImageLibraryModal from "../.@/component/ImageLibraryModal";
import { GeneralError } from "@/lib/messages";
import EditBox from "../.@/component/EditBox";
import { CustomTextArea } from "@/app/_component/CustomInput";

export default function ManageMenus({
    menus,
    updateCafeContent
}:{
    menus : Cafe[],
    updateCafeContent : any
}){
    let [ targetMenu , setTargetMenu ] = useState<Cafe | null>(null);
    const [ images , setImages ] = useState<string[]>([]);
    const [ openImageLibrary , setImageLibrary ] = useState<boolean>(false);

    useEffect(()=>{
    },[menus])
    

    const onClickEditImage = (menu : Cafe) => {
        console.log("onClickEditImage.menu", menu);
        setTargetMenu(menu);
        setImageLibrary(true);
    }

    const onClickAddAction = async (imgSrc : string, targetMenu : Cafe) => {
        console.log("onClickAddAction", imgSrc);
        console.log("onClickAddAction.targetMenu", targetMenu);

        if(!targetMenu.img){
            targetMenu.img = [];
        }

        if(targetMenu){
            //make image string with string divider
            targetMenu.img.push(imgSrc);
            // setImages(images);
            const response = await cafeService.updateCafe({
                id : targetMenu.id,
                img : targetMenu.img
            });

            console.log("onClickAddAction", response);

            if(response){
                await updateCafeContent();
                return true;
            }
        }
    }

    const onClickDeleteImage = async (images : string[], removeIndex : number, targetMenuId : number) => {
        if(window.confirm("카페 도천에서 " + images[removeIndex] + GeneralError.verifyDeletion)){
            images.splice(images.indexOf(images[removeIndex]), 1);
            setImages(images);
            console.log("delete iamges : ",targetMenuId);
            const response = await cafeService.updateCafe({
                id : targetMenuId,
                img : images
            });
    
            console.log("onClickDeleteImage", response);
            if(response){
                await updateCafeContent();
                return true;
            }
        }
    }

    const onChangeInputChange = (event : any, column : string, targetMenu : Cafe) => {
        console.log(targetMenu);

        if(column=="note"){
            targetMenu.note = event.target.value;
        }else if(column=="content"){
            targetMenu.content = event.target.value;
        }

        console.log(targetMenu);
    }

    return(
        <>
            <div className="flex flex-col space-y-3">
                { menus.map((menu : Cafe, index : number)=>
                    <EditBox title={ ( index + 1 ) + "번째 메뉴 수정하기"} key={`cafe-edit-box=${index}`} >
                        <CustomTextInput inputVal={menu.note  || undefined} placeholder={"메뉴 분류"} textRef={undefined} onChangeFunction={(e : any)=>onChangeInputChange(e,"note", menu)}/>
                        <CustomTextArea placeholder={"메뉴 소개"} textRef={undefined} inputVal={menu.content || undefined} onChangeFunction={(e : any)=>onChangeInputChange(e,"content", menu)}/>
                        {/* 메뉴 이미지들 이미지 3개로 고정 */}
                        <div className="grid grid-cols-3">
                            <div className="border relative" key={`manage_cafe_image_box_1`}>
                                { menu.id && menu.img && menu.img[0] ? 
                                    <>
                                        <Image src={"/images/"+menu.img[0]} width={500} height={400} alt={`image-archive-${index}`} className="h-36 object-cover" />
                                        <p className="w-full flex cursor-pointer absolute bottom-0" >
                                            <span className="mx-auto h-8 pt-2 text-xs bg-green w-1/2 text-center  text-white" onClick={()=>onClickEditImage(menu)}>수정하기</span>
                                            <span className="mx-auto h-8 pt-2 text-xs bg-green w-1/2 text-center  text-white" onClick={()=>onClickDeleteImage(menu.img!,0,menu.id!)}>삭제하기</span>
                                        </p>
                                    </> :
                                    <div className="flex border h-36 items-center justify-center text-center self-center content-center place-content-center" >
                                        <svg onClick={()=>onClickEditImage(menu)} className="h-20 cursor-pointer" fill="#6E8653" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 45.402 45.402" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path> </g> </g></svg>
                                    </div>
                                }
                            </div>
                            <div className="border relative" key={`manage_cafe_image_box_2`}>
                                { menu.id && menu.img && menu.img[1] ? 
                                    <>
                                        <Image src={"/images/"+menu.img[1]} width={500} height={400} alt={`image-archive-${index}`} className="h-36 object-cover" />
                                        <p className="w-full flex cursor-pointer absolute bottom-0" >
                                            <span className="mx-auto h-8 pt-2 text-xs bg-green w-1/2 text-center  text-white" onClick={()=>onClickEditImage(menu)}>수정하기</span>
                                            <span className="mx-auto h-8 pt-2 text-xs bg-green w-1/2 text-center  text-white" onClick={()=>onClickDeleteImage(menu.img!,1,menu.id!)}>삭제하기</span>
                                        </p>
                                    </> :
                                    <div className="flex border h-36 items-center justify-center text-center self-center content-center place-content-center" >
                                        <svg onClick={()=>onClickEditImage(menu)} className="h-20 cursor-pointer" fill="#6E8653" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 45.402 45.402" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path> </g> </g></svg>
                                    </div>
                                }
                            </div>
                            <div className="border relative" key={`manage_cafe_image_box_3`}>
                                { menu.id && menu.img && menu.img[2] ? 
                                    <>
                                        <Image src={"/images/"+menu.img[2]} width={500} height={400} alt={`image-archive-${index}`} className="h-36 object-cover" />
                                        <p className="w-full flex cursor-pointer absolute bottom-0" >
                                            <span className="mx-auto h-8 pt-2 text-xs bg-green w-1/2 text-center  text-white" onClick={()=>onClickEditImage(menu)}>수정하기</span>
                                            <span className="mx-auto h-8 pt-2 text-xs bg-green w-1/2 text-center  text-white" onClick={()=>onClickDeleteImage(menu.img!,2,menu.id!)}>삭제하기</span>
                                        </p>
                                    </> :
                                    <div className="flex border h-36 items-center justify-center text-center self-center content-center place-content-center" >
                                        <svg onClick={()=>onClickEditImage(menu)} className="h-20 cursor-pointer" fill="#6E8653" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 45.402 45.402" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path> </g> </g></svg>
                                    </div>
                                }
                            </div>
                        </div>
                    </EditBox>
                )}
            </div>

            { openImageLibrary && <ImageLibraryModal target={targetMenu} onClickCloseModal={() => setImageLibrary(false)} onClickAddAction={onClickAddAction} />}

        </>
)
}