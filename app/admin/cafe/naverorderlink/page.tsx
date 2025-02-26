"use client"


import { CustomTextInput, EditButton, FilledBadge, OutlineBadge } from "@/components/ui";
import { useRef } from "react";
import AdminWrapper from "../../component/AdminWrapper";
import CafeWrapper from "../component/CafeWrapper";
import { IndigoRoundButton } from "@/components/ui/Button";
import { Loading, SomeErrorPage } from "@/components/layout";
import useSWR from "swr";
import { Cafe } from "@/types/Types";
import { GetCafeDataBySection } from "@/lib/url";
import { getFetcher, postFetcher } from "@/lib/fetcher";
import { CafeSection } from "@/lib/enums";
import { useRouter } from "next/navigation";
import { GeneralError } from "@/lib/messages";
import { cafeService } from "@/service";


export default function CafeNaverOrderLink(){

    const router = useRouter();
    const linkRef = useRef<any>(null);
    const onClickEditBtn = async () => {
        const link = linkRef.current;

        if(link && link.value){
            const response = await cafeService.updateCafe({ section : CafeSection.naverorderlink, content : link.value});
            if(response){
                window.alert(GeneralError.successfullySaved);
            }
        }else{
            window.alert("링크"+ GeneralError.fillTheInput)
        }
    };

    // const { data, error, mutate } = useSWR<[string, any], any>(
    //     [GetCafeDataBySection, { section : CafeSection.subTitle}],
    //     postFetcher
    // );

    const { data, error, mutate  } = useSWR<Cafe[]>(
        GetCafeDataBySection + CafeSection.naverorderlink,
        getFetcher
    );

    console.log(data);
      
    if (!data) {
        return <AdminWrapper>
            <Loading />
        </AdminWrapper>;
    }

    if (error) {
        return (
            <SomeErrorPage onClickFunction={() => router.push("/admin")} error={error} />
        );
    }



    return (
        <>
            <AdminWrapper>
                <CafeWrapper subTitle="네이버 주문 링크" buttons={[{onClickFunction : onClickEditBtn, btnName : "저장하기"}]}>
                    <CustomTextInput inputVal={data[0].content ?? ""} width="w-2/3" textRef={linkRef} placeholder={"카페 도천 네이버 주문 링크"} csProps={"border-0"} />
                </CafeWrapper>
                {/* <div className="flex flex-col space-y-2 mt-3">
                    <div className="flex flex-row justify-between">
                        <p className="text-xl font-semibold"></p>
                        <IndigoRoundButton onClickFunction={onClickEditBtn}  btnName={"저장하기"} /> 
                    </div>
                </div> */}
                {/* <div className="mt-3 flex flex-col space-y-7">
                    <div className="flex flex-col space-y-2">
                        <p className="text-xl font-semibold">카페 도천 소개글</p>
                        <CustomTextInput width="w-2/3" textRef={subTitleRef} placeholder={"카페 도천 소개 문구"} csProps={"border-0"} />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <p className="text-xl font-semibold">카페 도천 이미지</p>
                        <ManageMainImg cafeContent={cafeContent} updateCafeContent={updateCafeContent} />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <p className="text-xl font-semibold">카페 도천 메뉴판 이미지 수정하기</p>
                        <IndigoRoundButton btnName={"수정하기"} />
                        <ManageMenus menus={menus} updateCafeContent={updateCafeContent} />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <p className="text-xl font-semibold">카페 도천 특별메뉴 수정하기</p>
                        <IndigoRoundButton btnName={"수정하기"} />
                        <ManageSpecials specials={specials} updateCafeContent={updateCafeContent} newSpecial={newSpecial} />
                    </div>
                </div> */}
            </AdminWrapper>
           
            {/* edit header */}
            {/* <div className="flex justify-between w-full"> 
                <div className="flex flex-row ">
                    <div className="font-bold text-4xl">카페 도천 관리</div>
                </div>
                <div className="flex flex-row space-x-3">
                    <EditButton onClickFunction={()=>setShowPreview(!showPreview)} btnName={"미리보기"} />
                    <EditButton onClickFunction={onClickEditBtn} btnName={"수정하기"} />
                </div>
            </div>
            <div className="mt-2 flex text-right w-full justify-end">
                <small >섹션을 이동하기전 변경사항을 저장하여야 정보가 손실되지 않습니다.</small>
            </div> */}

            {/* middle section */}
            
        </>
    )
}