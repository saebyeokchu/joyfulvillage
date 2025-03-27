"use client"

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardWrapper } from "@/components/ui";
import { Loading, PageHeader, SomeErrorPage } from "@/components/layout";
import { StayType } from "@/types";
import useSWR from "swr";
import { GetAllStay } from "@/lib/url";
import { getFetcher } from "@/lib/fetcher";
import { headerInfoService } from "@/service";
import { imgAddress } from "@/lib/const";
import { GeneralError } from "@/lib/messages";

export default function ManageStay() {
  const router = useRouter();

  const [headerImgSrc, setHeaderImgSrc] = useState<string>("");

  const { data, error: dataError } = useSWR<any[]>(GetAllStay, getFetcher);
  const { headerInfo, isLoading, isError: headerError } = headerInfoService.GetById("stay");

  // Always call useMemo, even if data is not ready
  const processedData = useMemo(() => {
    return data
      ? data.map((d: any) => ({
          ...d,
          mainImgs:
            typeof d.mainImgs === "string" ? d.mainImgs.split(";") : d.mainImgs,
        }))
      : [];
  }, [data]);

  useEffect(() => {
    if(headerInfo?.imgSrc){
        setHeaderImgSrc(headerInfo.imgSrc);
    }
}, [headerInfo]);


  // Check for error and loading state AFTER all hooks are called
  if (dataError || headerError || !data || !headerInfo) {
    return (
      <SomeErrorPage
        onClickFunction={() => router.push("/")}
        error={dataError?.message || headerError?.message || GeneralError.unknownError}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  


  return (
    <div className="border-0 border-0-red-700">
      {/* Header */}
      <PageHeader
        src={imgAddress + headerImgSrc}
        title={"스테이"}
        subTitle1={headerInfo.introduction1}
        subTitle2={headerInfo.introduction2}
        alt={"stay-header"}
      />

      {/* Stay list */}
      <CardWrapper>
        {processedData.map((stay: StayType.Stay, index: number) => (
          <Card
            key={`stay-wrapper-${index}`}
            name={stay.name}
            address={stay.address}
            images={stay.mainImgs}
            onClickImage={() => router.push(`/stay/${stay.id}/rooms`)}
            wrapperId={stay.id!.toString()}
            alt={`stay-wrapper-card-${index}`}
          >
            {stay.introduction1 + " " + stay.introduction2}
          </Card>
        ))}
      </CardWrapper>
    </div>
  );
}
