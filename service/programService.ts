import { ProgramApi } from "@/api";
import { AxiosResponse } from "../lib/enums";
import { Program } from "../types/Types";
import useSWR from "swr";
import { getFetcher } from "@/lib/fetcher";
import { GetAboutById, GetAllProgram, GetProgramById } from "@/lib/url";


async function getAll(){
    return await ProgramApi.GetAll().then(response => {
        if(response.status == AxiosResponse.Successful){
            return response.data;
        }
    });
}

const GetAll = () => {
    return useSWR<Program[]>(
        GetAllProgram,
        getFetcher
    );
}


const GetById = (id : any) => {
    return useSWR<Program>(
        GetProgramById + id,
        getFetcher
    );
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
    GetAll,
    GetById,
    
    getAll,
    create,
    update,
    upsert,
    deleteById
}