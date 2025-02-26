import { AdminApiAddress } from "./const";

const GetHomeImages = `${AdminApiAddress}/home/get/`;
const AddHomeImages = `${AdminApiAddress}/home/add/?src=`;
const DeleteHomeImages = `${AdminApiAddress}/home/delete/?id=`;

//cafe
const AddCafeData = `${AdminApiAddress}/cafe/create/`;
const UpdateCafeData = `${AdminApiAddress}/cafe/updateCafe/`;
const GetCafeData = `${AdminApiAddress}/cafe/getAll`;
const GetCafeDataBySection = `${AdminApiAddress}/cafe/getBySection/?section=`
const DeleteCafeDataById = `${AdminApiAddress}/cafe/deleteById/?id=`

//image
const ReplaceImg = `${AdminApiAddress}/imageArchive/replace/`;

export {
    GetHomeImages,
    AddHomeImages,
    DeleteHomeImages,

    AddCafeData,
    UpdateCafeData,
    GetCafeData,
    GetCafeDataBySection,
    DeleteCafeDataById,

    ReplaceImg
}