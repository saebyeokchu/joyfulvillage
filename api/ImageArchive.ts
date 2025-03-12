import axios from "axios";
import { AdminApiAddress } from "../lib/const";

export async function GetAll(){
    return await axios.get(`${AdminApiAddress}/imageArchive/getAll/`);
}

export async function Upload(formData : FormData){
    console.log("api.upload");
    try {
        const response = await fetch(`${AdminApiAddress}/imageArchive/uploadImage/`, {
          method: "POST",
          body: formData,
          credentials: 'include',
        });
        return response;
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



