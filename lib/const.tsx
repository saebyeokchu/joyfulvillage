import { MegaMenu, Menu } from "../types/Types";

const BackgroundColor = '#F1EBDD';

const NaverBookingLink = 'https://map.naver.com/p/entry/place/1024078581?placePath=%252Fhome%253Fentry%253Dplt&searchType=place&lng=129.3545276&lat=36.3070483&c=15.00,0,0,0,dh';
const NaverBlogTweleveMountLink = 'https://blog.naver.com/navhayoungin';
const InstagramHayoungingLink = 'https://www.instagram.com/hayoungin7/?hl=en';
const InstagramJoyfulLink = 'https://www.instagram.com/joyvil_company/';
const InstagramSoopStayLink = 'https://www.instagram.com/forest_stay_docheon/?hl=en';
const InstgramCafeDocehnLink = 'https://www.instagram.com/cafe.docheon/';

const AdminCode = 'logginedasadmin';

const Env = 'production';
const AdminEmailAddress =  Env === 'production' ?  'dbal6436@naver.com' : 'cuu2252@gmail.com'; //dbal6436@naver.com iiimyedam@gmail.com
const AdminApiAddress = Env === 'production' ?  `https://back.joyvil.com/api/v1/joyfulset` : 'http://localhost:8000/api/v1/joyfulset';
const BaseApiAddress = Env === 'production' ?  `https://back.joyvil.com/api/v1`: 'http://localhost:8000/api/v1';
const imgAddress = Env === 'production' ? "https://back.joyvil.com/media/" : "http://localhost:8000/media/" ;

const ResetCode = "FeMOUu";
const ManagerName = "유미";

const NoImgSrc = "/images/no-image.png";

const StringDivider = ";";

const mobilePx = "px-4 sm:px-6 lg:px-8";

export {
    BackgroundColor,

    NaverBookingLink,
    NaverBlogTweleveMountLink,
    InstagramHayoungingLink,
    InstagramJoyfulLink,
    InstagramSoopStayLink,
    InstgramCafeDocehnLink,

    AdminCode,
    AdminApiAddress,
    AdminEmailAddress,
    BaseApiAddress,
    imgAddress,
    
    ResetCode,
    ManagerName,
    NoImgSrc,
    StringDivider,
    mobilePx
}
