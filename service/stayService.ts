import { getFetcher } from "@/lib/fetcher";
import { GetOptionById, GetOptionDataByStayId, GetRoomById, GetRoomDataByStayId, GetStaynById } from "@/lib/url";
import { useMemo } from "react";
import useSWR from "swr";

const processData = (data : any) => data.map((d: any) => ({
  ...d,
  mainImgs: typeof d.mainImgs === 'string' ? d.mainImgs.split(";") : d.mainImgs,
}))

const GetById  = (id : any) => {
  const { data, error, mutate  } = useSWR<any[]>(
    GetStaynById + id,
      getFetcher
  );

  const targetStay = useMemo(() => {
      if (!data) return [];
      return processData([data])[0];
    }, [data]);

    console.log(targetStay);
  
  return { targetStay , targetStayError : error , targetStayMutate : mutate }
}


export {
  GetById,
}
