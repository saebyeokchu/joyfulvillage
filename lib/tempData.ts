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
        contentImgs : ['/images/barbecue1.jpeg','/images/barbecue2.jpeg','/images/barbecue2.jpeg'],
        lastModifiedAt : new Date(),
        createdAt : new Date()
    }
]
        
const Rooms : StayType.Room[] = [
    {
        id: 2,
        name: '숲스테이도천 1호',
        introduction: '독채 (원룸형, 침대1, 욕실1)',
        mainImgs: ['/images/soop/1.jpg', '/images/soop/2.jpg', '/images/soop/3.jpg'],
        content : '\'숲스테이 도천\'은 조이풀 빌리지 건너편 도천숲에 위치해 있으며자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다. 숲의 고요함과 맑은 공기를 느끼며, 일상에서 벗어나 완전한 휴식을 경험할 수 있습니다.',
        stayid : 1,
        rdid: null,
        reserveLink: 'https://jpg.josunhotel.com/main.do',
        lastModifiedAt: new Date(),
        createdAt: new Date(),
    }
]

export {
    Options,
    Rooms
}
                                
