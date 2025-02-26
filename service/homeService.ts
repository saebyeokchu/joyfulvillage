import { HomeApi } from "@/api";
import { AxiosResponse } from "@/lib/enums";

async function GetHomeImages(){
    return await HomeApi.Get().then(response => {
        if(response.status == AxiosResponse.Successful){
            return response.data;
        }
    });
}

export {
    GetHomeImages
}
