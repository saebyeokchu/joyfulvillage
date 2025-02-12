import axios from "axios";
import { ApiAddress } from "../lib/const";

async function sendAuth(userEmailAddr : string) {
    return await axios.get(`${ApiAddress}/emailauth/send-auth/?userEmailAddr=` + userEmailAddr);
}

// content = request.GET.get("content")
// ipAdress = request.GET.get("ipAdress")
// requestingPerson = request.GET.get("requestingPerson")

async function sendRecoverRequest(requestPerson : string, currentIp : string) {
    return await axios.get(`${ApiAddress}/emailauth/send-recover-request/?content=조이풀 빌리지 관리자 로그인 기능에 문제가 있습니다&requestingPerson=`+requestPerson+`&ipAddress=`+currentIp);
}

async function getAuth(inputAuthCode : number) {
    console.log(inputAuthCode)
    return await axios.get(`http://localhost:8000/api/v1/emailauth/get-auth/?inputAuthCode=` + inputAuthCode);
}

export {
    sendAuth,
    getAuth,
    sendRecoverRequest
}