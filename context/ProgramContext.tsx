"use client";

import { ProgramClass } from "@/class/ProgramClass";
import { Program } from "@/types/Types";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Define the type for the reservation state
interface ReserveState {
  startDate: any;
  endDate: any;
}

// Define the type for the context
interface ProgramContextType {
  currentProgram: ProgramClass;
  targetProgram: ProgramClass;
  targetProgram2: Program | undefined;
}

// Create Context with a default undefined value to enforce proper usage
const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

// Provider Component
export function ProgramContextProvider({ children }: { children: ReactNode }) {
  const currentProgram : ProgramClass = new ProgramClass();
  const targetProgram : ProgramClass = new ProgramClass();
  const targetProgram2 : Program | undefined = undefined;

  return (
    <ProgramContext.Provider value={{ currentProgram, targetProgram, targetProgram2 }}>
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