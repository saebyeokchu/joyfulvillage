import { CafeSection } from "./Enums"

export type Crumb = {
    title : string,
    link : string
}

export type ImageArchive = {
    id: number | null,
    imgSrc : string,
    lastModifiedAt : Date,
    createdAt : Date
}

export type Cafe = {
    id? : number ,
    section? : CafeSection,
    img? : string[] | null,
    content? : string | null,
    note? : string | null,
    lastModifiedAt? : Date ,
    createdAt? : Date
}

export type Program = {
    id : number | null ,
    name : string,
    subName : string,
    img : string,
    content : string,
    lastModifiedAt? : Date ,
    createdAt? : Date
}

export type Sokso = {
    id : number | null,
    level : number,
    group : number | null,
    name : string,
    introduction : string | null,
    mainImg : string,
    soksoDetail_Id : SoksoDetail | null,
    reserveLink : string | null,
    lastModifiedAt : Date,
    createdAt : Date
}

export type SoksoDetail = {
    id : number | null,
    topImages : string[],
    contentImages : string[],
    content : string,
    lastModifiedAt : Date,
    createdAt : Date
}

export type Biz = {
    id : number | null ,
    name : string,
    value : string[],
    note : string,
    lastModifiedAt? : Date ,
    createdAt? : Date
}

export type Title = {
    name : string,
    route : string
}

export type Menu = {
    title : string,
    iconSvg : any
}

export type MegaMenu = {
    mainTitle : string,
    mainTitleRoute : string,
    iconSvg? : any,
    subTitle? : Title[],
    disabled : boolean
}
