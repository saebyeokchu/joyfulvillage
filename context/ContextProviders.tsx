import { AboutContextProvider } from "./AboutContext";
import { JoyfulContextProvider } from "./JoyfulContext";
import { ProgramContextProvider } from "./ProgramContext";
import { SoksoContextProvider } from "./SoksoContext";
import { StayContextProvider } from "./StayContext";

export default function ContextProviders({ children }:{ children : React.ReactNode}){
    return(
        <JoyfulContextProvider>
            <SoksoContextProvider>
                <StayContextProvider>
                    <AboutContextProvider>
                        <ProgramContextProvider>
                            {children}
                        </ProgramContextProvider>
                    </AboutContextProvider>
                </StayContextProvider>
            </SoksoContextProvider>
        </JoyfulContextProvider>
    )
}