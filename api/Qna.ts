import axios from "axios";
import { AdminApiAddress } from "../lib/const";
import { UploadImageWithDeletion } from "./File";
import { HomeSection } from "../lib/enums";

export async function GetQnaData(){
    return await axios.get(`${AdminApiAddress}/qna/get/`);
}

export async function InsertQnaData(question : string, answer : string){
    return await axios.post(`${AdminApiAddress}/qna/add/`,{
        question,
        answer
    });
}

export async function UpdateQna(qna : any){
    return await axios.post(`${AdminApiAddress}/qna/upseart/`,{
        qna
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



