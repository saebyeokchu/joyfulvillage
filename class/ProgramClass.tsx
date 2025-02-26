// id : number ,
// name : string,
// subName : string,
// img : string,
// content : string,
// lastModifiedAt? : Date ,
// createdAt? : Date

import { isStrValid } from "@/lib/common";
import { Program } from "@/types/Types";

export class ProgramClass {
    private _id: number | null;
    private _name: string;
    private _subName: string;
    private _img: string;
    private _content: string;
    private _lastModifiedAt: Date;
    private _createdAt: Date;

    public constructor() {
        this._id = null;
        this._name  = '';
        this._subName  = '';
        this._img  = '';
        this._content = '';
        this._lastModifiedAt = new Date();
        this._createdAt = new Date();
    }

    public getProgram() : Program{
        return {
            id : this.id ,
            name : this.name,
            subName : this.subName,
            img : this.img,
            content : this.content,
        }
    }

    public setProgram(newPorgram : Program) {
        this._id = newPorgram.id;
        this._name  = newPorgram.name;
        this._subName  = newPorgram.subName;
        this._img  = newPorgram.img;
        this._content = newPorgram.content;
        this._lastModifiedAt = new Date();
    }

    public isValidProgram(){
        return isStrValid(this.name) && isStrValid(this.subName) && isStrValid(this.img) && isStrValid(this.content);
    }

    public get id(): number | null {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get subName(): string {
        return this._subName;
    }
    public set subName(value: string) {
        this._subName = value;
    }
   
    public get img(): string {
        return this._img;
    }
    public set img(value: string) {
        this._img = value;
    }

    public get content(): string {
        return this._content;
    }
    public set content(value: string) {
        this._content = value;
    }
   
}