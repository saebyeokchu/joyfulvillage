"use client";

import { ProgramClass } from "@/class/ProgramClass";
import { StayType } from "@/types";
import { AboutType } from "@/types/About";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Define the type for the reservation state
interface ReserveState {
  startDate: any;
  endDate: any;
}

// Define the type for the context
interface StayContextType {
  targetStay: StayType.Stay | undefined;
  targetOption: StayType.Option | undefined;
  targetRoom : StayType.Room | undefined;
}

// Create Context with a default undefined value to enforce proper usage
const StayContext = createContext<StayContextType | undefined>(undefined);

// Provider Component
export function StayContextProvider({ children }: { children: ReactNode }) {
  const targetStay : StayType.Stay  | undefined = undefined;
  const targetOption : StayType.Option  | undefined = undefined;
  const targetRoom : StayType.Room  | undefined = undefined;

  return (
    <StayContext.Provider value={{ targetStay, targetOption, targetRoom }}>
      {children}
    </StayContext.Provider>
  );
}

// Custom Hook for Using Context
export function useStayContext() {
  const context = useContext(StayContext);
  
  if (!context) {
    throw new Error("useStayContext must be used within a RoomContextProvider");
  }

  return context;
}