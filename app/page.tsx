export default function Home() {
  return (
    <div className="relative w-full mx-auto ">
      {/* slider info section */}
      <div className="justify-center text-center slider-info-section border border-slate-600 h-screen w-full">
        <div className="bg-yellow-300 text-red-500">이미지 슬라이더</div>
      </div>
      
      {/* introduction */}
      <div className="grid grid-cols-2 min-h-96">
        <div>
          <h1>조이풀 빌리지</h1>
          <p>자연 속 문화예술 복합공간의 탄생</p>
          <p>조이풀 빌리지는 폐교를 리모델링하여 만들어진 자연과 예술이 어우러진 공간입니다.</p>
        </div>
        <div className="border justify-center text-center border-slate-400 rounded-lg introduction1-image m-10">
          <div className="bg-yellow-300 text-red-500">Introduction Image1</div>
        </div>
      </div>

      {/* introduction2 */}
      <div className="bg-yellow-300 text-red-500">Introduction Section2 ~ 조이풀 빌리지의 생성과정을 짧게 사진과 이름으로 / 필요한 만큼 늘리기</div>
      <div className="grid grid-cols-2 min-h-96">
        <div className="introduction1-image h-screen"> 1 </div>
        <div> 1 </div>
        <div> 1 </div>
        <div className="introduction1-image h-screen"> 1 </div>
        <div className="introduction1-image h-screen"> 1 </div>
        <div> 1 </div>
      </div>

      {/* introduction3-도천의 세가지 공간 */}
      <div className="bg-yellow-300 text-red-500">Introduction Section3 ~ 세가지 공간</div>
      <div className="grid grid-cols-3 h-screen">
        <div className="introduction3-1 hover:opacity-50"></div>
        <div className="introduction3-2 hover:opacity-50"></div>
        <div className="introduction3-3 hover:opacity-50"></div>
      </div>
    </div>
  )
}