import { Pill } from "@/types/Types"

const DefaultOption = ( { name, onClickFunction } : { name : string, onClickFunction : any } ) => 
    <button onClick={onClickFunction} className="flex justify-center text-white w-14 h-7 items-center rounded-2xl bg-transparent" style={{color:'#4B5A62'}}>
        {name}
    </button>
    
    
const SelectedOption = ( { name } : { name : string } ) => 
    <button className="flex justify-center text-white w-14 h-7 items-center rounded-2xl" style={{backgroundColor:'#4B5A62'}}>
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
        <div className="max-w-[85rem] mx-auto">
            {/* 120 x 70 */}
            <div className="flex flex-row space-x-3 py-10 px-8 md:px-0">
                {pills.map((p : Pill) => (
                    currentPill == p.targetVal ? <SelectedOption name={p.name} /> : <DefaultOption name={p.name} onClickFunction={p.onClickFunction}  /> 
                ))}
            </div>
        </div>
    )
}

export default OptionPills;