import axios from "axios";
import { AdminApiAddress } from "../lib/const";

export async function UploadImageWithDeletion(formData : FormData){
    try {
        return await fetch(`${AdminApiAddress}/upload-img-with-deletion/`, {
          method: "POST",
          body: formData,
          credentials: 'include',
        }).then(response => {
            console.log("response : " , response);
            return response.ok;
        });
    } catch (error) {
        window.alert("이미지를 조작할 수 없습니다. 잠시 후 다시 시도해 주세요.");
        return false;
    }
}