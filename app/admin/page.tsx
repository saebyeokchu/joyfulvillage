"use client"

import AdminWrapper from "./component/AdminWrapper";

export default function Admin(){

    //https://github.com/htmlstreamofficial/preline/blob/main/templates/admin/index.html
      // {/* 수정내용 */}
            // {/* <div className="
            //     w-full  h-full
            //      start-64 bg-white">
            //     { (searchParams.get('m') == 'home' || searchParams.get('m') ==  null) && <EditHome />}
            //     { searchParams.get('m') == 'sokso' && <ManageLoading />}
            //     { searchParams.get('m') == 'program' && <ManageProgram />}
            //     { searchParams.get('m') == 'inquiry' && <ManageInquiry />}
            //     { searchParams.get('m') == 'image' && <ManageImage />}
            //     { searchParams.get('m') == 'cafe' && <ManageCafe />}
            //     { searchParams.get('m') == 'info' && <ManageBusniess />}
            // </div> */}

    return (
        <AdminWrapper children={undefined} />
    );
}