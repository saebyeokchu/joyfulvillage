import { EditButton } from "@/app/_component/Button";
import { CustomTextInput, FileInput } from "@/app/_component/CustomInput";
import Preview from "@/app/_component/Preview";
import { useEffect, useRef, useState } from "react";
import EditBox from "../_component/EditBox";
import { AxiosResponse, HomeSection } from "@/app/_data/Enums";
import { isStrValid } from "@/app/_lib/Common";
import { homeServcie, programService } from "@/app/_service";
import { FilledBadge, OutlineBadge } from "@/app/_component/Badge";
import { GetHomeData } from "@/app/_api/Home";
import {  HomeSpaceBookImgSrc, HomeSpaceCafeImgSrc, HomeSpaceSoopImgSrc } from "@/app/_data/Const";
import { useJoyfulContext } from "@/app/_context/JoyfulContext";
import { GeneralError } from "@/app/_data/Messages";
import Wysiwyg from "../_component/Wysiwyg";
import MainImgSection from "./_component/mainImgSection";

export default function EditHome(){

    const mainImgContent1Ref = useRef<any>("");
    const mainImgContent2Ref = useRef<any>("");
    const mainImgContent3Ref = useRef<any>("");

    const introductionImgRef = useRef<any>("");
    const introductionPreviewImgRef = useRef<any>("");
    const introductionContentRef = useRef<any>("");
    const [intContent,setIntContent] = useState<string | null>(null);

    const spacesoopImgRef = useRef<any>("");
    const spacesoopImgPreviewRef = useRef<any>("");
    const spacesoopContentRef = useRef<any>("");
    const spacesoopPreviewImgRef = useRef<any>("");

    const spacebookImgRef = useRef<any>("");
    const spacebookContentRef = useRef<any>("");
    const spacebookPreviewImgRef = useRef<any>("");

    const spacecafeImgRef = useRef<any>("");
    const spacecafeContentRef = useRef<any>("");
    const spacecafePreviewImgRef = useRef<any>("");

    const joyfulContext = useJoyfulContext();

    const [ showPreview, setShowPreview ]= useState<boolean>(false);
    const [ dataEdited, setDataEdited ]= useState<boolean>(false);
    const [ homeData, setHomeData ]= useState<any>(null);
    const [ selectedSection, setSelectedSection ]= useState<HomeSection>(HomeSection.mainImg);

    useEffect(()=>{
        GetHomeData().then(response => {
            if(response.status == 200){
                setHomeData(response.data);
                setHomeContent(response.data);
            }
        });
    },[]);

    const setHomeContent = (data : any[]) => {
        const mainImgContent1 : any = mainImgContent1Ref.current;
        const mainImgContent2 : any = mainImgContent2Ref.current;
        const mainImgContent3 : any = mainImgContent3Ref.current;
        const introductionContent : any = introductionContentRef.current;
        const spacesoopContent = spacesoopContentRef.current;
        const spacebookContent = spacebookContentRef.current;
        const spacecafeContent = spacecafeContentRef.current;

        console.log(data);

        data.map((e:any)=>{
            switch(parseInt(e.section)) {
                case HomeSection.mainImgContent1 :
                    if(isStrValid(e.contents) && mainImgContent1){
                        mainImgContent1.value = e.contents;
                    }
                    break;
                case HomeSection.mainImgContent2 :
                    if(isStrValid(e.contents) && mainImgContent2){
                        mainImgContent2.value = e.contents;
                    }
                    break;
                case HomeSection.mainImgContent3 :
                    if(isStrValid(e.contents) && mainImgContent3){
                        mainImgContent3.value = e.contents;
                    }
                    break;
                case HomeSection.introductionContent :
                    // if(isStrValid(e.contents)&& introductionContent){
                    //     introductionContent.value = e.contents;
                    //     setIntContent(e.contents);
                    // }
                    if(isStrValid(e.contents)){
                        setIntContent(e.contents);
                        console.log(parseInt(e.section) == HomeSection.introductionContent);
                    }
                    break;
                case HomeSection.spacesoopContent :
                    if(isStrValid(e.contents) && spacesoopContent){
                        spacesoopContent.value = e.contents;
                    }
                    break;
                case HomeSection.spacebookContent :
                    if(isStrValid(e.contents)  && spacebookContent){
                        spacebookContent.value = e.contents;
                    }
                    break;
                case HomeSection.spacecafeCotnent :
                    if(isStrValid(e.contents) && spacecafeContent){
                        spacecafeContent.value = e.contents;
                    }
                    break;
        }
        });
    }

    const onClickSaveBtn = async () => {
        joyfulContext.openAdminLoading = true;

        const mainImg : any = mainImgRef.current;
        const mainImgContent1 : any = mainImgContent1Ref.current;
        const mainImgContent2 : any = mainImgContent2Ref.current;
        const mainImgContent3 : any = mainImgContent3Ref.current;
        const introductionImg : any = introductionImgRef.current;
        const introductionContent : any = introductionContentRef.current;
        const spacesoopImg = spacesoopImgRef.current;
        const spacesoopContent = spacesoopContentRef.current;
        const spacebookImg = spacebookImgRef.current;
        const spacebookContent = spacebookContentRef.current;
        const spacecafeImg = spacecafeImgRef.current;
        const spacecafeContent = spacecafeContentRef.current;

        let updateResult : any = null;
        let editPart : any[] = [];

        //메인 이미지 수정을 위한 데이터 세팅하기
        if(mainImg){
            if( mainImg.files[0] != null){
                const formData : FormData = new FormData();
                formData.append("image", mainImg.files[0]);
                formData.append("imageName","mainImg.jpg");
                formData.append("folderName","home");
    
                editPart.push({
                    section : HomeSection.mainImg,
                    part : "mainImg",
                    formData : formData 
                });
            }

        }

        //메인문구1
        if(mainImgContent1 != null && isStrValid(mainImgContent1.value)){
            editPart.push({
                section : HomeSection.mainImgContent1,
                content : mainImgContent1.value 
            });
        }

        //메인문구2
        if(mainImgContent2 != null && isStrValid(mainImgContent2.value)){
            editPart.push({
                section : HomeSection.mainImgContent2,
                content : mainImgContent2.value 
            });
        }

        //메인문구3
        if(mainImgContent3 != null && isStrValid(mainImgContent3.value)){
            editPart.push({
                section : HomeSection.mainImgContent3,
                content : mainImgContent3.value 
            });
        }

        //introduction 이미지 수정을 위한 데이터 세팅하기
        if(introductionImg){
            if(introductionImg.files[0] != null){
                const formData : FormData = new FormData();
                formData.append("image", introductionImg.files[0]);
                formData.append("imageName","introduction.jpg");
                formData.append("folderName","home");
    
                editPart.push({
                    section : HomeSection.introduction,
                    part : "introductionImg",
                    formData : formData 
                });
            }
           
        }

        //일러스트레이터 위쪽 문구
        if(intContent != null && isStrValid(intContent)){
            editPart.push({
                section : HomeSection.introductionContent,
                content : intContent 
            });
        }

        // if(introductionContent != null && isStrValid(introductionContent.value)){
        //     editPart.push({
        //         section : HomeSection.introductionContent,
        //         content : introductionContent.value 
        //     });
        // }

        //숲스테이도천 이미지 수정을 위한 데이터 세팅하기
        if(spacesoopImg){
            if(spacesoopImg.files[0] != null){
                const formData : FormData = new FormData();
                formData.append("image", spacesoopImg.files[0]);
                formData.append("imageName","spacesoop.jpg");
                formData.append("folderName","home");

                editPart.push({
                    section : HomeSection.spacesoop,
                    formData : formData 
                });
            }
        }

        //숲스테이도천 아래 문구
        if(spacesoopContent != null && isStrValid(spacesoopContent.value)){
            editPart.push({
                section : HomeSection.spacesoopContent,
                content : spacesoopContent.value 
            });
        }

        //북스테이도천 이미지 수정을 위한 데이터 세팅하기
        if(spacebookImg){
            if(spacebookImg.files[0] != null){
                const formData : FormData = new FormData();
                formData.append("image", spacebookImg.files[0]);
                formData.append("imageName","spacebook.jpg");
                formData.append("folderName","home");
    
                editPart.push({
                    section : HomeSection.spacebook,
                    formData : formData 
                });
            }
        }

        //북스테이도천 아래 문구
        if(spacebookContent != null && isStrValid(spacebookContent.value)){
            editPart.push({
                section : HomeSection.spacebookContent,
                content : spacebookContent.value 
            });
        }

        //북스테이도천 이미지 수정을 위한 데이터 세팅하기
        if(spacecafeImg){
            if(spacecafeImg.files[0] != null){
                const formData : FormData = new FormData();
                formData.append("image", spacecafeImg.files[0]);
                formData.append("imageName","spacecafe.jpg");
                formData.append("folderName","home");
    
                editPart.push({
                    section : HomeSection.spacecafe,
                    formData : formData 
                });
            }
        }

        //북스테이도천 아래 문구
        if(spacecafeContent != null && isStrValid(spacecafeContent.value)){
            editPart.push({
                section : HomeSection.spacecafeCotnent,
                content : spacecafeContent.value 
            });
        }


        if(editPart.length > 0){
            console.log("editPart",editPart);
            updateResult = await homeServcie.editHomeData(editPart);
            if(updateResult){
                window.alert(GeneralError.success);
                // location.reload();  
            }
        }

        //업데이트 요청하기

        // if(updateResult && window.confirm("적용이 완료되었습니다. 새로고침 하시겠습니까?")){
        //     location.reload();
        // }else{
        //     window.alert("반영이 지연되고 있습니다. 1분 후 시도해주세요.")
        // }

        joyfulContext.openAdminLoading = false;

    }

    const changeHomeSection = async (homeSection : HomeSection) => {
        if(dataEdited){
            if(! window.confirm(GeneralError.proceed)){
                return;
            }
        }

        setDataEdited(false);
        setSelectedSection(homeSection);

        setTimeout(async ()=>{
            if(homeData){
                setHomeContent(homeData);
            }else{
                const response = await GetHomeData();
                if(response.status == AxiosResponse.Successful){
                    setHomeData(response.data);
                    setHomeContent(response.data);
                }
            }
        },500);
    }

    const onChangeImgRef = (event:any, previewTarget : any) => {
        setDataEdited(true);
        joyfulContext.openAdminLoading = true;
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = () => {
            previewTarget.current.src = reader.result;
            joyfulContext.openAdminLoading = false;
        };
    }
   
    return (
        <>
        <div className="p-20 w-full h">
            { showPreview && <Preview closePreview={()=>setShowPreview(false)} previewUrl={"/"} /> }

            {/* edit header */}
            <div className="flex justify-between w-full"> 
                <div className="flex flex-row ">
                    <div className="font-bold text-4xl">홈 관리</div>
                </div>
                <div className="flex flex-row space-x-3">
                    <EditButton onClickFunction={()=>setShowPreview(!showPreview)} btnName={"미리보기"} />
                    <EditButton onClickFunction={onClickSaveBtn} btnName={"저장하기"} />
                </div>
            </div>

            {/* middle section */}
            <div className="mt-3 flex flex-row space-x-2">
                { selectedSection==HomeSection.mainImg ? <FilledBadge name={"메인페이지"} /> : <OutlineBadge name={"메인페이지"} onClickFunction={()=>changeHomeSection(HomeSection.mainImg)} />}
                { selectedSection==HomeSection.introduction ? <FilledBadge name={"일러스트레이터"} /> : <OutlineBadge name={"일러스트레이터"} onClickFunction={()=>changeHomeSection(HomeSection.introduction)}  />}
                { selectedSection==HomeSection.spacesoop ? <FilledBadge name={"숲스테이도천"} /> : <OutlineBadge name={"숲스테이도천"} onClickFunction={()=>changeHomeSection(HomeSection.spacesoop)}  />}
                { selectedSection==HomeSection.spacebook ? <FilledBadge name={"북스테이도천"} /> : <OutlineBadge name={"북스테이도천"} onClickFunction={()=>changeHomeSection(HomeSection.spacebook)}  />}
                { selectedSection==HomeSection.spacecafe ? <FilledBadge name={"카페도천"} /> : <OutlineBadge name={"카페도천"} onClickFunction={()=>changeHomeSection(HomeSection.spacecafe)}  />}
            </div>
            <div className="mt-1">
                <small >섹션을 이동하기전 변경사항을 저장하여야 정보가 손실되지 않습니다.</small>
            </div>

            <div className="flex flex-col justify-between ">
                <div className="flex flex-col space-y-3 ">

                    {
                        selectedSection==HomeSection.mainImg &&
                        <>
                            {/* 메인이미지 교체하기 */}
                            {/* <EditBox title="메인이미지 교체하기">
                                <div className="mb-5">
                                    <p><small>메인이미지는 <strong className="text-red-600">투명도 관리</strong>를 위해 jpg, jpeg만 등록 가능합니다</small></p>
                                </div>
                                <FileInput imgRef={mainImgRef} acceptStr="image/jpg, image/jpeg" onChangeFunction={(event : any) => onChangeImgRef(event, mainImgPreviewRef)} />

                                <img src="/system/home/mainImg.jpg" className="w-72 mt-5" ref={mainImgPreviewRef} />

                            </EditBox> */}
                            <MainImgSection />
                        </>
                    }

                    {
                        selectedSection == HomeSection.introduction &&
                        <>
                            {/* 일러스트레이터 아래 문구 교체하기 */}
                            <EditBox title="일러스트레이터 위쪽 문구 교체하기" subTitle="일러스트레이터 위 문구는 일러스트레이터의 위에 위치하는 문구를 말합니다.">
                                    <div className="overflow-y-auto flex flex-col space-y-3 ">
                                        {/* <CustomTextInput textRef={introductionContentRef} placeholder={"일러스트레이터 위쪽 문구"} csProps={"border"} /> */}
                                        <Wysiwyg content={intContent} setContent={setIntContent} isImageAllowed={false} height={300} />

                                    </div> 
                            </EditBox>

                            {/* 일러스트레이터 이미지 교체하기 */}
                            <EditBox title="일러스트레이터 교체하기" >
                                    <p>
                                        <small>
                                            <span>가로로 긴 이미지를 추천드립니다.(16:9)</span>
                                            <br/>
                                            일러스트레이터는  <strong className="text-red-600">투명도 관리</strong>를 위해 jpg, jpeg만 등록 가능합니다.
                                        </small>
                                    </p>
                                    <div className="mt-5">
                                        <FileInput imgRef={introductionImgRef} acceptStr="image/jpg, image/jpeg"   onChangeFunction={(event : any) => onChangeImgRef(event, introductionPreviewImgRef)} />
                                    </div>
                                    <img src="/system/home/introduction.jpg" className="w-full mt-5"  ref={introductionPreviewImgRef} />
                            </EditBox>

                        
                        </>
                    }

                    {
                        selectedSection == HomeSection.spacesoop &&
                        <>
                           {/*  '숲스테이도천' 아래 문구 교체하기 */}
                           <EditBox title="'숲스테이도천' 오른쪽 문구 교체하기" subTitle="'숲스테이도천'은 일러스트레이터의 오른쪽 문구를 말합니다.">
                                <div className="overflow-y-auto flex flex-col space-y-3 ">
                                    <CustomTextInput textRef={spacesoopContentRef} placeholder={"'숲스테이도천' 이미지 오른쪽 문구"} csProps={"border"} />
                                </div> 
                            </EditBox>

                            {/* '숲스테이도천' 이미지 교체하기 */}
                            <EditBox title="'숲스테이도천' 이미지 교체하기">
                                    <div className="overflow-y-auto">
                                        <p><small>일러스트레이터는 <strong className="text-red-600">투명도 관리</strong>를 위해 jpg, jpeg만 등록 가능합니다.</small></p>
                                        <FileInput imgRef={spacesoopImgRef} acceptStr="image/jpg, image/jpeg" onChangeFunction={(event : any) => onChangeImgRef(event, spacesoopImgPreviewRef)} />

                                        <img src={HomeSpaceSoopImgSrc} className="w-72 pt-3" ref={spacesoopImgPreviewRef}  />
                                    </div>
                            </EditBox>

                         
                        </>
                    }


                    {
                        selectedSection == HomeSection.spacebook &&
                        <>
                        
                            {/*  북 스테이 도천 아래 문구 교체하기 */}
                            <EditBox title="'북스테이도천' 오른쪽 문구 교체하기">
                                <div className="overflow-y-auto flex flex-col space-y-3 ">
                                    <CustomTextInput textRef={spacebookContentRef}  placeholder={"'북스테이도천' 아래 문구"} csProps={"border"} />
                                </div> 
                            </EditBox>

                            {/* 북 스테이 도천 이미지 교체하기 */}
                            <EditBox title="'북스테이도천' 이미지 교체하기">
                                <div className="my-3">
                                    <FileInput imgRef={spacebookImgRef} acceptStr="image/jpg, image/jpeg"  onChangeFunction={(event : any) => onChangeImgRef(event, spacesoopPreviewImgRef)}  />
                                    <p><small>'북스테이도천'는 <strong className="text-red-600">투명도 관리</strong>를 위해 jpg, jpeg만 등록 가능합니다.</small></p>
                                </div>
                                <img src={HomeSpaceBookImgSrc} className="w-72 mt-3" ref={spacesoopPreviewImgRef}/>
                            </EditBox>

                        </>
                    }

                    {
                        selectedSection == HomeSection.spacecafe &&
                        <>
                            {/*  북 스테이 도천 오른쪽 문구 교체하기 */}
                            <EditBox title="'카페도천' 오른쪽 문구 교체하기" subTitle="'카페도천' 오른쪽 문구는 '카페도천' 이미지 오른쪽 문구를 말합니다.">
                                <div className="overflow-y-auto flex flex-col space-y-3 ">
                                    <CustomTextInput textRef={spacecafeContentRef} placeholder={"'카페도천' 오른쪽 문구"} csProps={"border"} />
                                </div> 
                            </EditBox>

                            {/* 북 스테이 도천 이미지 교체하기 */}
                            <EditBox title="'카페도천' 이미지 교체하기">
                                    <FileInput imgRef={spacecafeImgRef} acceptStr="image/jpg, image/jpeg"  onChangeFunction={(event : any) => onChangeImgRef(event, spacecafePreviewImgRef)}  />

                                    <div className="my-3">
                                        <p><small>'카페도천'은 <strong className="text-red-600">투명도 관리</strong>를 위해 jpg, jpeg만 등록 가능합니다.</small></p>
                                    </div>

                                    <img src={HomeSpaceCafeImgSrc} className="w-72 mt-3" ref={spacecafePreviewImgRef}/>

                            </EditBox>
                        </>
                    }

               


                </div>
            </div>
        </div>
        </>
    )
}