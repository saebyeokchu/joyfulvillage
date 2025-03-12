"use client"

import { useEffect, useRef, useState } from "react";
import { AxiosResponse, HomeSection } from "@/lib/enums";
import { findDuplicateAfterValues, isStrValid } from "@/lib/common";
import { getQnaList } from "@/service/qnaService";
import { DeleteQnaData, EditBiz, EditSortOrder, GetKakao } from "@/api/Biz";
import { InsertQnaData, UpdateQna } from "@/api/Qna";
import { CustomNumberInput, CustomTextInput, DisabledEditButton, EditButton, FilledBadge } from "@/components/ui";
import { EditBox } from "../_component";
import Preview from "@/components/layout/Preview";
import AdminWrapper from "../component/AdminWrapper";
import { IndigoRoundButton } from "@/components/ui/Button";
import { FilledIndigoBadge } from "@/components/ui/Badge";
import { GeneralError } from "@/lib/messages";

export default function CafeInquiry(){
    const [ order, setOrder ]= useState<any>([]);
    const [ showPreview, setShowPreview ]= useState<boolean>(false);
    const [ openAddQna, setOpenAddQna ]= useState<boolean>(false);
    const [ openEditQna, setOpenEditQna ]= useState<boolean>(false);
    const [ openEditSort, setOpenEditSort ]= useState<boolean>(false);
    const [ editTarget, setEditTarget ]= useState<any>(null);
    const address : string = "주소 경상북도 영덕군 남정면 산정로 320";
    const [qnaList, setQnaList ] = useState<any>([]);

    const questionRef : any = useRef<string>("");
    const answerRef : any = useRef<string>("");

    const questionEditRef : any = useRef<string>("");
    const answerEditRef : any = useRef<string>("");

    const addressTextRef :  any = useRef<string>("");
    const longRef :  any = useRef<string>("");
    const lnagRef :  any = useRef<string>("");


    useEffect(()=>{
        getInquriyData();
        getKakaoInfo();
    },[]);

    
    const getKakaoInfo = async () => {
        await GetKakao().then(response => {
            if(response.status == AxiosResponse.Successful){
                const data = response.data[0];
                addressTextRef.current.value = data.addressText;
                longRef.current.value = data.longtitude;
                lnagRef.current.value = data.latitude;
            }
        });
    }

    const getInquriyData = async () => {
        const response = await getQnaList();
        if(response){
            setQnaList(response);
            response.map( ( e : any, index : number )=> order.push({before : e.sortOrder, after : -1}) );
        }
    }
    
    const editInquiryData = async () => {
        await EditBiz(longRef.current.value, lnagRef.current.value, addressTextRef.current.value).then(response=>{
            if(response.status==AxiosResponse.Successful){
                window.alert(GeneralError.success);
                openEditModal(false);
            }
        });
    }

    const editQna = async () => {
        const question : any = questionEditRef.current;
        const answer : any = answerEditRef.current;

        if(question && answer ){

            if(isStrValid(question.value) && isStrValid(answer.value)){
                
                await UpdateQna({id : editTarget.id, question : question.value, answer : answer.value}).then(response=>{
                    if(response.status==AxiosResponse.Successful){
                        window.alert(GeneralError.success);
                        setQnaList(response.data);
                        openEditModal(false);
                    }
                });
            }
        }else{
            window.alert("질문과 답변을 모두 입력해 주세요.");
        }
    }

    const deleteInquiryData = async (id : number) => {
        if(window.confirm("Q&A를 삭제하시겠습니까?")){
            await DeleteQnaData(id).then(response=>{
                if(response.status==AxiosResponse.Successful){
                    window.alert("삭제되었습니다.");
                    setQnaList(response.data);
                }
            });
        }
    }

    async function addNewQna(){
        const question : any = questionRef.current;
        const answer : any = answerRef.current;

        if(question && answer ){

            if(isStrValid(question.value) && isStrValid(answer.value)){
                await InsertQnaData(question.value, answer.value).then(response=>{
                    if(response.status==AxiosResponse.Successful){
                        window.alert("추가되었습니다.");
                        setQnaList(response.data);
                        question.value = "";
                        answer.value = "";
                        setOpenAddQna(false);
                        getInquriyData();
                    }
                });
            }
        }else{
            window.alert("질문과 답변을 모두 입력해 주세요.");
        }
    }

    const onSortChange = (event : any, id : number) => {
        const target = order.filter(( e : any ) =>e.before == id);
        target[0].after = parseInt(event.target.value);
    }

    const editSortOrder = async () => {

        //check count
        const count = order.filter( ( e : any )  => e.after != -1);

        console.log(count)

        if(count.length != qnaList.length){
            window.alert("모든 순서를 채워주세요");
            return;
        }
        //check dup
        const dups = findDuplicateAfterValues(order);

        if(dups.length > 0){
            window.alert("중복된 값이 있습니다.");
            return;
        }

        const resposnse : any = await EditSortOrder(order).then(response=>console.log(response));

        if(resposnse.status == AxiosResponse.Successful){
            setQnaList(resposnse.data);
            window.alert("순서가 변경되었습니다");
            setOpenEditSort(false);
        }

    }

    const openEditModal = (qna : any) => {
        setEditTarget(qna);
        setOpenEditQna(true);

        console.log(qna.question, qna.answer);

        setTimeout(()=>{
            questionEditRef.current.value = qna.question;
            answerEditRef.current.value = qna.answer;
        },100)


    }

    return (
        <>
            <AdminWrapper>
                {/* <div className="p-20 w-2/3 h">
                    { showPreview && <Preview closePreview={()=>setShowPreview(false)} previewUrl={"/"} /> }

                    {/* edit header]
                    <div className="flex justify-between w-full"> 
                        <div className="flex flex-row ">
                            <div className="font-bold text-4xl">문의하기 관리</div>
                        </div>
                        <div className="flex flex-row space-x-3">
                            <EditButton onClickFunction={()=>setShowPreview(!showPreview)} btnName={"미리보기"} />
                            <EditButton onClickFunction={editInquiryData} btnName={"수정하기"}/>
                        </div>
                    </div>




                    
                </div> */}

                <div className="flex flex-row justify-between mt-3">
                    <p className="text-xl font-semibold">문의하기</p>
                    <div className="flex flex-row space-x-3">
                        <IndigoRoundButton onClickFunction={editInquiryData}  btnName={"저장하기"} /> 
                    </div>
                    
                </div>
                {/* <IndigoRoundButton onClickFunction={() => setOpenImageLibrary(true)}  btnName={"저장하기"} />  */}
                {/* <div className="mt-3 flex flex-row space-x-2">
                { selectedSection==CafeSection.subTitle ? <IndigoRoundButton btnName={"카페 도천 소개글"} /> : <IndigoOutlineRoundButton btnName={"카페 도천 소개글"} onClickFunction={()=>onClickMoveSection(CafeSection.subTitle)}  />}
                { selectedSection==CafeSection.mainImgs ? <IndigoRoundButton btnName={"메인 소개 이미지"} /> : <IndigoOutlineRoundButton btnName={"메인 소개 이미지"} onClickFunction={()=>onClickMoveSection(CafeSection.mainImgs)} />}
                { selectedSection==CafeSection.menus ? <IndigoRoundButton btnName={"메뉴 관리"} /> : <IndigoOutlineRoundButton btnName={"메뉴 관리"} onClickFunction={()=>onClickMoveSection(CafeSection.menus)}  />}
                { selectedSection==CafeSection.specials ? <IndigoRoundButton btnName={"카페 특징 관리"} /> : <IndigoOutlineRoundButton btnName={"카페 특징 관리"} onClickFunction={()=>onClickMoveSection(CafeSection.specials)}  />}
                </div> */}
                <div className="mt-3">
                                        {/* content */}
                                        <EditBox title="주소 내용 수정하기">
                        <p className="font-bold">카카오 주소 수정</p>
                        <div className="flex flex-row space-x-3 mt-2">
                            <p>위도 </p>
                            <p><CustomTextInput placeholder={address} textRef={longRef} /></p>
                        </div>
                        <div className="flex flex-row space-x-3 mt-2">
                            <p>경도 </p>
                            <p><CustomTextInput placeholder={address} textRef={lnagRef} /></p>
                        </div>

                        <p className="font-bold mt-2 w-">상세 주소</p>
                        <CustomTextInput width="w-80" placeholder={address} textRef={addressTextRef} />
                    </EditBox>

                    <EditBox title="자주 묻는 질문 관리하기">
                        { qnaList.length >= 10 && <small>최대 질문갯수는 10개입니다.</small> }

                        <div className="flex flex-rol space-x-2">
                            <FilledIndigoBadge onClickFunction={()=>setOpenEditSort(true)} name={"질문 순서 관리하기"} />
                            <div aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal" data-hs-overlay="#hs-basic-modal">
                                { qnaList.length >= 10 ?
                                <>
                                    <DisabledEditButton  btnName={"질문 추가하기"}/> 
                                    </>
                                    : <FilledIndigoBadge onClickFunction={()=>setOpenAddQna(true)} name={"질문 추가하기"}/>
                                }
                            </div>
                        </div>

                        { qnaList && qnaList.map( ( qna : any, index : number ) => {
                            return(
                                <div className="mt-4" key={`qnaList-Show-${index}`}>
                                    <p className="font-bold flex flex-row space-x-2"><span>질문 {index+1}</span>
                                        <FilledIndigoBadge name={"수정하기"} onClickFunction={()=>openEditModal(qna)} />
                                        <FilledIndigoBadge name={"삭제하기"} onClickFunction={()=>deleteInquiryData(qna.id)} />
                                    </p>
                                    <div className="mt-3 flex flex-col space-y-2">
                                        <div className="flex flex-row space-x-3">
                                            <p>Q. </p>
                                            <p>{qna.question}</p>
                                        </div>
                                        <div className="flex flex-row space-x-3">
                                            <p>A. </p>
                                            <p>{qna.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        

                    </EditBox>
                </div>
            </AdminWrapper>

            { openAddQna && <div id="hs-basic-modal" className=" size-full fixed top-0 start-0 opacity-100 overflow-x-hidden transition-all overflow-y-auto pointer-events-none" role="dialog" aria-labelledby="hs-basic-modal-label">
                        <div className="h-full w-full bg-black absolute bg-opacity-25 overflow-y-hidden"></div>
                        <div className="fixed top-0 left-1/3 sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                            <div className="flex flex-col  shadow-sm rounded-xl pointer-events-auto bg-white">
                            <div className="flex justify-between items-center py-3 px-4 ">
                                <h3 id="hs-basic-modal-label" className="font-bold ">
                                질문 추가하기
                                </h3>
                                <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border-0 border-0-transparent hover:bg-point-darker focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none " onClick={()=>setOpenAddQna(false)}>
                                <span className="sr-only">Close</span>
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                                </button>
                            </div>
                            <div className="p-4 overflow-y-auto">
                                <small>질문은 최대 10개까지 추가할 수 있습니다.</small>
                                <div className=" flex flex-col space-y-2">
                                    <CustomTextInput placeholder={"질문"} textRef={questionRef} />
                                    <CustomTextInput placeholder={"답변"} textRef={answerRef} />
                                </div>
                                <div className="mt-3 w-full flex justify-center space-x-3">
                                    <FilledIndigoBadge onClickFunction={()=>setOpenAddQna(false)} name={"닫기"} />
                                    <FilledIndigoBadge onClickFunction={()=>addNewQna()} name={"질문 추가하기"} />
                                </div>
                            </div>
                            </div>
                        </div>
                    </div> }

                    { openEditQna && <div id="hs-basic-modal" className=" size-full fixed top-0 start-0 opacity-100 overflow-x-hidden transition-all overflow-y-auto pointer-events-none" role="dialog" aria-labelledby="hs-basic-modal-label">
                        <div className="h-full w-full bg-black absolute bg-opacity-25 overflow-y-hidden"></div>
                        <div className="fixed top-0 left-1/3 sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                            <div className="flex flex-col  shadow-sm rounded-xl pointer-events-auto bg-white">
                            <div className="flex justify-between items-center py-3 px-4 ">
                                <h3 id="hs-basic-modal-label" className="font-bold ">
                                {editTarget.id}번째 질문 수정하기
                                </h3>
                                <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border-0 border-0-transparent hover:bg-point-darker focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none " onClick={()=>setOpenEditQna(false)}>
                                <span className="sr-only">Close</span>
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                                </button>
                            </div>
                            <div className="p-4 overflow-y-auto">
                                <div className=" flex flex-col space-y-2">
                                    <CustomTextInput placeholder={"질문"} textRef={questionEditRef} />
                                    <CustomTextInput placeholder={"답변"} textRef={answerEditRef} />
                                </div>
                                <div className="mt-3 w-full flex justify-center space-x-3">
                                    <IndigoRoundButton onClickFunction={()=>setOpenEditQna(false)} btnName={"닫기"} />
                                    <IndigoRoundButton onClickFunction={()=>editQna()} btnName={"수정하기"} />
                                </div>
                            </div>
                            </div>
                        </div>
                    </div> }

                    { openEditSort && <div id="hs-basic-modal" className=" size-full fixed top-0 start-0 opacity-100 overflow-x-hidden transition-all overflow-y-auto pointer-events-none" role="dialog" aria-labelledby="hs-basic-modal-label">
                        <div className="h-full w-full bg-black absolute bg-opacity-25 overflow-y-hidden"></div>
                        <div className="fixed top-0 left-1/3 sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                            <div className="flex flex-col  shadow-sm rounded-xl pointer-events-auto bg-white">
                            <div className="flex justify-between items-center py-3 px-4 ">
                                <h3 id="hs-basic-modal-label" className="font-bold ">
                                질문 순서 변경하기
                                </h3>
                                <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border-0 border-0-transparent hover:bg-point-darker focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none " onClick={()=>setOpenEditSort(false)}>
                                <span className="sr-only">Close</span>
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                                </button>
                            </div>
                            <div className="p-4 overflow-y-auto ">
                                <div className="grid grid-cols-5 gap-2">

                                <div className="col-span-3">질문</div>
                                <div className="col-span-1">변경 전 순서</div>
                                <div className="col-span-1">변경 후 순서</div>

                                    {qnaList.map((qna : any, index : number)=> {
                                        return(
                                            <>
                                            <div className="col-span-3">{qna.question}</div>
                                            <div className="text-center">{qna.sortOrder}</div>
                                            <div><CustomNumberInput onChangeFunction={(event : any)=>onSortChange(event,qna.sortOrder)}  placeholder={""} textRef={undefined} /></div>
                                            </>
                                        )
                                    })}

                                </div>
                                <div className="mt-3 w-full flex justify-center space-x-3">
                                    <IndigoRoundButton onClickFunction={()=>setOpenEditSort(false)} btnName={"닫기"} />
                                    <IndigoRoundButton onClickFunction={()=>editSortOrder()} btnName={"수정"} />
                                </div>
                            </div>
                            </div>
                        </div>
                    </div> }
        </>
    )
}

