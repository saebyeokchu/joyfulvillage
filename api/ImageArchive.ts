import axios from "axios";
import { AdminApiAddress } from "../lib/const";
import { UploadImageWithDeletion } from "./File";
import { HomeSection } from "../lib/enums";

export async function GetAll(){
    return await axios.get(`${AdminApiAddress}/imageArchive/getAll/`);
}

export async function Upload(formData : FormData){
    console.log("api.upload");
    try {
        return await fetch(`${AdminApiAddress}/imageArchive/upload/`, {
          method: "POST",
          body: formData,
        }).then(response => {
            console.log("Upload response : " , response);
            return response;
        });
    } catch (error) {
        return false;
    }
}

export async function DeleteByImageName(id : number, name : string){
    return await axios.post(`${AdminApiAddress}/imageArchive/deleteByImageName/`,{
        id,
        name
    }); 
}



