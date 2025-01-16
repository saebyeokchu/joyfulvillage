export async function GetCurrentIp(){
    try {
        return await fetch(`https://api.ipify.org?format=json`).then(async response => {
            console.log("result : ", response);
            return await response.json();
        });
    } catch (error) {
        return false;
    }
}