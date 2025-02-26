"use client"
import { useRouter } from "next/navigation";
import { NotFound } from "@/components/layout";

export default function Login() {
    const router = useRouter();
    
    return (
        <NotFound onClickFunction={() => router.push("/")} />
    )
}