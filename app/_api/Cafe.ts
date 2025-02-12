import axios from "axios";
import { AdminApiAddress } from "../_data/Const";
import { Cafe } from "../_data/Types";

export async function GetAll(){
    return await axios.get(`${AdminApiAddress}/cafe/getAll/`);
}

export async function GetBySection(section : string){
    return await axios.post(`${AdminApiAddress}/cafe/getBySection/`,{
        section
    });
}

export async function Create(cafe : Cafe){
    console.log("Create",cafe);
    return await axios.post(`${AdminApiAddress}/cafe/create/`,{
        data : cafe
    });
}

export async function UpdateCafe(cafe : Cafe){
    console.log("UpdateCafe",cafe);
    return await axios.post(`${AdminApiAddress}/cafe/updateCafe/`,{
        data : cafe
    });
}
