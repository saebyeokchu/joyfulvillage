
// id : number | null,
// topImages : string,
// contentImages : string,
// content : string,
// lastModifiedAt : Date,
// createdAt : Date

import { SoksoDetail } from "../Types";

export class SoksoDetailClass {
    private _id: number | null;
    private _topImages: string;
    private _contentImages : string;
    private _content: string;
    private _lastModifiedAt: Date;
    private _createdAt: Date;

    public constructor() {
        this._id = null
        this._topImages  = '';
        this._contentImages  = '';
        this._content = '';
        this._lastModifiedAt = new Date();
        this._createdAt = new Date();
    }

    public getSoksoDetail() : SoksoDetail{
        return {
            id : this._id,
            topImages : this._topImages,
            contentImages : this._contentImages,
            content : this._content,
            lastModifiedAt : this._lastModifiedAt,
            createdAt : this._createdAt
        }
    }

    public setSoksoDetail(newSoksoDetail : SoksoDetail) {
        this._id = newSoksoDetail.id;
        this._topImages  = newSoksoDetail.topImages;
        this._contentImages  = newSoksoDetail.contentImages;
        this._content = newSoksoDetail.content;
        this._lastModifiedAt = newSoksoDetail.lastModifiedAt;
        this._createdAt = newSoksoDetail.createdAt;
    }

    public get id(): number | null {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get topImages(): string {
        return this._topImages;
    }
    public set topImages(value: string) {
        this._topImages = value;
    }

    public get contentImages(): string {
        return this._contentImages;
    }
    public set contentImages(value: string) {
        this._contentImages = value;
    }

    public get content(): string {
        return this._content;
    }
    public set content(value: string) {
        this._content = value;
    }
}