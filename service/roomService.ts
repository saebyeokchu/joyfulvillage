import { getFetcher } from "@/lib/fetcher";
import { GetOptionById, GetOptionDataByStayId, GetRoomById, GetRoomDataByStayId } from "@/lib/url";
import { useMemo } from "react";
import useSWR from "swr";

const processData = (data : any) => data.map((d: any) => ({
  ...d,
  mainImgs: typeof d.mainImgs === 'string' ? d.mainImgs.split(";") : d.mainImgs,
}))

const GetById  = (id : any) => {
  const { data, error, mutate  } = useSWR<any[]>(
      GetRoomById + id,
      getFetcher
  );

  
  const targetRoom = useMemo(() => {
      if (!data) return [];
      return processData([data])[0];
    }, [data]);

  console.log("GetById", targetRoom, GetRoomById + id);

  
  return { targetRoom , targetRoomError : error , targetRoomMutate : mutate }
}

const GetByStayId  = (stayId : string) => {
  const { data, error, mutate  } = useSWR<any[]>(
      GetRoomDataByStayId + stayId,
      getFetcher
  );

  console.log(data);
  
  const processedData = useMemo(() => {
      if (!data) return [];
      return processData(data);
    }, [data]);
  
  return { processedData , error , mutate }
}

export {
  GetById,
  GetByStayId
}
