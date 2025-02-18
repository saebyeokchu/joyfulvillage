enum EditOption{
    'homeMainImg' = '홈 대표 이미지 수정하기',
    'homeMainContent' = '홈 내용 수정하기',
    'introductionImg' = '인트로 이미지 수정하기',
    'introductionContent' = '인트로 내용 수정하기',
    'spacesoopImg' = '숲스테이도천 이미지 수정하기',
    'sapcesoopContent' = '숲스테이도천 내용 수정하기',
    'spacebookImg' = '북스테이도천 이미지 수정하기',
    'sapcebookContent' = '북스테이도천 내용 수정하기',
    'spacecafeImg' = '카페도천 이미지 수정하기',
    'sapcecafeContent' = '카페페도천 내용 수정하기',
}

enum HomeSection{
    'mainImg',
    'mainImgContent1',
    'mainImgContent2',
    'mainImgContent3',
    'introduction',
    'introductionContent',
    'spacesoop',
    'spacesoopContent',
    'spacebook',
    'spacebookContent',
    'spacecafe',
    'spacecafeCotnent'
}

enum CafeOption {
    cafe,
    menu,
}

enum CafeSection {
    subTitle,
    mainImgs,
    menus,
    specials
}

enum BizSection {
    kakaoMap,
    runningHours,
    bizNumber,
    sns
}

enum AxiosResponse {
    Successful = 200
}

enum StayPillOption {
    rooms,
    option
} 

export {
    EditOption,
    HomeSection,
    CafeOption,
    CafeSection,
    BizSection,
    AxiosResponse,
    StayPillOption
}
