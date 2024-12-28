import axios from "axios";

async function sendAuth(userEmailAddr : string) {
    return await axios.get(`http://localhost:8000/api/v1/emailauth/send-auth/?userEmailAddr=` + userEmailAddr);
}

async function getAuth(inputAuthCode : number) {
    console.log(inputAuthCode)
    return await axios.get(`http://localhost:8000/api/v1/emailauth/get-auth/?inputAuthCode=` + inputAuthCode);
}

export {
    sendAuth,
    getAuth
}