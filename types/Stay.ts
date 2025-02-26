type Option = {
    id : number | null,
    name : string,
    introduction : string ,
    mainImg : string[],
    content : string,
    contentImgs : string[],
    lastModifiedAt : Date,
    createdAt : Date
}

//stay -> room -> rommdetail

type Stay = {
    id : number | null,
    name : string,
    address: string,
    introduction : string,
    mainImgs: string[],
    optionAvailable : boolean,
    lastModifiedAt: Date,
    createdAt: Date
}

type Room = {
    id? : number ,
    name : string,
    structure : string ,
    introduction1 : string ,
    introduction2? : string ,
    mainImgs : string[],
    content : string,
    stayid : number,
    reserveLink? : string,
    lastModifiedAt : Date,
    createdAt : Date
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