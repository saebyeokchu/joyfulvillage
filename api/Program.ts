import axios from "axios";
import { AdminApiAddress, BaseApiAddress } from "../lib/const";
import { Program } from "../types/Types";

export async function GetAll(){
    return await axios.get(`${AdminApiAddress}/program/getAll/`);
}

export async function Create(program : Program){
    console.log("Create",program);
    return await axios.post(`${AdminApiAddress}/program/create/`,{
        data : program
    });
}

export async function Update(program : Program){
    console.log("Update",program);
    return await axios.post(`${AdminApiAddress}/program/update/`,{
        data : program
    });
}

export async function DeleteById(id : number){
    return await axios.get(`${AdminApiAddress}/program/deleteById/?id=`+id);
}




