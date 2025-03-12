"use client";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { AdminApiAddress, imgAddress } from "@/lib/const";
import { Loading, SomeErrorPage } from "@/components/layout";
import { useRouter } from "next/navigation";
import { HomeType } from "@/types";
import Image from "next/image";
import { GetHomeImages } from "@/lib/url";
import { homeService } from "@/service";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:8000/media/"; 
const imageUrl = `${MEDIA_URL}2025_02_27_23_36_32.jpg`;

function SmoothImage({ d, index, currentIndex }: { d: any; index: number; currentIndex: number }) {
  const [isLoaded, setIsLoaded] = useState(false);


  return (
    <Image
      loader={() => imgAddress+d.imgSrc}
      key={index}
      alt={`image-${index}`}
      src={imgAddress+d.imgSrc}
      placeholder="blur"
      blurDataURL="/images/cover-imange.jpg"
      fill
      onLoad={() => setIsLoaded(true)}
      className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
        index === currentIndex && isLoaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // SWR: Using a static key and disabling revalidateOnFocus
  const { data, error } = useSWR<HomeType.Home[]>(
    GetHomeImages,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );


  console.log(data);

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
    if (data && data.length > 1) {
      setAutoPlay();
      return () => clearInterval(intervalRef.current!);
    }
  }, [data]);

  if (!data) {
    return <></>;
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
          <SmoothImage key={i} d={d} index={i} currentIndex={index} />
        ))}
      </div>

      { data.length > 1 && <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full text-3xl"
        onClick={handlePrev}
      >
        ❮
      </button> }

      { data.length > 1 && <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full text-3xl"
        onClick={handleNext}
      >
        ❯
      </button> }
    </div>
  );
}