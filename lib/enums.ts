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


enum AdminHeaderMenu {
    home = "홈",
    about = "소개",
    stay = "스테이",
    program = "프로그램",
    booking = "실시간 예약",
    cafe = "카페",
    inquiry = "문의",
    info = "운영 정보 관리",
    image = "이미지 관리하기",
  }

enum HeaderMenu {
    home = "/home",
    about = "/about",
    stay = "/stay",
    program = "/program",
    cafe = "/cafe",
    booking = "/booking",
    inquiry = "/inquiry",
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
    specials,
    naverorderlink
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
    AdminHeaderMenu,
    HeaderMenu,
    HomeSection,
    CafeOption,
    CafeSection,
    BizSection,
    AxiosResponse,
    StayPillOption
}
