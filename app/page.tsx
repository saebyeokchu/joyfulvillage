"use client";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { AdminApiAddress } from "@/lib/const";
import { Loading, SomeErrorPage } from "@/components/layout";
import { useRouter } from "next/navigation";
import { HomeType } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // SWR: Using a static key and disabling revalidateOnFocus
  const { data, error } = useSWR<HomeType.Home[]>(
    `${AdminApiAddress}/home/get/`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  // Auto-play logic
  const handleNext = () => {
    if (data) {
      setFade(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % data.length);
        setFade(false);
      }, 500);
    }
  };

  const handlePrev = () => {
    if (data) {
      setFade(true);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
        setFade(false);
      }, 500);
    }
  };

  const setAutoPlay = () => {
    intervalRef.current = setInterval(handleNext, 10000);
    return () => clearInterval(intervalRef.current!);
  };

  useEffect(() => {
    setAutoPlay();
    return () => clearInterval(intervalRef.current!);
  }, [data]);

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return (
      <SomeErrorPage onClickFunction={() => router.push("/")} error={error} />
    );
  }

  return (
    <div className="flex flex-col bg-point w-full overflow-hidden h-screen">
      {/* Main image */}
      <div className="absolute inset-0 flex items-center justify-center">
        {data.map((d: HomeType.Home, i: number) => (
          <img
            key={i}
            src={d.imgSrc}
            alt=""
            className={`absolute w-full h-full object-cover transition-opacity ease-in-out duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full text-3xl"
        onClick={handlePrev}
      >
        ❮
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full text-3xl"
        onClick={handleNext}
      >
        ❯
      </button>
    </div>
  );
}