import { JoyfulContextProvider } from "./JoyfulContext";
import { ProgramContextProvider } from "./ProgramContext";
import { SoksoContextProvider } from "./SoksoContext";

export default function ContextProviders({ children }:{ children : React.ReactNode}){
    return(
        <JoyfulContextProvider>
            <SoksoContextProvider>
                <ProgramContextProvider>
                    {children}
                </ProgramContextProvider>
            </SoksoContextProvider>
        </JoyfulContextProvider>
    )
}