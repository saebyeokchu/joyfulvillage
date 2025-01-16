import axios from "axios";
import { AdminApiAddress } from "../_data/Const";
import { UploadImageWithDeletion } from "./File";
import { HomeSection } from "../_data/Enums";

export async function GetHomeData(){
    return await axios.get(`${AdminApiAddress}/home/get/`);
}

export async function GetHomeDataBySection(section : string){
    return await axios.get(`${AdminApiAddress}/home/get-by-section/?section=`+section);
}

export async function UpdateHomeData(section : number, contents : string){
    return await axios.post(`${AdminApiAddress}/home/update/contents/`,{
        section,
        contents 
    });
}

