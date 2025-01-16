import { Dispatch, SetStateAction } from "react";
import { HomeSection } from "./Enums";

const GetHomeMainImgContent = (data : any, setMainImgContent : Dispatch<SetStateAction<[string, string, string]>>) => {
    console.log(data);

    let mainImgContent1 : string = "";
    let mainImgContent2 : string = "";
    let mainImgContent3 : string = "";

    // HomeSection
    const data1 = data.filter( ( e : any ) => e.section == HomeSection.mainImgContent1 );
    if(data1){
        mainImgContent1 = data1[0].contents;
    }

    const data2 = data.filter( ( e : any ) => e.section == HomeSection.mainImgContent2 );
    if(data2){
        mainImgContent2 = data2[0].contents;
    }

    const data3 = data.filter( ( e : any ) => e.section == HomeSection.mainImgContent3 );
    if(data3){
        mainImgContent3 = data3[0].contents;
    }

    setMainImgContent([mainImgContent1 , mainImgContent2, mainImgContent3]);
}

const GetHomeintrodcutionContent = (data : any, setIntrodcutionContent : Dispatch<SetStateAction<string>>) => {
    const target = data.filter( ( e : any ) => e.section == HomeSection.introductionContent );
    if(target){
        setIntrodcutionContent(target[0].contents);
    }
}

const GetHomeSpaceContent = (data : any, setSpaceContents : Dispatch<SetStateAction<[string, string, string]>>) => {
    console.log(data);

    let soop : string = "";
    let book : string = "";
    let cafe : string = "";

    // HomeSection
    const data1 = data.filter( ( e : any ) => e.section == HomeSection.spacesoopContent );
    if(data1){
        soop = data1[0].contents;
    }

    const data2 = data.filter( ( e : any ) => e.section == HomeSection.spacebookContent );
    if(data2){
        book = data2[0].contents;
    }

    const data3 = data.filter( ( e : any ) => e.section == HomeSection.spacecafeCotnent );
    if(data3){
        cafe = data3[0].contents;
    }

    setSpaceContents([soop , book, cafe]);
}

export {
    GetHomeMainImgContent,
    GetHomeintrodcutionContent,
    GetHomeSpaceContent
}