"use client"

import { useEffect, useRef } from "react";
import ScrollOpacity from "./_component/ScrollOpaicty";
import Slider from "./_component/Slider";
import BlockedPage from "./_component/BlockedPage";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  useEffect(() => router.push("/home"),[])

  return (
    <BlockedPage />
  )
}