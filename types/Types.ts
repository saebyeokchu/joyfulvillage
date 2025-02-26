import { CafeSection } from "../lib/enums"

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
    img? : null | string,
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

export type Pill = {
    targetVal : any, name : string, onClickFunction : any 
}