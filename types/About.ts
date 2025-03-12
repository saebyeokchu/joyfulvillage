import { AboutSection } from "@/lib/enums"

type AboutType = {
    id? : number | null,
    imgSrc : string,
    title : string,
    address : string,
    content : string,
    InstagramId : string,
    InstagramLink : string,
    lastModifiedAt? : Date,
    createdAt? : Date
}

export type {
    AboutType,
}
