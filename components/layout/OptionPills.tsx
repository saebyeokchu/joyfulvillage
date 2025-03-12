import { Pill } from "@/types/Types"

const DefaultOption = ( { name, onClickFunction } : { name : string, onClickFunction : any } ) => 
    <button onClick={onClickFunction} className="flex justify-center text-sm md:text-base text-white  items-center rounded-3xl bg-transparent w-[57px] h-[30px]" style={{color:'#4B5A62'}}>
        {name}
    </button>
    
    
const SelectedOption = ( { name } : { name : string } ) => 
    <button className="flex justify-center text-sm md:text-base text-white items-center rounded-3xl w-[57px] h-[30px]" style={{backgroundColor:'#4B5A62'}}>
        {name}
    </button>



const OptionPills = ({
    pills,
    currentPill
} : { 
    pills : Pill[],
    currentPill : any
}) => {
    return(
        <div className="container mx-auto py-7 px-5 md:px-14">
            {/* 120 x 70 */}
            <div className="flex flex-row space-x-3 font-pretendard font-bold">
                {pills.map((p : Pill, index : number) => (
                    currentPill == p.targetVal ? <SelectedOption key={`selected-option-${index}`} name={p.name} />  : <DefaultOption  key={`default-option-${index}`}  name={p.name} onClickFunction={p.onClickFunction}  /> 
                ))}
            </div>
        </div>
    )
}

export default OptionPills;