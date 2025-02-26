import { IndigoOutlineRoundButton, IndigoRoundButton } from "@/components/ui/Button";
import { CafeSection } from "@/lib/enums";
import { GeneralError } from "@/lib/messages";
import { cafeService } from "@/service";
import { Cafe } from "@/types/Types";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import AdminWrapper from "../../component/AdminWrapper";
import { Loading, SomeErrorPage } from "@/components/layout";
import { useRouter } from "next/navigation";
import { GetCafeData } from "@/lib/url";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type ButtonInfo = {
    onClickFunction : any, btnName : string
}

const CafeWrapper = ({
    subTitle,
    children,
    buttons
  }: Readonly<{
    subTitle : string,
    children: React.ReactNode;
    buttons : ButtonInfo[] 
  }>) => {
    const [ selectedSection, setSelectedSection ]= useState<CafeSection | null>(null);
    const [ showPreview, setShowPreview ]= useState<boolean>(false);
    const [ cafeContent, setCafeContent ] = useState<Cafe[]>([]);
    const [ menus , setMenus ] = useState<Cafe[]>([]);
    const [ specials , setSpecials ] = useState<Cafe[]>([]);
    const [ newSpecial , setNewSpecial ] = useState<Cafe>({section : CafeSection.specials, note : null, content : null, img : []});

    const subTitleRef = useRef<any>(null);
    const router = useRouter();

    // const { data, error, mutate  } = useSWR<Cafe[]>(
    //     GetCafeData,
    //     fetcher
    // );

    // if (!data) {
    //     return <div className="min-h-screen">
    //         <Loading />
    //     </div>;
    // }

    // if (error) {
    //     return (
    //         <SomeErrorPage onClickFunction={() => router.push("/admin")} error={error} />
    //     );
    // }

    const onClickEditBtn = async () => {
        const subTitle = subTitleRef.current;

        switch(selectedSection){
            case CafeSection.subTitle :
                if(subTitle && subTitle.value){
                    const response = await cafeService.updateCafe({ section : CafeSection.subTitle, content : subTitle.value});
                    if(response){
                        updateCafeContent();
                    }
                }
                break;
            case CafeSection.menus :
                if(menus){
                    console.log("update menus", menus);
                    let response : any  = null;
                    menus.map(async (menu : Cafe) => {
                        response = await cafeService.updateCafe(menu);
                    });

                    if(response){
                        updateCafeContent();
                    }
                }
                break;
            case CafeSection.specials :
                if(specials){
                    console.log("update specials", specials);
                    let response : any  = null;
                    //update
                    specials.map(async (menu : Cafe) => {
                        response = await cafeService.updateCafe(menu);
                    });

                    //created
                    console.log("CREATE specials", newSpecial);
                    if(newSpecial.note){
                        response = await cafeService.create(newSpecial);
                    }

                    if(response){
                        updateCafeContent();
                    }
                }
                break;
        }

        window.alert(GeneralError.success);
    }

    const updateCafeContent = async () => {
        await cafeService.getAll().then(async ( response : Cafe[] ) => {
            setCafeContent(response);

            //subtitle 설정하기 (처음에 나오는 페이지니까)
            // setInputContent(response);
            // setMenuContent(response);
            // setSpecialContent(response);
        })
    }

    
    return (<>
        <div className="flex flex-row justify-between mt-3">
            <p className="text-xl font-semibold">{subTitle}</p>
            <div className="flex flex-row space-x-3">
            {   
                buttons.map((button : ButtonInfo, index : number) => (
                    <IndigoRoundButton key={`cafe-wrapper-${index}`} onClickFunction={button.onClickFunction}  btnName={button.btnName} /> 
                ))
            }
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
            {children}
        </div>
    </>);
  }

export default CafeWrapper;