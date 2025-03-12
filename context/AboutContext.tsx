"use client";

import { ProgramClass } from "@/class/ProgramClass";
import { AboutType } from "@/types/About";
import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Define the type for the reservation state
interface ReserveState {
  startDate: any;
  endDate: any;
}

// Define the type for the context
interface AboutContextType {
  targetAbout: AboutType | undefined;
}

// Create Context with a default undefined value to enforce proper usage
const AboutContext = createContext<AboutContextType | undefined>(undefined);

// Provider Component
export function AboutContextProvider({ children }: { children: ReactNode }) {
  const targetAbout : AboutType  | undefined = undefined;

  return (
    <AboutContext.Provider value={{ targetAbout }}>
      {children}
    </AboutContext.Provider>
  );
}

// Custom Hook for Using Context
export function useAboutContext() {
  const context = useContext(AboutContext);
  
  if (!context) {
    throw new Error("useAboutContext must be used within a RoomContextProvider");
  }

  return context;
}