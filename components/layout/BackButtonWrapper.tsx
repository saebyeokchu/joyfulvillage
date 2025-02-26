import { IndigoRoundButton } from "../ui/Button";

const BackButtonWrapper = ({
    btnName,
    onBtnClickFunction
} : {
    btnName : string,
    onBtnClickFunction : any
}) => (
    <div className="container px-5 md:mx-auto md:px-0 flex justify-end border-0 border-red-400  ">
        <IndigoRoundButton btnName={btnName} onClickFunction={onBtnClickFunction}/>
    </div>
    // container mx-5 md:mx-auto
)

export default BackButtonWrapper;