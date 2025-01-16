import axios from "axios";
import { AdminApiAddress } from "../_data/Const";
import { UploadImageWithDeletion } from "./File";
import { HomeSection } from "../_data/Enums";

export async function GetQnaData(){
    return await axios.get(`${AdminApiAddress}/qna/get/`);
}


