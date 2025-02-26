"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useRef, useState } from "react";
import { HeaderMenu } from "@/lib/enums";

// Define the type for the context
interface JoyfulContextType {
    isAdmin: boolean;
    setIsAdmin:Dispatch<SetStateAction<boolean>>;
    openEditModal: boolean;
    setOpenEditModal:Dispatch<SetStateAction<boolean>>;
    editModalTitle: string;
    setEditModalTitle:Dispatch<SetStateAction<string>>;
    editVal : any;
    editOption : number;
    setEditOption : Dispatch<SetStateAction<number>>;
    editModalContent : string;
    setEditModalContent : Dispatch<SetStateAction<string>>;
    isAdminRef : any;
    openAdminLoading : boolean;
    currHeaerMenu : HeaderMenu; 
}

// Create Context with a default undefined value to enforce proper usage
const JoyfulContext = createContext<JoyfulContextType | undefined>(undefined);

export function JoyfulContextProvider({ children }: { children: React.ReactNode }){
    const [ isAdmin, setIsAdmin ] : [ boolean , Dispatch<SetStateAction<boolean>>] =  useState( false );
    const [ openEditModal, setOpenEditModal ] : [ boolean , Dispatch<SetStateAction<boolean>>] =  useState( false );
    const [ editModalTitle, setEditModalTitle ] : [ string , Dispatch<SetStateAction<string>>] =  useState( '' );
    const [ editOption, setEditOption ] : [ number , Dispatch<SetStateAction<number>>] =  useState( 0 );
    const [ editModalContent, setEditModalContent ] : [ string , Dispatch<SetStateAction<string>>] =  useState( '' );
    const editVal = useRef<any>();
    const isAdminRef = useRef(isAdmin);
    let openAdminLoading : boolean = false;
    let currHeaerMenu : HeaderMenu = HeaderMenu.home;

    return (
        <JoyfulContext.Provider value={{
            isAdmin, 
            setIsAdmin, 
            openEditModal, 
            setOpenEditModal, 
            editModalTitle, 
            setEditModalTitle,
            editVal, 
            editOption, 
            setEditOption,
            editModalContent, 
            setEditModalContent,
            isAdminRef, 
            openAdminLoading,
            currHeaerMenu
          }} >
            {children}
        </JoyfulContext.Provider>
    )
}

// Custom Hook for Using Context
export function useJoyfulContext() {
  const context = useContext(JoyfulContext);
  
  if (!context) {
    throw new Error("useJoyfulContext must be used within a RoomContextProvider");
  }

  return context;
}
