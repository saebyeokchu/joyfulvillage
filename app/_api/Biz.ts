import axios from "axios";
import { AdminApiAddress } from "../_data/Const";
import { UploadImageWithDeletion } from "./File";
import { BizSection, HomeSection } from "../_data/Enums";

export async function Get(){
    return await axios.get(`${AdminApiAddress}/biz/get/`);
}

export async function GetAll(){
    return await axios.get(`${AdminApiAddress}/biz/getAll/`);
}

export async function GetBySection(section : BizSection){
    return await axios.get(`${AdminApiAddress}/biz/getBySection/?section=`+section);
}

export async function GetKakao(){
    return await axios.get(`${AdminApiAddress}/biz/get-kakao/`);
}

export async function EditBiz(long : string, lan : string, addressText : string){
    return await axios.post(`${AdminApiAddress}/biz/update/`,{
        long, lan, addressText
    });
}

export async function DeleteQnaData(id : number){
    return await axios.post(`${AdminApiAddress}/qna/delete/`,{ 
        id,
    });
}

export async function EditSortOrder(order : any[]){
    return await axios.post(`${AdminApiAddress}/qna/edit-sort-order/`,{
        order
    });
}



