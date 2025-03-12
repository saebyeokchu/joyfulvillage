import useSWR from "swr";

import { getFetcher, postJsonFetcher } from "@/lib/fetcher";
import { DeleteStayDataById, GetAllStay, UpsertStayData } from "@/lib/url";
import { StayType } from "@/types";

const GetAll = () => {
    return useSWR<StayType.Stay[]>(
        GetAllStay,
        getFetcher
    );
}

const Upsert = (postData : any) => {
    //mainimgs string으로 만들기
    postData.data.mainImgs = postData.data.mainImgs.join(";");
    console.log("[api.about.upsert]", postData);
    try {
        return postJsonFetcher([UpsertStayData, postData]);
    } catch (error) {
        return false;
    }
}

const DeleteById = (id : number) => {
    console.log("[api.about.delete]");
    try {
        return getFetcher(DeleteStayDataById+id)
    } catch (error) {
        return false;
    }
}

export {
    GetAll,
    Upsert,
    DeleteById
}