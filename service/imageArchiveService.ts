

import { ImageArchiveApi } from "@/api";
import { AxiosResponse } from "../lib/enums";
import { getCurrentTimestamp } from "@/lib/common";

const getAll = async () =>{
    return await ImageArchiveApi.GetAll().then(response => {
        if(response.status == AxiosResponse.Successful){
            return response.data;
        }
    });
}

const upload = async (newFileImage : any) =>{
    console.log("[service.upload]");

    //make form data
    const thisImgName : string = getCurrentTimestamp();
    const fileExtender : string = newFileImage.name.split(".")[1];
    const formData : FormData = new FormData();
    formData.append("image", newFileImage);
    formData.append("imageName", thisImgName);
                
    //확장자 필요
    const newImageName = thisImgName + "." + fileExtender;
    const response : any = await ImageArchiveApi.Upload(formData);

    if(response.status == AxiosResponse.Successful){
        return newImageName;
    }
    // console.log("imageArchieveService uplaod response : ", uploadResult);
    // .then(( response : any ) => {
    //     console.log("imageArchieveService uplaod response : ", response);
    //     if(response.status == AxiosResponse.Successful){
    //         return newImageName;
    //     }
    // });
}

const deleteByImageName = async (id : number, imageName : string) =>{
    return await ImageArchiveApi.DeleteByImageName(id, imageName).then(response => {
        if(response.status == AxiosResponse.Successful){
            return response.data;
        }
    });
}

export {
    getAll,
    upload,
    deleteByImageName
}
