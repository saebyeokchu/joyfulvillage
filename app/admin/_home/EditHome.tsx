import { EditButton } from "@/app/_component/Button";
import { CustomTextInput, FileInput } from "@/app/_component/CustomInput";
import Preview from "@/app/_component/Preview";
import { useEffect, useRef, useState } from "react";
import EditBox from "../_component/EditBox";
import { AxiosResponse, HomeSection } from "@/app/_data/Enums";
import { isStrValid } from "@/app/_lib/Common";
import { homeServcie } from "@/app/_service";
import { FilledBadge, OutlineBadge } from "@/app/_component/Badge";
import { GetHomeData } from "@/app/_api/Home";
import { HomeCafeSoopImgSrc, HomeSpaceBookImgSrc, HomeSpaceCafeImgSrc, HomeSpaceSoopImgSrc } from "@/app/_data/Const";

export default function EditHome(){
    const mainImgRef = useRef<any>();
    const mainImgContent1Ref = useRef<any>("");
    const mainImgContent2Ref = useRef<any>("");
    const mainImgContent3Ref = useRef<any>("");
    const introductionImgRef = useRef<any>("");
    const introductionContentRef = useRef<any>("");
    const spacesoopImgRef = useRef<any>("");
    const spacesoopContentRef = useRef<any>("");
    const spacebookImgRef = useRef<any>("");
    const spacebookContentRef = useRef<any>("");
    const spacecafeImgRef = useRef<any>("");
    const spacecafeContentRef = useRef<any>("");


    const [ showPreview, setShowPreview ]= useState<boolean>(false);
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
                    if(isStrValid(e.contents)&& introductionContent){
                        introductionContent.value = e.contents;
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

    const editHomeData = async () => {
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

        //일러스트레이터 아래 문구
        if(introductionContent != null && isStrValid(introductionContent.value)){
            editPart.push({
                section : HomeSection.introductionContent,
                content : introductionContent.value 
            });
        }

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
            updateResult = await homeServcie.editHomeData(editPart);
            if(updateResult){
                location.reload();   
            }
        }

        //업데이트 요청하기


        // if(updateResult && window.confirm("적용이 완료되었습니다. 새로고침 하시겠습니까?")){
        //     location.reload();
        // }else{
        //     window.alert("반영이 지연되고 있습니다. 1분 후 시도해주세요.")
        // }
    }

    const changeHomeSection = async (homeSection : HomeSection) => {
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

    return (
        <>
        <div className="p-20 w-2/3 h">
            { showPreview && <Preview closePreview={()=>setShowPreview(false)} previewUrl={"/home"} /> }

            {/* edit header */}
            <div className="flex justify-between w-full"> 
                <div className="flex flex-row ">
                    <div className="font-bold text-4xl">홈 관리</div>
                </div>
                <div className="flex flex-row space-x-3">
                    <EditButton onClickFunction={()=>setShowPreview(!showPreview)} btnName={"미리보기"} />
                    <EditButton onClickFunction={editHomeData} btnName={"수정하기"} />
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
                                <EditBox>
                                    <p className="font-bold text-xl">메인이미지 교체하기</p>
                                    <hr />
                                    <div className="overflow-y-auto">
                                        <p className="font-bold text-lg">현재이미지</p>
                                        <img src="/system/home/mainImg.jpg" className="w-72 mt-3"/>
                                        <div className="mt-3">
                                            <FileInput imgRef={mainImgRef} />
                                            <p><small>메인이미지는 jpg만 등록 가능합니다</small></p>
                                        </div>
                                        
                                    </div>
                                </EditBox>
                    
                            {/* 메인문구 교체하기 */}
                            <EditBox>
                                    <div className="flex flex-col">
                                        <p className="font-bold text-xl">메인문구 교체하기</p>
                                        <hr className="mt-3"/>
                                        <small  className="mt-3">메인문구는 메인이미지 내부의 문구를 말합니다. 문구의 위치는 아래 내용을 참조하시기 바랍니다.</small>
                                    </div>

                                    {/* 조이풀 빌리지는 폐교를 리모델링하여 만들어진 자연과
                                    예술이 어우러진 자연 속 복합문화예술공간입니다 */}
                                    {/* 미리보기 */}
                                    <div className="relative h-32 ">
                                        <div className={`flex w-full text-center justify-center h-auto p-8 mt-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 `}>
                                            <div>
                                                <p className="text-xl font-bold bg-gray-300 p-5 text-white rounded">
                                                    <span >메인 큰 문구1</span>
                                                </p>
                                                <div className="text-sm flex flex-col space-y-1 mt-1">
                                                    <p className="bg-gray-300 p-2 text-white rounded">
                                                        <span >메인 작은 문구1</span>
                                                    </p> 
                                                    <p className="bg-gray-300 p-2 text-white rounded">
                                                        <span>메인 작은 문구2</span>
                                                    </p>
                                                </div> 
                                            </div>
                                        
                                        </div>
                                    </div>
                                    <div className="overflow-y-auto pt-10 flex flex-col space-y-3 ">
                                        <CustomTextInput textRef={mainImgContent1Ref} placeholder={"메인 큰 문구1"} csProps={"border"} />
                                        <CustomTextInput textRef={mainImgContent2Ref} placeholder={"메인 작은 문구1"} csProps={"border"} />
                                        <CustomTextInput textRef={mainImgContent3Ref} placeholder={"메인 작은 문구2"} csProps={"border"} />
                                    </div> 
                            </EditBox>
                        </>
                    }

                    {
                        selectedSection == HomeSection.introduction &&
                        <>
                            {/* 일러스트레이터 이미지 교체하기 */}
                                <EditBox>
                                        <p className="font-bold text-xl">일러스트레이터 교체하기</p>
                                        <small>가로로 긴 이미지를 추천드립니다.(16:9)</small>
                                        <img src="/system/home/introduction.jpg" className="w-72 mt-3"/>
                                        <div className="overflow-y-auto">
                                            <FileInput imgRef={introductionImgRef} />
                                            <p><small>일러스트레이터는 jpg만 등록 가능합니다</small></p>
                                        </div>
                                </EditBox>

                                {/* 일러스트레이터 아래 문구 교체하기 */}
                                <EditBox>
                                        <div className="flex flex-col">
                                            <p className="font-bold text-xl">일러스트레이터 아래 문구 교체하기</p>
                                            <small>일러스트레이터 아래 문구는 일러스트레이터의 아래 문구를 말합니다.</small>
                                        </div>

                                        <div className="overflow-y-auto flex flex-col space-y-3 ">
                                            <CustomTextInput textRef={introductionContentRef} placeholder={"일러스트레이터 아래 문구"} csProps={"border"} />
                                        </div> 
                                </EditBox>
                        </>
                    }

                    {
                        selectedSection == HomeSection.spacesoop &&
                        <>
                            {/* '숲스테이도천' 이미지 교체하기 */}
                            <EditBox>
                                    <p className="font-bold text-xl">'숲스테이도천' 이미지 교체하기</p> 
                                    <div className="overflow-y-auto">
                                        <img src={HomeSpaceSoopImgSrc} className="w-72 mt-3"/>
                                        <div className="mt-3">
                                            <FileInput imgRef={spacesoopImgRef} />
                                            <p><small>일러스트레이터는 jpg만 등록 가능합니다</small></p>
                                        </div>
                                    </div>
                            </EditBox>

                            {/*  '숲스테이도천' 아래 문구 교체하기 */}
                            <EditBox>
                                    <div className="flex flex-col">
                                        <p className="font-bold text-xl">'숲스테이도천' 아래 문구 교체하기</p>
                                        <small>'북스테이도천'은 일러스트레이터의 아래 문구를 말합니다.</small>
                                    </div>

                                    <div className="overflow-y-auto flex flex-col space-y-3 ">
                                        <CustomTextInput textRef={spacesoopContentRef} placeholder={"'북스테이도천' 이미지 아래 문구"} csProps={"border"} />
                                    </div> 
                            </EditBox>
                        </>
                    }


                    {
                        selectedSection == HomeSection.spacebook &&
                        <>
                            {/* 북 스테이 도천 이미지 교체하기 */}
                            <EditBox>
                                    <p className="font-bold text-xl">'북스테이도천' 이미지 교체하기</p>
                                    <div className="overflow-y-auto">
                                        <img src={HomeSpaceBookImgSrc} className="w-72 mt-3"/>
                                        <div className="mt-3">
                                            <FileInput imgRef={spacebookImgRef} />
                                            <p><small>'북스테이도천'는 jpg만 등록 가능합니다</small></p>
                                        </div>
                                    </div>
                            </EditBox>

                            {/*  북 스테이 도천 아래 문구 교체하기 */}
                            <EditBox>
                                    <div className="flex flex-col">
                                        <p className="font-bold text-xl">'북스테이도천' 아래 문구 교체하기</p>
                                        <small>북 스테이 도천 아래 문구는 '북스테이도천' 이미지 아래 문구를 말합니다.</small>
                                    </div>

                                    <div className="overflow-y-auto flex flex-col space-y-3 ">
                                        <CustomTextInput textRef={spacebookContentRef} placeholder={"'북스테이도천' 아래 문구"} csProps={"border"} />
                                    </div> 
                            </EditBox>
                        </>
                    }

                    {
                        selectedSection == HomeSection.spacecafe &&
                        <>
                            {/* 북 스테이 도천 이미지 교체하기 */}
                            <EditBox title="'카페도천' 이미지 교체하기">
                                    <img src={HomeSpaceCafeImgSrc} className="w-72 mt-3"/>
                                    <div className="mt-3">
                                        <FileInput imgRef={spacecafeImgRef} />
                                        <p><small>'카페도천'은 jpg만 등록 가능합니다</small></p>
                                    </div>
                            </EditBox>

                            {/*  북 스테이 도천 아래 문구 교체하기 */}
                            <EditBox title="'카페도천' 아래 문구 교체하기" subTitle="'카페도천' 아래 문구는 '카페도천' 이미지 아래 문구를 말합니다.">
                                <div className="overflow-y-auto flex flex-col space-y-3 ">
                                    <CustomTextInput textRef={spacecafeContentRef} placeholder={"'카페도천' 아래 문구"} csProps={"border"} />
                                </div> 
                            </EditBox>
                        </>
                    }

               


                </div>
            </div>
        </div>
        </>
    )
}