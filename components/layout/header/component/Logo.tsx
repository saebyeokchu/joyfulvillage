import {  Logo } from "@/lib/svgs"

const HeaderLogos = ({width = 184, height = 57} : {width? : number, height? : number}) => (
    <>
        <div className="flex md:hidden ">
           <Logo width={84} height={50}/>
        </div>
        <div className="hidden md:flex ">
            <Logo width={width} height={height} />
        </div>
    </>
)

export default HeaderLogos;

