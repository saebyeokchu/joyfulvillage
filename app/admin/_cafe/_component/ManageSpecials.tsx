import { CustomTextInput, EditButton } from "@/app/_component";
import { CafeSection } from "@/app/_data/Enums";
import { Cafe } from "@/app/_data/Types";
import { cafeService, imageArchiveService } from "@/app/_service";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ImageLibraryModal from "../../_component/ImageLibraryModal";
import { GeneralError } from "@/app/_data/Messages";
import EditBox from "../../_component/EditBox";
import { CustomTextArea } from "@/app/_component/CustomInput";
import { StringDivider } from "@/app/_data/Const";

export default function ManageSpecials({
    specials,
    updateCafeContent,
    newSpecial
}:{
    specials : Cafe[],
    updateCafeContent : any,
    newSpecial : any
}){
    let [ targetSpecial , setTargetSpecial ] = useState<Cafe | null>(null);
    const [ openImageLibrary , setImageLibrary ] = useState<boolean>(false);


    const onClickAddAction = async (imgSrc : string) => {
        //make image string with string divider
        if(targetSpecial){
            targetSpecial.img = [];
            targetSpecial.img.push(imgSrc);
            console.log(newSpecial);
            return true;
        }
    }

    const onClickEditImage = ( speical : Cafe ) => {
        setTargetSpecial(speical);
        setImageLibrary(true);
    }

    const onClickDeleteImage = async (targetSpecial : Cafe, imageName : string) => {
        if(window.confirm("특징에서 " + imageName + GeneralError.verifyDeletion)){
            const response = await cafeService.updateCafe({
                id : targetSpecial.id,
                img : []
            });
    
            console.log("onClickDeleteImage", response);
            if(response){
                await updateCafeContent();
                return true;
            }
        }
    }

    const onChangeInputChange = (event : any, column : string, targetSpecial : Cafe) => {
        console.log(targetSpecial);

        if(column=="note"){
            targetSpecial.note = event.target.value;
        }else if(column=="content1" || column=="content2"){
            if(targetSpecial.content){
                let contents = targetSpecial.content.split(StringDivider);
                if(column=="content1"){
                    contents[0] = event.target.value;
                }else if(column=="content2"){
                    contents[1] =   event.target.value;
                }

                targetSpecial.content = contents[0] + ";" + contents[1];
            }else{
                if(column=="content1"){
                    targetSpecial.content = event.target.value + ";";
                }else if(column=="content2"){
                    targetSpecial.content =  ";" + event.target.value;
                }
            }
        }

        console.log(targetSpecial);
    }

    return(
        <>
            <div className="flex flex-col space-y-3">
                { specials.length > 0 && specials.map((special : Cafe, index:number) =>
                    <EditBox key={`special-edit-box-${index}`} title={special.note || ""}>
                        <CustomTextInput inputVal={special.note  || undefined} placeholder={"특징 이름"} textRef={undefined} onChangeFunction={(e : any)=>onChangeInputChange(e,"note", special)}/>
                        <CustomTextArea inputVal={special.content?.split(StringDivider)[0]  || undefined} placeholder={"특징1(사진 위쪽)"} textRef={undefined} onChangeFunction={(e : any)=>onChangeInputChange(e,"content1", special)} />
                        <div className="flex flex-row space-x-3">
                            { special.img && special.img.length > 0 && <Image src={"/images/"+special.img[0]} width={300} height={200} alt="special-image" /> }
                            { special.img && special.img.length > 0 ?  <EditButton csProps="h-10" onClickFunction={() => onClickEditImage(special)} btnName={"이미지 수정하기"} /> : <EditButton csProps="h-10" onClickFunction={() => onClickEditImage(special)} btnName={"이미지 추가하기"} />  }
                            { special.img && special.img.length > 0 && <EditButton csProps="h-10" onClickFunction={()=>onClickDeleteImage(special, special.img[0])} btnName={"이미지 삭제하기"} /> }
                        </div>
                        <CustomTextArea inputVal={special.content?.split(StringDivider)[1]  || undefined} placeholder={"특징2(사진 아래쪽)"} textRef={undefined} onChangeFunction={(e : any)=>onChangeInputChange(e,"content2", special)} />
                    </EditBox>
                )}
                 <EditBox title={"새로운 특징 추가하기"}>
                        <CustomTextInput placeholder={"특징 이름"} textRef={undefined} onChangeFunction={(e : any)=>onChangeInputChange(e,"note", newSpecial)}/>
                        <CustomTextArea placeholder={"특징1(사진 위쪽)"} textRef={undefined} onChangeFunction={(e : any)=>onChangeInputChange(e,"content1", newSpecial)} />
                        <div className="flex flex-row space-x-3">
                            { newSpecial.img && newSpecial.img.length > 0 && <Image src={"/images/"+newSpecial.img[0]} width={300} height={200} alt="special-image" /> }
                            <EditButton csProps="h-10 w-36" onClickFunction={() => onClickEditImage(newSpecial)} btnName={`이미지 ${newSpecial.img && newSpecial.img.length > 0 ? "수정" : "추기"}하기`} />
                            { newSpecial.img && newSpecial.img.length > 0 && <EditButton csProps="h-10" onClickFunction={()=>onClickDeleteImage(newSpecial, newSpecial.img[0])} btnName={"이미지 삭제하기"} /> }
                        </div>
                       
                        <CustomTextArea placeholder={"특징2(사진 아래쪽)"} textRef={undefined} onChangeFunction={(e : any)=>onChangeInputChange(e,"content2", newSpecial)}/>
                </EditBox>
            </div>

            { openImageLibrary && <ImageLibraryModal target={targetSpecial} onClickCloseModal={() => setImageLibrary(false)} onClickAddAction={onClickAddAction} />}

        </>
)
}

{/* <div className="border relative" key={`manage_cafe_image_box_2`}>
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
                            </div> */}