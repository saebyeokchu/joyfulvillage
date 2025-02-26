// "use client"

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image"

// import { SoksoError } from "@/lib/messages";

// const DefaultOption = ( { name, onClickFunction } : { name : string, onClickFunction : any } ) => 
// <div onClick={onClickFunction} className="flex justify-center text-green bg-white w-32 h-8 pt-1 cursor-pointer">
//     {name}
// </div>

// const SelectedOption = ( { name } : { name : string } ) => 
// <div className="flex justify-center bg-green text-white w-32 h-8 pt-1 cursor-pointer">
//     {name}
// </div>

// function SoksoList({
//     parentSokso,
//     soksos,
// }:{
//     parentSokso : Sokso,
//     soksos : Sokso[]
// }){
//     const router = useRouter();
//     const soksoContext = useSoksoContext();

//     const onClickGoToDetail = (sokso : Sokso) => {
//         if(!sokso.soksoDetail_Id){
//             window.alert(SoksoError.noSoksoDetail);
//             return;
//         }else{
//             if(parentSokso && sokso){
//                 soksoContext.currentSokso.setSokso(sokso);
//                 soksoContext.parentSokso.setSokso(parentSokso)
//                 // soksoContext.currentSoksoDetail.setSoksoDetail(soksoDetail);
//                 router.push(`${parent}/${sokso.id}`);
//             }
//         }
//     }

//     return (
//         <>
//             {/* head breadcrumble */}
//             <BreadCrumbs crumbs={[{title:'숙소',link:'/sokso'},{ title: (parentSokso && parentSokso.name)  || '' ,link:'/'}]} />

//             {/* title */}
//             <div className="flex w-full text-center justify-center content-center mt-5 md:mt-0">
//                 <p className="text-3xl font-bold">{parentSokso && parentSokso.name}</p>
//             </div>

//             {/* Mobile opitions */}
//             <div className="flex flex-row md:hidden space-x-3 w-full justify-center mt-3">
//                 <OutlineBadgeGreen name={"객실"} />
//                 <OutlineBadgeGreen name={"옵션"} />
//             </div>

//             <div className="min-h-[38rem] mt-14 md:mt-28">
//                 <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
//                     { soksos.length > 0 && soksos.map( (sokso : Sokso, index : number) => 
//                         <div key={`sokso-wrapper-${index}`} className="group flex flex-col h-full items-center text-center">
//                             {/* image part */}
//                             <div className="w-80 h-64 border-0">
//                                 <Image className="object-cover" src={"/images/"+sokso.mainImg} width={350} height={230} alt={`sokso-main-image-${index}`} />
//                                 <p className="w-full h-8 flex cursor-pointer" >
//                                     <span className="mx-auto pt-2 text-xs bg-white w-1/2" onClick={()=>sokso.reserveLink && commonService.OpenWindow(sokso.reserveLink)}>예약하기</span>
//                                     <span className="mx-auto pt-2 text-xs bg-green w-1/2 text-white" onClick={()=> onClickGoToDetail(sokso)}>상세보기</span>
//                                 </p>
//                             </div>
//                             {/* explanation part */}
//                             <div className="mt-1 w-80 flex flex-col " >
//                                 <span className="text-lg">{sokso.name}</span>
//                                 <span className="text-sm mt-1">{sokso.introduction}</span>
//                             </div>
//                         </div>
//                     ) }
//                 </div>
//             </div>
//         </>
//     )
// }

// function OptionList(){
//     return(
//         <>
//             <div className="flex flex-col w-full text-center justify-center content-center mt-5 md:mt-0">
//                 <p className="text-3xl font-bold">옵션</p>
//                 <p className="mt-6">아래 옵션을 통해 숲에서 더 풍성한 추억을 쌓아보세요</p>
//             </div>

//             {/* section 1 */}
//             <div className="mt-12 flex flex-col text-center w-full justify-center">
//                 <p className="text-2xl">[바베큐 그릴 & 글램핑 세트]</p>

//                 {/* section 1 grid barbecue2.jpeg */}
//                 <div className="grid grid-cols-2 mt-10">
//                     <div>
//                         <p className="text-lg">A. 바베큐 그릴</p>
//                         <Image src={"/images/barbecue2.jpeg"} width={520} height={350} alt={""} className="mt-3" />
//                         <div className="text-lg mt-8">
//                             <p>1. 바베큐 그릴 대여</p>
//                             <p>자연 속에서 맛있는 바베큐를 즐겨보세요!</p>
//                         </div>
//                         <p className="mt-5 text-lg text-left" >
//                             포함사항: 캠핑 테이블2, 캠핑의자2, 화로숯(착화제 포함), 그릴망,<br />
//                             점화도구, 집게, 장갑, 야외 조명1 <br />
//                             대여비용: 20,000원<br />
//                             *원하는 시간대에 직접 불을 피워 사용하시면 됩니다.<br />
//                         </p>
//                     </div>
//                     <div>
//                         <p className="text-lg">B. 글램핑 세트</p>
//                         <Image src={"/images/barbecue1.jpeg"} width={520} height={350} alt={""} className="mt-3" />
//                         <div className="text-lg mt-8">
//                             <p>2. 글램핑 용품 대여</p>
//                             <p>맛있는 바베큐와 함께 편안한 글램핑 분위기를 연출해보세요!</p>
//                         </div>
//                         <p className="mt-5 text-lg text-left" >
//                         포함사항: 나무선반, 캠핑용 식기(조리도구, 그릇, 컵), 구이바다 스토브, 미니 조명, 랜턴, 주전자, 원목도마, 바람마개, 장작, 오로라 가루, 바베큐 그릴 포함 사항(캠핑 테이블2, 캠핑의자2, 화로, 숯(착화제 포함), 그릴망, 점화 도구, 집게, 장갑, 야외 조명1<br/>
//                         대여비용: 40,000원<br/>
//                         *자유롭게 셋팅 및 이용 / 원하는 시간대에 직접 불을 피워 사용하시면 됩니다.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* section 2*/}
//             <div className="mt-24 flex flex-col text-center w-full justify-center">
//                 <p className="text-2xl">[야외 풀장]</p>

//                 {/* section 1 grid barbecue2.jpeg */}
//                 <div className="grid grid-cols-2 mt-10">
//                     <div>
//                         <p className="text-lg">A. 야외 풀장</p>
//                         <Image src={"/images/image.png"} width={520} height={350} alt={""} className="mt-3" />
//                         <div className="text-lg mt-8">
//                             <p>숲 속에서 즐기는 여름 물놀이!</p>
//                             <p>푸른 풍경을 바라보며 프라이빗한 물놀이를 즐겨보세요!</p>
//                         </div>
//                         <p className="mt-5 text-lg text-left" >
//                             대형 풀장(수용 인원: 최대 성인 10명)<br/>
//                             운영기간: 7~8월<br/>
//                             선착순 이용 가능(예약순)<br/>
//                             *가격: 인당 5,000원(숙소 이용시)/ 숙소 미 이용시 10,000원<br/>
//                         </p>
//                     </div>
//                     <div>
//                         <p className="h-8" ></p>
//                         <Image src={"/images/image2.png"} width={520} height={350} alt={""} className="mt-3" />
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default function SoksoPage(){


//     const [ soksos, setSoksos ] = useState<Sokso[]>([]);
//     const [ parentSokso, setParentSokso ] = useState<Sokso | null>(null);
//     const [ option, setOption ] = useState<string>("객실");

//     const params = useParams();
//     const { parent } = params;

//     useEffect(()=>{
//         init();
//     },[]);

//     const init = () => {
//         if(typeof(parent) == 'string'){ //url check
//             //call parent info
//             soksoService.getSoksoById( parseInt(parent)).then((response : any)=>{
//                 setParentSokso(response);
//             });

//             //
//             soksoService.getSoksoByLevelAndGroup(2, parseInt(parent)).then((response : any)=>{
//                 console.log(response)
//                 setSoksos(response);
//             });
//         }
//     }

    
//     return(
//         <div className="relative flex flex-col my-16 mx-12 md:mx-44 md:my-32 md:flex md:justify-between ">
            
//             {/* 120 x 70 */}
//             <div className="hidden fixed left-8 md:flex md:flex-col">
//                 { option == "객실" ? <SelectedOption name="객실" /> : <DefaultOption name="객실" onClickFunction={()=>setOption("객실")}  /> }
//                 { option == "옵션" ? <SelectedOption name="옵션" /> : <DefaultOption name="옵션" onClickFunction={()=>setOption("옵션")} /> }
//             </div>

           
//             { option == "객실" && parentSokso && <SoksoList parentSokso={parentSokso} soksos={soksos} /> }
//             { option == "옵션" && <OptionList /> }
//         </div>
//     )
// }