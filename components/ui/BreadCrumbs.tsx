import { Crumb } from "@/types/Types"

export default function BreadCrumbs({
    crumbs
}:{
    crumbs : Crumb[]
}){
    return(
        <ol className="flex flex-row  items-center whitespace-nowrap">
                <li className="flex flex-row items-center">
                    {crumbs.map((crumb : Crumb, index : number)=> 
                    <span className="flex flex-row" key={`crumb-title-${index}`} >
                        <a key={`crumb-title-${index}`} className="flex items-center text-sm text-gray-500 hover:text-yellow-600 focus:outline-none focus:text-yellow-600 dark:text-neutral-500 dark:hover:text-yellow-500 dark:focus:text-yellow-500" href={crumb.link}>
                            {crumb.title}
                        </a>
                        { index != (crumbs.length - 1) && <svg key={`crumb-arrow-${index}`} className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6"></path>
                        </svg>}
                    </span>)}
                </li>
            </ol>
    )
}