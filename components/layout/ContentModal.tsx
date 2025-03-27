import { IndigoRoundButton } from "../ui/Button";

const ContentModal = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => (
    <>
        <div className="w-full size-full fixed top-0 start-0 z-[80]  opacity-60 bg-black "></div>
        <div className="hs-overlay size-full fixed top-0 start-0 z-[80]  overflow-x-hidden transition-all overflow-y-auto " role="dialog" aria-labelledby="hs-basic-modal-label" >
            <div className="z-[90] sm:max-w-lg sm:w-full m-3 sm:mx-auto shadow-sm rounded-xl bg-white p-2">
                <div className="relative flex flex-col   pointer-events-auto  min-h-44">
                    {children}
                </div>
                
            </div>
        </div> 
    </>
)

export default ContentModal;