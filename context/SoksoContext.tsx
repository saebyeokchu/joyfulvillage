"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { SoksoDetail } from "../_data/Types";
import { SoksoDetailClass } from "../_data/_class/SoksoDetailClass";
import { SoksoClass } from "../_data/_class/SoksoClass";

// Define the type for the reservation state
interface ReserveState {
  startDate: any;
  endDate: any;
}

// Define the type for the context
interface SoksoContextType {
  parentSokso: SoksoClass;
  currentSokso: SoksoClass;
  currentSoksoDetail: SoksoDetailClass;
}

// Create Context with a default undefined value to enforce proper usage
const SoksoContext = createContext<SoksoContextType | undefined>(undefined);

// Provider Component
export function SoksoContextProvider({ children }: { children: ReactNode }) {
  const parentSokso : SoksoClass = new SoksoClass();
  const currentSokso : SoksoClass = new SoksoClass();
  const currentSoksoDetail : SoksoDetailClass = new SoksoDetailClass();
  

  return (
    <SoksoContext.Provider value={{ parentSokso, currentSokso, currentSoksoDetail }}>
      {children}
    </SoksoContext.Provider>
  );
}

// Custom Hook for Using Context
export function useSoksoContext() {
  const context = useContext(SoksoContext);
  
  if (!context) {
    throw new Error("useSoksoContext must be used within a RoomContextProvider");
  }

  return context;
}