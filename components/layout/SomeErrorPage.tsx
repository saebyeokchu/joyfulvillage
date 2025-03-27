import { GrayRoundButton, IndigoRoundButton } from "../ui/Button";

const SomeErrorPage = ({
    onClickFunction,
    error,
    btnName = "돌아가기"
}:{
    onClickFunction : any,
    error : string,
    btnName ? : string
}) => <div className="relative max-w-[85rem] h-screen mx-auto  my-10">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-center flex-col justify-center items-center space-y-3">
        <p>{error}</p>
        <IndigoRoundButton onClickFunction={onClickFunction} btnName={btnName} />
    </div>
</div>

export default SomeErrorPage;