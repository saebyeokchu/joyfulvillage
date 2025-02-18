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

type Room = {
    id : number | null,
    name : string,
    introduction : string ,
    mainImgs : string[],
    content : string,
    stayid : number,
    rdid : RoomDetail | null,
    reserveLink : string | null,
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
    Option,
    Room,
    RoomDetail
}