import axios from "axios";
import { AdminApiAddress } from "../lib/const";

export async function GetById(id : number){
    return await axios.get(`${AdminApiAddress}/sokso/getById/?id=`+id);
}

export async function GetByLevel(level : number){
    return await axios.get(`${AdminApiAddress}/sokso/getByLevel/?level=`+level);
}

export async function GetByLevelAndGroup(level : number, group : number){
    return await axios.get(`${AdminApiAddress}/sokso/getByLevelAndGroup/?level=`+level+'&group='+group);
}

export async function Upsert(newSokso : any){
    return await axios.post(`${AdminApiAddress}/sokso/upseart/`,{
        data : newSokso
    });
}

export async function DeleteById(id : number){
    return await axios.get(`${AdminApiAddress}/sokso/deleteById/?id=`+id);
}



