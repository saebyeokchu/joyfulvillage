import { GrayRoundButton, IndigoRoundButton } from "../ui/Button";

const SomeErrorPage = ({
    onClickFunction,
    error
}:{
    onClickFunction : any,
    error : string
}) => <div className="relative max-w-[85rem] h-screen mx-auto  my-10">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-center flex-col justify-center items-center space-y-3">
        <p>알 수 없는 오류가 발생하였습니다.</p>
        <p>{error}</p>
        <IndigoRoundButton onClickFunction={onClickFunction} btnName={"돌아가기"} />
    </div>
</div>

export default SomeErrorPage;