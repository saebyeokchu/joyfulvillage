import { getFetcher } from "@/lib/fetcher";
import { GetOptionById, GetOptionDataByStayId } from "@/lib/url";
import { useMemo } from "react";
import useSWR from "swr";

const processData = (data : any) => data.map((d: any) => ({
  ...d,
  mainImgs: typeof d.mainImgs === 'string' ? d.mainImgs.split(";") : d.mainImgs
}))

const GetById  = (id : any) => {
  const { data, error, mutate  } = useSWR<any[]>(
      GetOptionById + id,
      getFetcher
  );

  console.log(data);
  
  const option = useMemo(() => {
      if (!data) return [];
      return processData([data]);
    }, [data]);
  
  return { option : option[0] , optionError : error, oprionMutate : mutate }
}

const GetByStayId  = (stayId : string) => {
    const { data, error, mutate  } = useSWR<any[]>(
        GetOptionDataByStayId + stayId,
        getFetcher
    );

    const options = useMemo(() => {
        if (!data) return [];
        return processData(data);
    }, [data]);

    
    return { options, optionsError : error , optionsMutate : mutate }
}

export {
  GetById,
  GetByStayId
}
