const Soops = [
    {
        id : 1,
        name : '숲스테이도천1호',
        mainImg : '/soop/1.jpg',
        topImages : ['/soop/1.jpg','/soop/5.jpg','/soop/4.jpg'],
        contentImages : [
            '/soop/1.jpg',
            '/soop/2.jpg',
            '/soop/3.jpg',
            '/soop/4.jpg',
            '/soop/5.jpg',
            '/soop/6.jpg',
            '/soop/7.jpg',
            '/soop/8.jpg',
        ]
    }
]

const Sokso = [
    {
        id : 1,
        level : 1,
        group : null,
        name : '숲스테이도천',
        mainImg : '/soop-stay.jpg',
        roomType : null,
        introduction : '숲의 고요함과 맑은 공기를 느끼며, 일상에서 벗어나 완전한 휴식을 경험할 수 있습니다.',

    },
    {
        id : 2,
        level : 1,
        group : null,
        name : '북스테이도천',
        mainImg : '/book/5.jpeg',
        roomType : null,
        introduction : '자연과 책이 조화를 이루는 이곳에서 마음의 평온을 찾고, 독서의 즐거움을 만끽할 수 있습니다.',

    },
    {
        id : 3,
        level : 2,
        group : 1,
        name : '숲스테이도천1호',
        mainImg : '/soop-stay.jpg',
        roomType : '독채 (원룸형, 침대1, 욕실1)',
        introduction : '\'숲스테이도천1호\'는 조이풀 빌리지 옆 도천숲에 위치해 있으며 자연 속에서 깊은 휴식을 취할 수 있는 숙소입니다.',
        topImages : ['/soop/1.jpg','/soop/5.jpg','/soop/4.jpg'],
        content : `
            <p>기준 2인 (최대 5인) 독채 (원룸형, 침대1, 욕실1)</p>
            <p>&nbsp;</p>
            <p>천연기념물 '도천숲'에 위치한 독채 형태의 방갈로 숙소입니다.&nbsp;</p>
            <p>바쁜 일상에서 벗어나 자연이 주는 기운과 평온함을 누리시길 바랍니다.</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>[객실안내]</p>
            <figure class="table">
            <table class="ck-table-resized" style="float: left;" border="0"><colgroup><col /><col /></colgroup>
            <tbody>
            <tr>
            <td>
            <p>&lt;입실 및 퇴실&gt;&nbsp;</p>
            <p>- 15:00 입실 / 11:00 퇴실&nbsp;</p>
            <p>- 청소 및 원활한 운영을 위해 퇴실 시간을 지켜주세요</p>
            </td>
            <td>
            <p>&lt;구비시설&gt;</p>
            <p>- 퀸사이즈 침대, 2인 쇼파</p>
            <p>- 아일랜드 식탁, 스툴 4</p>
            <p>- 냉장고, 인덕션, 전자레인지, 전기포트, 토스터기</p>
            <p>- 조리도구, 식기</p>
            </td>
            </tr>
            <tr>
            <td>&lt;숙박 인원&gt;&nbsp;<br />- 2인 기준 최대 5인&nbsp;<br />- 추가 1인 당 1만원(침구류 제공)&nbsp;<br />- 36개월 미만 무료</td>
            <td>
            <p>&lt;기본 제공 서비스&gt;</p>
            <p>- 비누</p>
            <p>- 바디워시 </p>
            <p>- 타올</p>
            </td>
            </tr>
            <tr>
            <td>
            <p>&lt;추가 서비스&gt;</p>
            <p>- 바베큐 그릴 대여 : 2만원</p>
            <p>- 수영장 : 인당 5천원 (선착순 예약, 최대 15인 이용)</p>
            </td>
            <td>&nbsp;</td>
            </tr>
            </tbody>
            </table>
            </figure>
        `,
        contentImages : [
            '/soop/1.jpg',
            '/soop/2.jpg',
            '/soop/3.jpg',
            '/soop/4.jpg',
            '/soop/5.jpg',
            '/soop/6.jpg',
            '/soop/7.jpg',
            '/soop/8.jpg',
        ]
    },
    {
        id : 4,
        level : 2,
        group : 2,
        name : '북스테이도천1호',
        mainImg : '/book/5.jpeg',
        roomType : null,
        introduction : null,
    }
]

export {
    Sokso
}