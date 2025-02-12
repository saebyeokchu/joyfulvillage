import { useEffect, useState } from "react";
// import Wysiwyg from "../_component/Wysiwyg";
import dynamic from "next/dynamic";
import ImageLibraryModal from "../../_component/ImageLibraryModal";
import { Sokso, SoksoDetail } from "@/app/_data/Types";
import { soksoService } from "@/app/_service";
import { CustomTextInput, EditButton, FilledBadge, OutlineBadge } from "@/app/_component";
import { usePathname, useSearchParams } from "next/navigation";
const Wysiwyg = dynamic(() => import("../../_component/Wysiwyg"), { ssr: false });

export default function UpsertSoksoDetailPage({
} : {
}){
    const [content, setContent] = useState('');
    const [openImageLibrary, setOpenImageLibrary] = useState(false);
    const [sokso, setSokso] = useState<Sokso | null>(null);
    const [detailSokso, setDetailSokso] = useState<SoksoDetail | null>(null);
    const [option, setOption] = useState<string>("정보");

    const searchParams  = useSearchParams();
    const id = searchParams.get('id');

    useEffect(()=>{
        init();
    },[]);

    const init = () => {
        if(id){
            soksoService.getSoksoById(id).then((response : any)=>{
                console.log(response);
                setSokso(response);
                if(response.soksoDetail_Id){
                    setDetailSokso(response.soksoDetail_Id);
                    if(response.soksoDetail_Id.content){
                        setContent(response.soksoDetail_Id.content);
                    }
                }
            });
        }
        
    }

    const onClickAddAction = () => {

    }

    const onClickOpenImageLibrary = () => {
        setOpenImageLibrary(true);
    }
    
    return(
        <div>
            <div className="flex flex-row space-x-2 mt-5">
                { option == "정보" ? <FilledBadge name={"대표 정보 설정하기"} /> : <OutlineBadge name={"대표 정보 설정하기"} onClickFunction={()=>setOption("정보")} />}
                { option == "내용" ? <FilledBadge name={"내용 수정하기"} /> : <OutlineBadge name={"내용 수정하기"} onClickFunction={()=>setOption("내용")} />}
            </div>

            { option == "정보"  && <div>
                <div className="grid gap-4 mt-5">

                    {/* <div className="sm:col-span-4">
                        <label className="inline-block text-lg font-bold text-gray-800 mt-2.5 dark:text-neutral-200">
                            숙소 이름(최대 10자 권장)
                        </label>
                    </div>

                    <div className="sm:col-span-8">
                        <div className="flex items-center gap-5">
                            <CustomTextInput placeholder={"숙소이름"} textRef={undefined} csProps="w-48" />
                        </div>
                    </div> */}

                    <div className="sm:col-span-4">
                        <label className="inline-block text-lg font-bold  text-gray-800 mt-2.5 dark:text-neutral-200">
                            대표 이미지 설정 (최대 3개)
                        </label>
                    </div>

                    <div className="sm:col-span-8">
                        <div className="flex flex-col items-start gap-5">
                        { detailSokso && detailSokso.topImages && detailSokso.topImages.length < 3 &&
                            <EditButton onClickFunction={onClickOpenImageLibrary} csProps="w-fit" btnName={"이미지 추가하기"} />
                        }
                        { detailSokso && detailSokso.topImages &&
                            detailSokso.topImages.map(( imgSrc : string, index : number ) =>
                                <p key={`detail-top-image-${index}`}><span className="mr-3">이미지 : {imgSrc} </span><FilledBadge name={"수정하기"} onClickFunction={onClickOpenImageLibrary} /></p>
                            ) }
                        
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label className="inline-block  text-lg font-bold text-gray-800 mt-2.5 dark:text-neutral-200">
                            상세 이미지 설정
                        </label>
                    </div>

                    <div className="sm:col-span-8">
                        <div className="flex flex-col items-start gap-5">
                        <EditButton onClickFunction={onClickOpenImageLibrary} csProps="w-fit" btnName={"이미지 추가하기"} />
                        { detailSokso && detailSokso.topImages &&
                            detailSokso.contentImages.map(( imgSrc : string, index : number ) =>
                                <p key={`detail-content-image-${index}`}><span className="mr-3">이미지 : {imgSrc} </span><FilledBadge name={"수정하기"} onClickFunction={onClickOpenImageLibrary} /></p>
                            ) }
                        </div>
                    </div>
                  


                </div>
            </div> }
            
            
            { option == "내용"  && <div>
                <div>
                    <div className="font-bold text-xl my-5">소개글</div>
                    <Wysiwyg content={content} setContent={setContent} isImageAllowed={true} height={600} />
                </div>
            </div> }
                

            { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setOpenImageLibrary(false)} onClickAddAction={onClickAddAction} />}
            
        </div>
    )
}