

import { GetQnaData } from "@/lib/api/Qna";
import { AxiosResponse, HomeSection } from "../lib/enums";

const getQnaList = async () =>{
    return await GetQnaData().then(response => {
        if(response.status == AxiosResponse.Successful){
            return response.data;
        }
    });
}

export {
    getQnaList
}
