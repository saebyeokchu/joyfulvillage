import { ProgramApi } from "@/lib/api";
import { AxiosResponse } from "../lib/enums";
import { Program } from "../types/Types";


async function getAll(){
    return await ProgramApi.GetAll().then(response => {
        if(response.status == AxiosResponse.Successful){
            return response.data;
        }
    });
}

async function create(program : Program){
    return await ProgramApi.Create(program).then(response => {
        console.log("[create]",response)
        if(response.status == AxiosResponse.Successful){
            return response.data;
        }
    });
}

async function update(program : Program){
    return await ProgramApi.Update(program).then(response => {
        console.log("[updateCafe]",response)
        if(response.status == AxiosResponse.Successful){
            return response.data;
        }
    });
}

async function upsert(program : Program){
    let response : any = undefined;

    if(program.id){
        response = await ProgramApi.Update(program);
    }else{
        response = await ProgramApi.Create(program);
    }

    if(response.status == AxiosResponse.Successful){
        return response.data;
    }
}

const deleteById = async (id : number) : Promise<boolean | undefined> =>{
    return await ProgramApi.DeleteById(id).then(response => {
        if(response.status == AxiosResponse.Successful){
            return true;
        }
    });
}

export {
    getAll,
    create,
    update,
    upsert,
    deleteById
}