import { getFetcher, postJsonFetcher } from "@/lib/fetcher";
import { GetHeaderInfoById, UpsertHeaderInfoData } from "@/lib/url";
import { HeaderInfo } from "@/types/HeaderInfo";
import useSWR from "swr";

const GetById = (id : any) => {
    const { data, error, mutate } = useSWR<HeaderInfo>(
        GetHeaderInfoById + id,
        getFetcher
    );

    return { headerInfo : data, isLoading : !error && !data, isError : error, mutate : mutate };
}

const Upsert = (postData : any) => {
    //mainimgs string으로 만들기
    console.log("[api.HeaderInfo.upsert]", postData);
    try {
        return postJsonFetcher([UpsertHeaderInfoData, postData]);
    } catch (error) {
        return false;
    }
}


export {
    GetById,
    Upsert,
}