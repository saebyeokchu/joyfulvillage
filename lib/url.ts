import { AdminApiAddress } from "./const";

//about
const GetAboutById = `${AdminApiAddress}/about/get_by_id/?id=`;
const GetAllAbout = `${AdminApiAddress}/about/getAll/`;
const GetAboutBySection = `${AdminApiAddress}/about/getBySection/?section=`;
const UpsertAboutData = `${AdminApiAddress}/about/upsert/`;
const DeleteAboutDataById = `${AdminApiAddress}/about/deleteById/?id=`;

//home
const GetHomeMiddleTitle = `${AdminApiAddress}/home/getMiddleTitle/`;
const UpdateHomeMiddleTitle = `${AdminApiAddress}/home/updateMiddleTitle/`;
const GetHomeImages = `${AdminApiAddress}/home/get/`;
const AddHomeImages = `${AdminApiAddress}/home/add/?src=`;
const DeleteHomeImages = `${AdminApiAddress}/home/deleteById/?id=`;

// path('stay/getAll/', Stay.getAll , name='stay/getAll'), 
// path('stay/upseart/', Stay.upsertStay , name='stay/upseart/'),
// path('stay/deleteById/', Stay.deleteById , name='stay/deleteById/'),
//stay
const GetStaynById = `${AdminApiAddress}/stay/getById/?id=`;
const GetAllStay = `${AdminApiAddress}/stay/getAll/`;
const UpsertStayData = `${AdminApiAddress}/stay/upsert/`;
const DeleteStayDataById = `${AdminApiAddress}/stay/deleteById/?id=`;

//room
const GetRoomById = `${AdminApiAddress}/room/getById/?id=`;
const GetAllRoom = `${AdminApiAddress}/room/getAll/`;
const GetRoomDataByStayId = `${AdminApiAddress}/room/getByStayId/?id=`;
const UpsertRoomData = `${AdminApiAddress}/room/upseart/`;
const DeleteRoomDataById = `${AdminApiAddress}/room/deleteById/?id=`;

//option
const GetOptionById = `${AdminApiAddress}/option/getById/?id=`;
const GetAllOption = `${AdminApiAddress}/option/getAll/`;
const GetOptionDataByStayId = `${AdminApiAddress}/option/getByStayId/?id=`;
const UpsertOptionData = `${AdminApiAddress}/option/upsert/`;
const DeleteOptionDataById = `${AdminApiAddress}/option/deleteById/?id=`;

//cafe
const AddCafeData = `${AdminApiAddress}/cafe/create/`;
const UpdateCafeData = `${AdminApiAddress}/cafe/updateCafe/`;
const GetCafeData = `${AdminApiAddress}/cafe/getAll`;
const GetCafeDataBySection = `${AdminApiAddress}/cafe/getBySection/?section=`;
const DeleteCafeDataById = `${AdminApiAddress}/cafe/deleteById/?id=`;

//image
const ReplaceImg = `${AdminApiAddress}/imageArchive/replace/`;

//program
const GetProgramById = `${AdminApiAddress}/program/get_by_id/?id=`;
const GetAllProgram = `${AdminApiAddress}/program/getAll/`

export {
    GetAboutById,
    GetAllAbout,
    GetAboutBySection,
    UpsertAboutData,
    DeleteAboutDataById,

    GetHomeMiddleTitle,
    UpdateHomeMiddleTitle,
    GetHomeImages,
    AddHomeImages,
    DeleteHomeImages,

    GetStaynById,
    GetAllStay,
    UpsertStayData,
    DeleteStayDataById,

    GetRoomById,
    GetAllRoom,
    GetRoomDataByStayId,
    UpsertRoomData,
    DeleteRoomDataById,

    GetOptionById,
    GetAllOption,
    GetOptionDataByStayId,
    UpsertOptionData,
    DeleteOptionDataById,

    AddCafeData,
    UpdateCafeData,
    GetCafeData,
    GetCafeDataBySection,
    DeleteCafeDataById,

    ReplaceImg,

    GetProgramById,
    GetAllProgram
}