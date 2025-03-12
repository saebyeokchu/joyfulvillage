import { getFetcher } from "@/lib/fetcher";
import { GetAboutById } from "@/lib/url";
import { AboutType } from "@/types/About";
import useSWR from "swr";

const GetById = (id : any) => {
    return useSWR<AboutType>(
        GetAboutById + id,
        getFetcher
    );
}

export {
    GetById
}