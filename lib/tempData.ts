import { StayType } from "@/types"
import { AboutSection } from "./enums";
import { Instagram } from "./svgs";
import { AboutType } from "@/types/About";

const Options : StayType.Option[] = [
    {
        id : 1,
        name : '바베큐 그릴 세트',
        introduction : '자연속에서 맛있는 바베큐를 즐겨보세요!',
        mainImgs : ['/soop-n/6.jpeg','/soop-n/8.jpeg','/soop-n/9.jpeg','/soop-n/10.jpeg','/soop-n/1.jpeg'],
        content : `
                        숲 속에서 즐기는 여름 물놀이!
                        <br/>푸른 풍경을 바라보며 프라이빗한 물놀이를 즐겨보세요!
                        <br/>
                        <br/>대형 풀장(수용 인원: 최대 성인 10명)
                        <br/>운영기간: 7~8월
                        <br/>선착순 이용 가능(예약순)
                        <br/>*가격: 인당 5,000원(숙소 이용시)/ 숙소 미 이용시 10,000원
                   `,
        stay_id : 1,
        lastModifiedAt : new Date(),
        createdAt : new Date()
    },
    {
        id : 2,
        name : '글램핑 세트',
        introduction : '맛있는 바베큐와 함께 편안한 글램핑 분위기를 연출해보세요!',
        mainImgs : ['/soop-n/7.jpeg'],
        content : ` 제공물품 : 나무선반, 캠핑용 식기(조리도구, 그릇, 컵), 구이바다 스토브
                    <br />미니 조명, 랜턴, 주전자, 원목도마, 바람마개, 장작, 오로라 가루
                    <br />바베큐 그릴 포함 사항(캠핑 테이블2, 캠핑의자2, 화로, 숯(착화제 포함) )
                    <br />그릴망, 점화 도구, 집게, 장갑, 야외 조명1`,
        stay_id : 1,
        lastModifiedAt : new Date(),
        createdAt : new Date()
    },
    {
        id : 3,
        name : '야외 풀장',
        introduction : '운영기간 7월 ~ 8월',
        mainImgs : ['/outside/4.jpg'],
        content : `숲 속에서 즐기는 여름 물놀이!
                   <br />푸른 풍경을 바라보며 프라이빗한 물놀이를 즐겨보세요!`,
        stay_id : 1,
        lastModifiedAt : new Date(),
        createdAt : new Date()
    }
]

// const Stays : StayType.Stay[] = [
//     {
//         id: 1,
//         name: '숲스테이도천',
//         address: '영덕군 남정면 산정로 319',
//         introduction1 : `숲스테이 도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.
//                         숲의 고요함과 맑은 공기를 느끼며, 일상에서 벗어나 완전한 휴식을 경험할 수 있습니다.`,
//         mainImgs: ['/soop/1.jpg', '/soop/2.jpg', '/soop/3.jpg'],
//         optionAvailable : true,
//         lastModifiedAt: new Date(),
//         createdAt: new Date(),
//     },
//     {
//         id: 2,
//         name: '북스테이도천',
//         address: '영덕군 남정면 산정로 320 1F',
//         introduction1 : `'북스테이 도천'은 조이풀빌리지 1층에 위치해있으며 미디어를 잠시멀리하며 책을 읽고 휴식을 즐길 수 있는 공간입니다.
// 자연과 책이 조화를이루는 이곳에서 마음의 평온을 찾고, 독서의 즐거움을 만끽할 수 있습니다.`,
//         mainImgs: ['/book/1.jpeg', '/book/2.jpeg', '/book/3.jpeg'],
//         optionAvailable : false,
//         lastModifiedAt: new Date(),
//         createdAt: new Date(),
//     }
// ]
        
// const Rooms : StayType.Room[] = [
//     {
//         id: 2,
//         name: '숲스테이도천 1호',
//         structure: '독채 (원룸형, 침대1, 욕실1)',
//         introduction1 : `'숲스테이 도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.`,
//         introduction2 : `숲의 고요함과 맑은 공기를 느끼며, 일상에서 벗어나 완전한 휴식을 경험할 수 있습니다.`,
//         mainImgs: ['/soop/1.jpg', '/soop/2.jpg', '/soop/3.jpg'],
//         content : `<div><strong>[객실 안내]</strong></div>
//             <div>&nbsp;</div>
//             <div>&nbsp;</div>
//             <div>&lt;입실 및 퇴실&gt;</div>
//             <div>- 15:00 입실 / 11:00 퇴실</div>
//             <div>- 청소 및 원활한 운영을 위해 퇴실 시간을 지켜주세요</div>
//             <div>&nbsp;</div>
//             <div>&lt;숙박 인원&gt;</div>
//             <div>- 2인 기준 최대 5인- 추가 1인 당 1만원(침구류 제공)</div>
//             <div>- 36개월 미만 무료</div>
//             <div><br />&lt;추가 서비스&gt;</div>
//             <div>- 바베큐 그릴 대여 : 2만원</div>
//             <div>- 수영장 : 인당 5천원 (선착순 예약, 최대 15인 이용)</div>`,
//             stay_id : 1,
//         reserveLink: 'https://jpg.josunhotel.com/main.do',
//         lastModifiedAt: new Date(),
//         createdAt: new Date(),
//     },
//     {
//         id: 3,
//         name: '북라운지',
//         structure: '거실, 방2, 화장실, 취사가능',
//         introduction1 : `아름답고 가치 있는 책을 만드는 '도서출판 하영인'이 운영하는 작은 서점`,
//         content : `아름답고 가치 있는 책을 만드는 '도서출판 하영인'이 운영하는 작은 서점`,
//         mainImgs: ['/book/1.jpeg', '/book/2.jpeg', '/book/3.jpeg','/book/4.jpeg'],
//         stay_id : 2,
//         reserveLink: 'https://jpg.josunhotel.com/main.do',
//         lastModifiedAt: new Date(),
//         createdAt: new Date(),
//     },
//     {
//         id: 4,
//         name: 'FAITH, HOPE',
//         structure: '거실, 방2, 화장실, 취사가능',
//         introduction1 : `아름답고 가치 있는 책을 만드는 '도서출판 하영인'이 운영하는 작은 서점`,
//         content : `'북스테이도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.`,
//         mainImgs: ['/book/8.jpeg', '/book/9.jpeg', '/book/10.jpeg', '/book/11.jpeg'],
//         stay_id : 2,
//         reserveLink: 'https://jpg.josunhotel.com/main.do',
//         lastModifiedAt: new Date(),
//         createdAt: new Date()
//     },
//     {
//         id: 5,
//         name: 'LOVE, JOY',
//         structure: '방1, 공동 화장실, 샤워실 이용',
//         introduction1 : `아름답고 가치 있는 책을 만드는 '도서출판 하영인'이 운영하는 작은 서점`,
//         content : `'북스테이도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.`,
//         mainImgs: ['/book/11.jpeg', '/book/8.jpeg', '/book/9.jpeg', '/book/10.jpeg'],
//         stay_id : 2,
//         reserveLink: 'https://jpg.josunhotel.com/main.do',
//         lastModifiedAt: new Date(),
//         createdAt: new Date()
//     },
//     {
//         id: 6,
//         name: '식당과 공동주방',
//         structure: '수용 인원 70명',
//         introduction1 : `아름답고 가치 있는 책을 만드는 '도서출판 하영인'이 운영하는 작은 서점`,
//         content : `'북스테이도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.`,
//         mainImgs: ['/book/16.jpeg', '/book/6.jpeg', '/book/7.jpeg'],
//         stay_id : 2,
//         reserveLink: 'https://jpg.josunhotel.com/main.do',
//         lastModifiedAt: new Date(),
//         createdAt: new Date()
//     },
//     {
//         id: 7,
//         name: '북스테이도천 전체 대관(1박)',
//         structure: '영덕군 남정면 산정로 319',
//         introduction1 : `아름답고 가치 있는 책을 만드는 '도서출판 하영인'이 운영하는 작은 서점`,
//         content : `'북스테이도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.`,
//         mainImgs: ['/book/4.jpeg'],
//         stay_id : 2,
//         reserveLink: 'https://jpg.josunhotel.com/main.do',
//         lastModifiedAt: new Date(),
//         createdAt: new Date()
//     }
// ]

const Abouts : AboutType[] = [
    {
        id: 0,
        title: 'joyful',
        address: '영덕군 남정면 산정로 320',
        content: `조이풀빌리지는 1994년 폐교된 도천초등학교를
                            리모델링하여 탄생한 문화예술 복합공간입니다.
                            이곳은 자연 속에서 온전한 쉼과 회복을 
                            경험할 수 있는 특별한 장소로 세 가지의
                            주요 공간으로 이루어져 있습니다.`,
        InstagramId: 'joyvil_company',
        InstagramLink: 'https://www.instagram.com/joyvil_company/',
        lastModifiedAt: new Date(),
        createdAt: new Date(),
        imgSrc: ""
    },
    {
        id : 1,
        imgSrc : 'soop/1.jpg',
        title : '숲스테이도천',
        address : '영덕군 남정면 산정로 320',
        content : `숲스테이 도천'은 조이풀 빌리지 건너편
                    도천숲에 위치해 있으며 자연 속에서 깊은 휴식을
                    취할 수 있는 숙소입니다. 숲의 고요함과
                     맑은 공기를 느끼며,일상에서 벗어나 완전한 휴식을
                    경험할 수 있습니다.`,
        InstagramId : 'joyvil_company',
        InstagramLink : 'https://www.instagram.com/joyvil_company/',
        lastModifiedAt: new Date(),
        createdAt: new Date()
    },
    {
        id : 2,
        imgSrc : 'book/1.jpeg',
        title : '북스테이도천',
        address : '영덕군 남정면 산정로 320 1F',
        content : `북스테이 도천'은 조이풀빌리지 1층에
                    위치해있으며 미디어를 잠시 멀리하며
                    책을 읽고 휴식을 즐길 수 있는 공간입니다.
                    자연과 책이 조화를 이루는 이곳에서 마음의
                    평온을 찾고, 독서의 즐거움을 만끽할 수 있습니다.`,
        InstagramId : 'joyvil_company',
        InstagramLink : 'https://www.instagram.com/joyvil_company/',
        lastModifiedAt: new Date(),
        createdAt: new Date()
    },
    {
        id : 3,
        imgSrc : 'soop/1.jpg',
        title : '카페도천',
        address : '영덕군 남정면 산정로 320 2F',
        content : `'카페 도천'은 조이풀빌리지 2층에 위치하여
                    산과 들의 아름다운 풍경을 바라보며 차와 브런치를
                    즐길 수 있는 공간입니다.`,
        InstagramId : 'cafe.dochen',
        InstagramLink : 'https://www.instagram.com/cafe.docheon/',
        lastModifiedAt: new Date(),
        createdAt: new Date()
    }
];

export {
    Options,
    // Stays,
    // Rooms,
    Abouts
}
                                
