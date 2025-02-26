import { GrayRoundButton, IndigoRoundButton } from "../ui/Button";

const NotFound = ({
    onClickFunction
}:{
    onClickFunction : any
}) => <div className="relative max-w-[85rem] h-screen mx-auto  my-10">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-center flex-col justify-center items-center space-y-3">
        <p>요청하신 페이지가 발견되지 않았습니다.</p>
        <IndigoRoundButton onClickFunction={onClickFunction} btnName={"돌아가기"} />
    </div>
</div>

export default NotFound;