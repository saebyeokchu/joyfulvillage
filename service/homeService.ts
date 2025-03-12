import { HomeApi } from "@/api";
import { AxiosResponse } from "@/lib/enums";
import { getFetcher, postJsonFetcher } from "@/lib/fetcher";
import { GetHomeMiddleTitle, UpdateHomeMiddleTitle, } from "@/lib/url";
import useSWR from "swr";


const GetMiddleTitle  = () => {
    const { data, error, mutate  } = useSWR<any[]>(
        GetHomeMiddleTitle,
        getFetcher
    );
  

    return { middleTitle : data }
}

const UpdateMiddleTitle = (middleTitle : string) => {
    console.log({middle_title : middleTitle});
    try {
        return postJsonFetcher([UpdateHomeMiddleTitle, {middle_title : middleTitle}]);
    } catch (error) {
        return false;
    }
}


export {
    GetMiddleTitle,
    UpdateMiddleTitle
}
