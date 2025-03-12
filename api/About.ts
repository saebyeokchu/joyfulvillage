import axios from "axios";
import { AdminApiAddress } from "../lib/const";
import { UploadImageWithDeletion } from "./File";
import { HomeSection } from "../lib/enums";
import { DeleteAboutDataById, UpsertAboutData } from "@/lib/url";
import { getFetcher, postJsonFetcher } from "@/lib/fetcher";

export async function Upsert(postData : any){
    console.log("[api.about.upsert]", postData);
    try {
        return postJsonFetcher([UpsertAboutData, postData]);
    } catch (error) {
        return false;
    }
}

export async function DeleteById(id : number){
    console.log("[api.about.delete]");
    try {
        return getFetcher(DeleteAboutDataById+id)
    } catch (error) {
        return false;
    }
}

