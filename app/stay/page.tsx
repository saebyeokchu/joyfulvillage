"use client"

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, CardWrapper } from "@/components/ui";
import { Loading, PageHeader, SomeErrorPage } from "@/components/layout";
import { StayType } from "@/types";
import useSWR from "swr";
import { GetAllStay } from "@/lib/url";
import { getFetcher } from "@/lib/fetcher";

export default function ManageStay() {
  const router = useRouter();
  const { data, error, mutate } = useSWR<any[]>(GetAllStay, getFetcher);

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

  // Check for error and loading state AFTER all hooks are called
  if (error) {
    return (
      <SomeErrorPage
        onClickFunction={() => router.push("/admin")}
        error={error.message}
      />
    );
  }

  if (!data) {
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
        src={"/images/stay-cover.png"}
        title={"스테이"}
        subTitle1={"조이풀빌리지는 자연 속에서 누리는 다양한 형태의 숙소를 제공합니다."}
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
