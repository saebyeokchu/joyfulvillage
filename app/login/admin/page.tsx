"use client"

import { AdminEmailAddress, ManagerName, ResetCode } from "@/lib/const";
import { GeneralError } from "@/lib/messages";
import { GetCurrentIp } from "@/lib/common";
import { authService } from "@/service";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { DimBackground } from "@/components/ui";
import { Loading } from "@/components/layout";
import { useJoyfulContext } from "@/context/JoyfulContext";

export default function Login() {

    const joyfulContext = useJoyfulContext();

    const emailAuthCodeRef = useRef<any>();
    const router = useRouter();
    const requestNameRef : any = useRef<any>('');
    const requestCodeRef : any = useRef<any>('');

    const [ sendEmailSuccessful, setSendEmailSuccessful ] = useState<boolean>(false);
    
    const sendErrorRequest = async () => {
        console.log("[sendErrorRequest]");
        const currentIp = await GetCurrentIp();

        if(requestNameRef.current && requestCodeRef.current && currentIp){
            //random code 확인 
            //이메일 추후 비밀처리
            await authService.sendRecoverRequest(requestNameRef.current.value, currentIp.ip); //dbal6436@naver.com

            if(requestCodeRef.current.value == ResetCode && requestNameRef.current.value == ManagerName){
                window.confirm("관리자 이메일은 " + AdminEmailAddress + " 입니다. 관리자 이메일 변경절차를 진행할까요?");
            }else{
                window.alert(GeneralError.unmatchedInfo);
            }
        }
        
        window.alert("관리자 로그인 절차에 문제가 생겼습니다. 잠시후 다시 시도하시거나 01027403096으로 문의하세요.");

    }

    const sendEmailAuthCode = async () => {
        console.log("[sendEmailAuthCode]");
        
        //loading 
        joyfulContext.openAdminLoading = true;

        //이메일 추후 비밀처리
        const result = await authService.sendAuth(AdminEmailAddress); //dbal6436@naver.com
        console.log(result);
        if(result.status == 200){
            window.alert("인증번호 전송이 완료되었습니다.");
            setSendEmailSuccessful(true);
        }

        joyfulContext.openAdminLoading = false;

    }

    const checkEmailAuthCode = async() => {
        console.log("[checkEmailAuthCode]");
        joyfulContext.openAdminLoading = true;

        //이메일 추후 비밀처리
        const result = await authService.getAuth(emailAuthCodeRef.current?.value);

        if(result.status == 200 && result.data){
            localStorage.setItem("joyfuladminaccpedted","logginedasadmin");
            router.push("/admin");
        }else{
            window.alert("인증번호가 일치하지 않습니다. "+GeneralError.tryLater);
            if (emailAuthCodeRef.current) {
                emailAuthCodeRef.current.value = null;
            }
        }

        joyfulContext.openAdminLoading = false;
    }

    return (
        <>
            <div className="relative flex flex-col h-screen max-w-[85rem] w-full mx-auto content-center justify-items-center self-center items-center place-self-center justify-self-center md:flex md:justify-between">
                <div id="requestRocoverModal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-[80] opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none" role="dialog" aria-labelledby="requestRocoverModal-label">
                    <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                        <div className="flex flex-col  shadow-sm rounded-xl pointer-events-auto bg-white">
                            <div className="flex justify-between items-center py-3 px-4 ">
                                <h3 id="requestRocoverModal-label" className="font-bold ">
                                오류 전송하기
                                </h3>
                                <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border-0 border-0-transparent hover:bg-point-darker focus:outline-none focus:bg-point-darker disabled:opacity-50 disabled:pointer-events-none " aria-label="Close" data-hs-overlay="#requestRocoverModal">
                                <span className="sr-only">Close</span>
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                                </button>
                            </div>
                            <div className="p-4 overflow-y-auto">
                                <p className="mt-1">
                                    <input ref={requestNameRef} type="text" placeholder="접수자 이름" className="block w-full  
                                            mr-4 py-2 px-4
                                            border-0
                                        "/>
                                    <input ref={requestCodeRef} type="text" placeholder="접수코드" className="block w-full  
                                            mr-4 py-2 px-4
                                            border-0
                                        "/>
                                </p>
                            </div>
                            <button onClick={sendErrorRequest} className="w-full mt-3 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium border-0 border-0-transparent bg-amber-600 text-white hover:bg-amber-700 focus:outline-none focus:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none">관리자 이메일 찾기</button>
                        </div>
                    </div>
                </div>

                <div className="mt-24 bg-white border-0 border-0-gray-200 rounded-xl shadow-sm w-[30rem]">
                    <div className="p-4 sm:p-7">
                        <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">관리자 로그인</h1>
                        <div className="mt-2 text-sm text-gray-600 ">
                            <p>이 페이지는 조이풀 빌리지 관리를 위해 계정을</p> 
                            <p>발급받은 사람들만 접속하실 수 있습니다.</p>
                        </div>
                        </div>

                        <div className="mt-5">
                                <div className="grid gap-y-4">
                                {/* <div>
                                    <label  className="block text-sm mb-2 dark:text-white">아이디</label>
                                    <div className="relative">
                                        <input type="text" id="text" name="text" className="py-3 px-4 block w-full border-0 border-0-gray-200 rounded-lg text-sm focus:border-0-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-0-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error" />
                                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                            <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                                </div> */}

                                {/* <div>
                                    <div className="flex justify-between items-center">
                                        <label  className="block text-sm mb-2 dark:text-white">비밀번호</label>
                                    </div>
                                    <div className="relative">
                                        <input type="password" id="password" name="password" className="py-3 px-4 block w-full border-0 border-0-gray-200 rounded-lg text-sm focus:border-0-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-0-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" />
                                        <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                            <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                                </div> */}

                                <button onClick={sendEmailAuthCode} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-amber-600 text-white hover:bg-amber-700 focus:outline-none focus:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none">관리자 이메일로 인증번호 받기</button>

                                { sendEmailSuccessful && <input ref={emailAuthCodeRef} type="text" id="emailAuthCode" name="emailAuthCode" className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-0-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-0-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" /> }

                                <div className="flex items-center">
                                    <p className="mt-2 text-sm text-gray-600 cursor-pointer">관리자 로그인이 불가능하신가요? 
                                        <span className="text-amber-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium " aria-haspopup="dialog" aria-expanded="false" aria-controls="requestRocoverModal" data-hs-overlay="#requestRocoverModal">
                                            문의하기
                                        </span>
                                    </p>
                                </div>

                                { sendEmailSuccessful &&  <button onClick={checkEmailAuthCode} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-amber-600 text-white hover:bg-amber-700 focus:outline-none focus:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none">접속하기</button> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            { joyfulContext.openAdminLoading && <Loading /> }
        </>
    )
}