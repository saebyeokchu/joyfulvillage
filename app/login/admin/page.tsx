"use client"

import { authService } from "@/app/_service";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Login() {

    const emailAuthCodeRef = useRef<any>();
    const router = useRouter();

    const sendEmailAuthCode = async () => {
        console.log("[sendEmailAuthCode]");
        //이메일 추후 비밀처리
        const result = await authService.sendAuth("cuu2252@gmail.com");
        console.log(result);
        if(result.status == 200){
            window.alert("인증번호 전송이 완료되었습니다.");
        }

    }

    const checkEmailAuthCode = async() => {
        console.log("[checkEmailAuthCode]");
        //이메일 추후 비밀처리
        const result = await authService.getAuth(emailAuthCodeRef.current?.value);
        console.log(result);
        if(result.status == 200){
            // window.alert("인증번호 전송이 완료되었습니다.");
            localStorage.setItem("joyfuladminaccpedted","logginedasadmin");
            router.push("/admin");
        }
    }

    return (
        <div className="relative flex flex-col h-screen max-w-[85rem] w-full mx-auto content-center justify-items-center self-center items-center place-self-center justify-self-center md:flex md:justify-between">
            <div className="mt-20 bg-white border border-gray-200 rounded-xl shadow-sm w-[30rem]">
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
                                    <input type="text" id="text" name="text" className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error" />
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
                                    <input type="password" id="password" name="password" className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" />
                                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                        <svg className="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                        </svg>
                                    </div>
                                </div>
                                <p className="hidden text-xs text-red-600 mt-2" id="password-error">8+ characters required</p>
                            </div> */}

                            <button onClick={sendEmailAuthCode} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-amber-600 text-white hover:bg-amber-700 focus:outline-none focus:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none">관리자 이메일로 인증번호 받기</button>

                            <input ref={emailAuthCodeRef} type="text" id="emailAuthCode" name="emailAuthCode" className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error" />

                            <div className="flex items-center">
                                <p className="mt-2 text-sm text-gray-600 ">관리자 로그인이 불가능하신가요? 
                                    <a className="text-amber-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium " href="../examples/html/signup.html">
                                        문의하기
                                    </a>
                                </p>
                            </div>

                            <button onClick={checkEmailAuthCode} className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-amber-600 text-white hover:bg-amber-700 focus:outline-none focus:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none">접속하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}