import { LayoutType } from "@/lib/enums"

type Option = {
    id? : number,
    name : string,
    introduction : string ,
    mainImgs : string[],
    content : string | null,
    stay_id : number,
    reserveLink? : string,
    reserveNumber? : string,
    lastModifiedAt? : Date,
    createdAt? : Date
}

//stay -> room -> rommdetail

type Stay = {
    id? : number | null,
    name : string,
    address: string,
    introduction1 : string,
    introduction2? : string,
    mainImgs: string[] ,
    optionAvailable : boolean,
    lastModifiedAt?: Date,
    createdAt?: Date
}

type Room = {
    id? : number | null,
    name : string,
    structure : string ,
    introduction1 : string ,
    introduction2? : string ,
    mainImgs : string[],
    content : string,
    stay_id : number,
    layout : LayoutType,
    reserveLink? : string,
    reserveNumber? : string,
    lastModifiedAt? : Date,
    createdAt? : Date
}

type RoomDetail = {
    id : number | null,
    topImages : string[],
    contentImages : string[],
    content : string,

    lastModifiedAt : Date,
    createdAt : Date
}

export type {
    Stay,
    Option,
    Room,
    RoomDetail
}