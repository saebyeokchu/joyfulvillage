import { CafeApi } from "@/api";
import { AxiosResponse, CafeSection} from "../lib/enums";
import { Cafe } from "../types/Types";

async function makeImgString(previousImgs : string[], newImgSrc : string){
    
}

async function getCafeSection(cafes : Cafe[], section : CafeSection){
    const filtered = cafes.filter((content : Cafe) => content.section==section);

    if(filtered){
        return filtered;
    }
}

async function getAll(){
    return await CafeApi.GetAll().then(response => {
        if(response.status == AxiosResponse.Successful){
            // if(response.data){
            //     response.data.map( ( data : any ) => {
            //         if(data.img) data.img = data.img.split(";")
            //     });
            // }
            return response.data;
        }
    });
}

async function create(data : Cafe){
    return await CafeApi.Create(data).then(response => {
        console.log("[create]",response)
        if(response.status == AxiosResponse.Successful){
            return response.data;
        }
    });
}

async function updateCafe(data : Cafe){
    return await CafeApi.UpdateCafe(data).then(response => {
        console.log("[updateCafe]",response)
        if(response.status == AxiosResponse.Successful){
            return response.data;
        }
    });
}

export {
    makeImgString,
    getCafeSection,
    getAll,
    create,
    updateCafe
}
