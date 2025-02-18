import { GrayRoundButton } from "../ui/Button";

const Loading = ({
}:{
}) => <div className="relative max-w-[85rem] h-screen mx-auto  my-10">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex text-center flex-col justify-center items-center space-y-3">
        <p>Loading ...</p>
    </div>
</div>

export default Loading;