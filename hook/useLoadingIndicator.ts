"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useLoadingIndicator() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When the pathname changes, assume a navigation is in progress
    setLoading(true);
    // For a smoother transition, delay turning off the loading indicator slightly
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, [pathname]);

  return loading;
}
