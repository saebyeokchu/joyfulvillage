import axios from "axios";
import { AdminApiAddress } from "../lib/const";
import { UploadImageWithDeletion } from "./File";
import { HomeSection } from "../lib/enums";

export async function GetHomeData(){
    return await axios.get(`${AdminApiAddress}/home/get/`);
}

export async function GetHomeDataBySection(section : string){
    return await axios.get(`${AdminApiAddress}/home/get-by-section/?section=`+section);
}

export async function UpdateHomeData(section : number, contents : string){
    console.log(section,":",contents);
    return await axios.post(`${AdminApiAddress}/home/update/contents/`,{
        section,
        contents 
    });
}

