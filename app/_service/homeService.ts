import { UploadImageWithDeletion } from "../_api/File";
import { UpdateHomeData } from "../_api/Home";
import { HomeSection } from "../_data/Enums";

async function editHomeData(editPart : any[]){
    let i = 0;

    for( i = 0 ; i < editPart.length ; i++ ) {
        const editInfo = editPart[i];

        switch(editInfo.section){
            case HomeSection.mainImg : 
            case HomeSection.introduction :
            case HomeSection.spacecafe :
            case HomeSection.spacebook :
            case HomeSection.spacesoop :
                await UploadImageWithDeletion(editInfo.formData);
                break;
            
            case HomeSection.mainImgContent1 :
            case HomeSection.mainImgContent2 :
            case HomeSection.mainImgContent3 :
            case HomeSection.introductionContent :
            case HomeSection.spacebookContent :
            case HomeSection.spacecafeCotnent :
            case HomeSection.spacesoopContent :
                await UpdateHomeData(editInfo.section,editInfo.content);
                break;
        }
    }
}

export {
    editHomeData
}
