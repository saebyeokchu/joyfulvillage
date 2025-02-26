import { StayPillOption } from "@/lib/enums"

const DefaultOption = ( { name, onClickFunction } : { name : string, onClickFunction : any } ) => 
    <button onClick={onClickFunction} className="flex justify-center text-white w-14 h-7 items-center rounded-2xl bg-transparent" style={{color:'#4B5A62'}}>
        {name}
    </button>
    
    
const SelectedOption = ( { name } : { name : string } ) => 
    <button className="flex justify-center text-white w-14 h-7 items-center rounded-2xl" style={{backgroundColor:'#4B5A62'}}>
        {name}
    </button>

const OptionPills = ({
    option,
    onClickFunction
} : { 
    option : StayPillOption,
    onClickFunction : any
}) => {
    return(
        <div className="container mx-auto px-5 md:px-8">
            {/* 120 x 70 */}
            <div className="flex flex-row space-x-3 py-10 ">
                { option == StayPillOption.rooms ? <SelectedOption name="객실" /> : <DefaultOption name="객실" onClickFunction={onClickFunction}  /> }
                { option == StayPillOption.option ? <SelectedOption name="옵션" /> : <DefaultOption name="옵션" onClickFunction={onClickFunction} /> }
            </div>
        </div>
    )
}

export default OptionPills;