"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useRef, useState } from "react";

const JoyfulContext = createContext<
    [
        boolean, 
        Dispatch<SetStateAction<boolean>>,
        boolean, 
        Dispatch<SetStateAction<boolean>>,
        string, 
        Dispatch<SetStateAction<string>>,
        any,
        number, 
        Dispatch<SetStateAction<number>>,
        string, 
        Dispatch<SetStateAction<string>>,
        any
    ]>(
        [
            false,
            () => {},
            false,
            () => {},
            '',
            () => {},
            null,
            0,
            () => {},
            '',
            () => {},
            null
        ]
    );

export function JoyfulContextProvider({ children }: { children: React.ReactNode }){
    const [ isAdmin, setIsAdmin ] : [ boolean , Dispatch<SetStateAction<boolean>>] =  useState( false );
    const [ openEditModal, setOpenEditModal ] : [ boolean , Dispatch<SetStateAction<boolean>>] =  useState( false );
    const [ editModalTitle, setEditModalTitle ] : [ string , Dispatch<SetStateAction<string>>] =  useState( '' );
    const [ editOption, setEditOption ] : [ number , Dispatch<SetStateAction<number>>] =  useState( 0 );
    const [ editModalContent, setEditModalContent ] : [ string , Dispatch<SetStateAction<string>>] =  useState( '' );
    const editVal = useRef<any>();
    const isAdminRef = useRef(isAdmin);

    return (
        <JoyfulContext.Provider value={[ 
            isAdmin, setIsAdmin, openEditModal, 
            setOpenEditModal, editModalTitle, setEditModalTitle,
             editVal, editOption, setEditOption,
             editModalContent, setEditModalContent,
             isAdminRef ]} >
            {children}
        </JoyfulContext.Provider>
    )
}

export function useJoyfulContext() {
    const [ isAdmin, setIsAdmin, openEditModal, setOpenEditModal, editModalTitle, setEditModalTitle, editVal, editOption, setEditOption,editModalContent, setEditModalContent, isAdminRef  ] = useContext(JoyfulContext);
    return { isAdmin, setIsAdmin, openEditModal, setOpenEditModal, editModalTitle, setEditModalTitle, editVal, editOption, setEditOption, editModalContent, setEditModalContent, isAdminRef   };
}
