

import { SoksoApi } from "@/lib/api";
import { StringDivider } from "../lib/const";
import { AxiosResponse } from "../lib/enums";
import { Sokso } from "@/types/sokso";

const modelingSoksoDetail = (soksodetail : any) => {
    if(soksodetail){
        soksodetail.topImages = soksodetail.topImages.split(StringDivider);
        soksodetail.contentImages = soksodetail.contentImages.split(StringDivider);
    }
}

const getSoksoById = async (id : number) : Promise<Sokso | null> =>{
    return await SoksoApi.GetById(id).then(response => {
        if(response.status == AxiosResponse.Successful){
            //modeling soksodetail
            modelingSoksoDetail(response.data.soksoDetail_Id);
            console.log("[getSoksoById]", response.data);
            return response.data;
        }
    });
}

const getSoksoByLevel = async (level : number) : Promise<Sokso[] | null> =>{
    return await SoksoApi.GetByLevel(level).then(response => {
        if(response.status == AxiosResponse.Successful){
            console.log("[getSoksoByLevel]", response.data);
            response.data.map( (data : any) => modelingSoksoDetail(data.soksoDetail_Id))
            return response.data;
        }
    });
}

const getSoksoByLevelAndGroup = async (level : number, group : number) : Promise<Sokso[] | null> =>{
    return await SoksoApi.GetByLevelAndGroup(level, group).then(response => {
        if(response.status == AxiosResponse.Successful){
            response.data.map( (data : any) => modelingSoksoDetail(data.soksoDetail_Id))
            return response.data;
        }
    });
}

const upsertSokso = async (newSokso : Sokso) : Promise<boolean | undefined> =>{
    return await SoksoApi.Upsert(newSokso).then(response => {
        console.log("[upsertSokso]", response);
        if(response.status == AxiosResponse.Successful){
            return true;
        }
    });
}

const deleteSoksoById = async (id : number) : Promise<boolean | undefined> =>{
    return await SoksoApi.DeleteById(id).then(response => {
        console.log("[deleteSoksoById]", response);
        if(response.status == AxiosResponse.Successful){
            return true;
        }
    });
}

export {
    getSoksoById,
    getSoksoByLevel,
    getSoksoByLevelAndGroup,
    upsertSokso,
    deleteSoksoById
}
