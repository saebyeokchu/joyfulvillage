type Sokso = {
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

type SoksoDetail = {
    id : number | null,
    topImages : string[],
    contentImages : string[],
    content : string,
    lastModifiedAt : Date,
    createdAt : Date
}

export type { Sokso, SoksoDetail }