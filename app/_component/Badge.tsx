const FilledBadge = ({
    name,
    onClickFunction
}:{
    name : string,
    onClickFunction? : any

}) =>  <span onClick={onClickFunction} className="cursor-pointer inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-500 hover:bg-yellow-700 text-white">{name}</span>

const OutlineBadge = ({
    name,
    onClickFunction
}:{
    name : string,
    onClickFunction? : any
}) =>  <span onClick={onClickFunction} className="cursor-pointer inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-yellow-500 hover:bg-yellow-500 hover:text-white">{name}</span>

const FilledBadgeGreen = ({
    name,
    onClickFunction
}:{
    name : string,
    onClickFunction? : any

}) =>  <span onClick={onClickFunction} className="cursor-pointer inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green  text-white">{name}</span>

const OutlineBadgeGreen = ({
    name,
    onClickFunction
}:{
    name : string,
    onClickFunction? : any
}) =>  <span onClick={onClickFunction} className="cursor-pointer inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium border border-green hover:bg-lime-900 hover:text-white">{name}</span>


export {
    FilledBadge,
    OutlineBadge,
    FilledBadgeGreen,
    OutlineBadgeGreen
}