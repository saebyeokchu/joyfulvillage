import axios from "axios";
import { AdminApiAddress } from "../lib/const";

export async function Get(){
    return await axios.get(`${AdminApiAddress}/home/get/`);
}

