import useSWR from "swr";

import { getFetcher, postJsonFetcher } from "@/lib/fetcher";
import { DeleteOptionDataById, DeleteStayDataById, GetAllOption, GetAllStay, GetOptionDataByStayId, UpsertOptionData, UpsertStayData } from "@/lib/url";
import { StayType } from "@/types";

const GetAll = () => {
    return useSWR<StayType.Stay[]>(
        GetAllOption,
        getFetcher
    );
}

const GetByStayId = (id : number) => {
    console.log("[api.option.delete]");
    try {
        return getFetcher(GetOptionDataByStayId+id);
    } catch (error) {
        return false;
    }
}

const Upsert = (postData : any) => {
    console.log("[api.oprion.upsert]", postData);

    //mainimgs string으로 만들기
    postData.data.mainImgs = postData.data.mainImgs.join(";");
    // postData.data.contentImgs = postData.data.contentImgs.join(";");
    try {
        return postJsonFetcher([UpsertOptionData, postData]);
    } catch (error) {
        return false;
    }
}

const DeleteById = (id : number) => {
    console.log("[api.oprion.delete]");
    try {
        return getFetcher(DeleteOptionDataById+id)
    } catch (error) {
        return false;
    }
}

export {
    GetAll,
    GetByStayId,
    Upsert,
    DeleteById
}