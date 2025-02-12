import { BizApi } from "@/lib/api";
import { AxiosResponse, BizSection } from "../lib/enums";

const splitValue = (ary : any) => {
    ary.map( ( data : any ) => {
        if(data.img) data.img = data.img.split(";")
    });
}

async function getAll(){
    return await BizApi.GetAll().then(response => {
        if(response.status == AxiosResponse.Successful){
            if(response.data){
                splitValue(response.data);
            }
            return response.data;
        }
    });
}

async function getBySection(bizSection : BizSection){
    return await BizApi.GetBySection(bizSection).then(response => {
        if(response.status == AxiosResponse.Successful){
            if(response.data){
                splitValue(response.data);
            }
            return response.data;
        }
    });
}


export {
    getAll,
    getBySection,
}
