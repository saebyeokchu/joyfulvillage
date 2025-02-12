

import { UploadImageWithDeletion } from "../app/_api/File";
import { UpdateHomeData } from "../app/_api/Home";
import { GetQnaData } from "../app/_api/Qna";
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
