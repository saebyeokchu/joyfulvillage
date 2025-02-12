"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { SoksoDetail } from "../_data/Types";
import { SoksoDetailClass } from "../_data/_class/SoksoDetailClass";
import { SoksoClass } from "../_data/_class/SoksoClass";
import { ProgramClass } from "../_data/_class/ProgramClass";

// Define the type for the reservation state
interface ReserveState {
  startDate: any;
  endDate: any;
}

// Define the type for the context
interface ProgramContextType {
  currentProgram: ProgramClass;
}

// Create Context with a default undefined value to enforce proper usage
const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

// Provider Component
export function ProgramContextProvider({ children }: { children: ReactNode }) {
  const currentProgram : ProgramClass = new ProgramClass();

  return (
    <ProgramContext.Provider value={{ currentProgram }}>
      {children}
    </ProgramContext.Provider>
  );
}

// Custom Hook for Using Context
export function useProgramContext() {
  const context = useContext(ProgramContext);
  
  if (!context) {
    throw new Error("useProgramContext must be used within a RoomContextProvider");
  }

  return context;
}