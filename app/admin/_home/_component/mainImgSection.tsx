import { useRef, useState } from "react";
import { FilledBadge } from "@/app/_component";
import { EditBox, ImageLibraryModal } from "../.@/component";

export default function MainImgSection(){
    const mainImgRef = useRef<any>();
    const mainImgPreviewRef = useRef<any>();

    const [openImageLibrary, setOpenImageLibrary] = useState(false);
    const [previewImgSrc, setPreviewImgSrc] = useState<string | null>(null);

    const onClickOpenImageLibrary = () => {
        setOpenImageLibrary(true);
    }

    const onClickAddAction = (imgSrc : string) => {
        setPreviewImgSrc(imgSrc);
        return true;
    }

    const test = () => {
        // images 이미지 resource로 옮기기
    }
    
    return(
        <EditBox title="메인이미지 교체하기">
            <button onClick={test}>테스트 버튼</button>
            <div className="mb-5">
                <p><small>메인이미지는 <strong className="text-red-600">투명도 관리</strong>를 위해 jpg, jpeg만 등록 가능합니다</small></p>
            </div>
            {/* <FileInput imgRef={mainImgRef} acceptStr="image/jpg, image/jpeg" onChangeFunction={(event : any) => onChangeImgRef(event, mainImgPreviewRef)} /> */}
            <FilledBadge name={"이미지 교체하기"} onClickFunction={onClickOpenImageLibrary} />

            { previewImgSrc ?
                <img src={`/images/${previewImgSrc}`} className="w-72 mt-5" />
                    :
                <img src="/system/home/mainImg.jpg" className="w-72 mt-5" ref={mainImgPreviewRef} />
            }
            


            { openImageLibrary && <ImageLibraryModal onClickCloseModal={() => setOpenImageLibrary(false)} onClickAddAction={onClickAddAction} /> }

        </EditBox>
    )
}