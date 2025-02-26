
// id : number | null,
// level : number,
// group : number | null,
// name : string,
// introduction : string | null,
// mainImg : string,
// soksoDetail_Id : SoksoDetail,
// reserveLink : string | null,
// lastModifiedAt : Date,
// createdAt : Date

import { Sokso, SoksoDetail } from "@/types/sokso";


export class SoksoClass {
    private _id: number | null;
    private _level: number;
    private _group: number | null;
    private _name: string;
    private _introduction: string | null;
    private _mainImg: string;
    private _soksoDetail_Id: SoksoDetail | null;
    private _reserveLink: string | null;
    private _lastModifiedAt: Date;
    private _createdAt: Date;

    public constructor() {
        this._id = null
        this._level  = -1;
        this._group  = null;
        this._name  = '';
        this._introduction  = null;
        this._mainImg  = '';
        this._soksoDetail_Id = null;
        this._reserveLink = '';
        this._lastModifiedAt = new Date();
        this._createdAt = new Date();
    }

    public getSokso() : Sokso{
        return {
            id : this._id,
            level : this._level,
            group : this._group,
            name : this._name,
            introduction : this._introduction,
            mainImg : this._mainImg,
            soksoDetail_Id : this._soksoDetail_Id,
            reserveLink : this._reserveLink,
            lastModifiedAt : this._lastModifiedAt,
            createdAt : this._createdAt
        }
    }

    public setSokso(newSokso : Sokso) {
        this._id = newSokso.id;
        this._level  = newSokso.level;
        this._group  = newSokso.group;
        this._name  = newSokso.name;
        this._introduction  = newSokso.name;
        this._mainImg  = newSokso.name;
        this._soksoDetail_Id = newSokso.soksoDetail_Id;
        this._reserveLink = newSokso.reserveLink;
        this._lastModifiedAt = newSokso.lastModifiedAt;
        this._createdAt = newSokso.createdAt;
    }

    public get id(): number | null {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get level(): number {
        return this._level;
    }
    public set level(value: number) {
        this._level = value;
    }
    public get group(): number | null {
        return this._group;
    }
    public set group(value: number | null) {
        this._group = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
public get introduction(): string | null {
        return this._introduction;
    }
    public set introduction(value: string | null) {
        this._introduction = value;
    }
public get mainImg(): string {
        return this._mainImg;
    }
    public set mainImg(value: string) {
        this._mainImg = value;
    }
    public get soksoDetail_Id(): SoksoDetail | null {
        return this._soksoDetail_Id;
    }
    public set soksoDetail_Id(value: SoksoDetail | null) {
        this._soksoDetail_Id = value;
    }

    public get reserveLink(): string | null {
        return this._reserveLink;
    }
    public set reserveLink(value: string | null) {
        this._reserveLink = value;
    }
   
}