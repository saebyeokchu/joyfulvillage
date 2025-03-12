import useSWR from "swr";

import { getFetcher, postJsonFetcher } from "@/lib/fetcher";
import { DeleteOptionDataById, DeleteRoomDataById, DeleteStayDataById, GetAllOption, GetAllStay, GetOptionDataByStayId, GetRoomDataByStayId, UpsertOptionData, UpsertRoomData, UpsertStayData } from "@/lib/url";
import { StayType } from "@/types";

const GetAll = () => {
    return useSWR<StayType.Stay[]>(
        GetAllOption,
        getFetcher
    );
}

const GetByStayId = (id : number) => {
    console.log("[api.Room.GetByStayId]");
    try {
        return getFetcher(GetRoomDataByStayId+id);
    } catch (error) {
        return false;
    }
}

const Upsert = (postData : any) => {
    //mainimgs string으로 만들기
    postData.data.mainImgs = postData.data.mainImgs.join(";");
    console.log("[api.Room.upsert]", postData);
    try {
        return postJsonFetcher([UpsertRoomData, postData]);
    } catch (error) {
        return false;
    }
}

const DeleteById = (id : number) => {
    console.log("[api.room.delete]");
    try {
        return getFetcher(DeleteRoomDataById+id)
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