

import { UploadImageWithDeletion } from "../_api/File";
import { UpdateHomeData } from "../_api/Home";
import { GetQnaData } from "../_api/Qna";
import { AxiosResponse, HomeSection } from "../_data/Enums";

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
