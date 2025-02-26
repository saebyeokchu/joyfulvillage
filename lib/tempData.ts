import { StayType } from "@/types"

const Options : StayType.Option[] = [
    {
        id : 1,
        name : '바베큐 그릴 세트',
        introduction : '자연속에서 맛있는 바베큐를 즐겨보세요!',
        mainImg : ['/images/barbecue1.jpeg'],
        content : `
                        숲 속에서 즐기는 여름 물놀이!
                        <br/>푸른 풍경을 바라보며 프라이빗한 물놀이를 즐겨보세요!
                        <br/>
                        <br/>대형 풀장(수용 인원: 최대 성인 10명)
                        <br/>운영기간: 7~8월
                        <br/>선착순 이용 가능(예약순)
                        <br/>*가격: 인당 5,000원(숙소 이용시)/ 숙소 미 이용시 10,000원
                   `,
        contentImgs : ['/images/barbecue1.jpeg','/images/barbecue2.jpeg','/images/barbecue3.jpeg'],
        lastModifiedAt : new Date(),
        createdAt : new Date()
    },
    {
        id : 2,
        name : '글램핑 세트',
        introduction : '맛있는 바베큐와 함께 편안한 글램핑 분위기를 연출해보세요!',
        mainImg : ['/images/barbecue2.jpeg'],
        content : ` 제공물품 : 나무선반, 캠핑용 식기(조리도구, 그릇, 컵), 구이바다 스토브
                    <br />미니 조명, 랜턴, 주전자, 원목도마, 바람마개, 장작, 오로라 가루
                    <br />바베큐 그릴 포함 사항(캠핑 테이블2, 캠핑의자2, 화로, 숯(착화제 포함) )
                    <br />그릴망, 점화 도구, 집게, 장갑, 야외 조명1`,
        contentImgs : ['/images/barbecue2.jpeg','/images/barbecue3.jpeg','/images/barbecue1.jpeg'],
        lastModifiedAt : new Date(),
        createdAt : new Date()
    },
    {
        id : 3,
        name : '야외 풀장',
        introduction : '운영기간 7월 ~ 8월',
        mainImg : ['/images/barbecue3.jpeg'],
        content : `숲 속에서 즐기는 여름 물놀이!
                   <br />푸른 풍경을 바라보며 프라이빗한 물놀이를 즐겨보세요!`,
        contentImgs : ['/images/barbecue3.jpeg','/images/barbecue2.jpeg','/images/barbecue1.jpeg'],
        lastModifiedAt : new Date(),
        createdAt : new Date()
    }
]

const Stays : StayType.Stay[] = [
    {
        id: 1,
        name: '숲스테이도천',
        address: '영덕군 남정면 산정로 319',
        introduction : `숲스테이 도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.
                        숲의 고요함과 맑은 공기를 느끼며, 일상에서 벗어나 완전한 휴식을 경험할 수 있습니다.`,
        mainImgs: ['/images/soop/1.jpg', '/images/soop/2.jpg', '/images/soop/3.jpg'],
        optionAvailable : true,
        lastModifiedAt: new Date(),
        createdAt: new Date(),
    },
    {
        id: 2,
        name: '북스테이도천',
        address: '영덕군 남정면 산정로 320 1F',
        introduction : `'북스테이 도천'은 조이풀빌리지 1층에 위치해있으며 미디어를 잠시멀리하며 책을 읽고 휴식을 즐길 수 있는 공간입니다.
자연과 책이 조화를이루는 이곳에서 마음의 평온을 찾고, 독서의 즐거움을 만끽할 수 있습니다.`,
        mainImgs: ['/images/book/1.jpeg', '/images/book/2.jpeg', '/images/book/3.jpeg'],
        optionAvailable : false,
        lastModifiedAt: new Date(),
        createdAt: new Date(),
    }
]
        
const Rooms : StayType.Room[] = [
    {
        id: 2,
        name: '숲스테이도천 1호',
        structure: '독채 (원룸형, 침대1, 욕실1)',
        introduction1 : `'숲스테이 도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.`,
        introduction2 : `숲의 고요함과 맑은 공기를 느끼며, 일상에서 벗어나 완전한 휴식을 경험할 수 있습니다.`,
        mainImgs: ['/images/soop/1.jpg', '/images/soop/2.jpg', '/images/soop/3.jpg'],
        content : `<div><strong>[객실 안내]</strong></div>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
            <div>&lt;입실 및 퇴실&gt;</div>
            <div>- 15:00 입실 / 11:00 퇴실</div>
            <div>- 청소 및 원활한 운영을 위해 퇴실 시간을 지켜주세요</div>
            <div>&nbsp;</div>
            <div>&lt;숙박 인원&gt;</div>
            <div>- 2인 기준 최대 5인- 추가 1인 당 1만원(침구류 제공)</div>
            <div>- 36개월 미만 무료</div>
            <div><br />&lt;추가 서비스&gt;</div>
            <div>- 바베큐 그릴 대여 : 2만원</div>
            <div>- 수영장 : 인당 5천원 (선착순 예약, 최대 15인 이용)</div>`,
        stayid : 1,
        reserveLink: 'https://jpg.josunhotel.com/main.do',
        lastModifiedAt: new Date(),
        createdAt: new Date(),
    },
    {
        id: 3,
        name: '북라운지',
        structure: '거실, 방2, 화장실, 취사가능',
        introduction1 : `아름답고 가치 있는 책을 만드는 '도서출판 하영인'이 운영하는 작은 서점`,
        content : `아름답고 가치 있는 책을 만드는 '도서출판 하영인'이 운영하는 작은 서점`,
        mainImgs: ['/images/book/1.jpeg', '/images/book/2.jpeg', '/images/book/3.jpeg'],
        stayid : 2,
        reserveLink: 'https://jpg.josunhotel.com/main.do',
        lastModifiedAt: new Date(),
        createdAt: new Date(),
    },
    {
        id: 4,
        name: 'FAITH, HOPE',
        structure: '거실, 방2, 화장실, 취사가능',
        introduction1 : `아름답고 가치 있는 책을 만드는 '도서출판 하영인'이 운영하는 작은 서점`,
        content : `'북스테이도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.`,
        mainImgs: ['/images/book/1.jpeg', '/images/book/2.jpeg', '/images/book/3.jpeg'],
        stayid : 2,
        reserveLink: 'https://jpg.josunhotel.com/main.do',
        lastModifiedAt: new Date(),
        createdAt: new Date()
    },
    {
        id: 5,
        name: 'LOVE, JOY',
        structure: '방1, 공동 화장실, 샤워실 이용',
        introduction1 : `아름답고 가치 있는 책을 만드는 '도서출판 하영인'이 운영하는 작은 서점`,
        content : `'북스테이도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.`,
        mainImgs: ['/images/book/1.jpeg', '/images/book/2.jpeg', '/images/book/3.jpeg'],
        stayid : 2,
        reserveLink: 'https://jpg.josunhotel.com/main.do',
        lastModifiedAt: new Date(),
        createdAt: new Date()
    },
    {
        id: 6,
        name: '식당과 공동주방',
        structure: '수용 인원 70명',
        introduction1 : `아름답고 가치 있는 책을 만드는 '도서출판 하영인'이 운영하는 작은 서점`,
        content : `'북스테이도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.`,
        mainImgs: ['/images/book/6.jpeg', '/images/book/2.jpeg', '/images/book/3.jpeg'],
        stayid : 2,
        reserveLink: 'https://jpg.josunhotel.com/main.do',
        lastModifiedAt: new Date(),
        createdAt: new Date()
    },
    {
        id: 7,
        name: '북스테이도천 전체 대관(1박)',
        structure: '영덕군 남정면 산정로 319',
        introduction1 : `아름답고 가치 있는 책을 만드는 '도서출판 하영인'이 운영하는 작은 서점`,
        content : `'북스테이도천'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.`,
        mainImgs: ['/images/book/1.jpeg', '/images/book/2.jpeg', '/images/book/3.jpeg'],
        stayid : 2,
        reserveLink: 'https://jpg.josunhotel.com/main.do',
        lastModifiedAt: new Date(),
        createdAt: new Date()
    }
]

export {
    Options,
    Stays,
    Rooms
}
                                
