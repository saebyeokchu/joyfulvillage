const isStrValid = (inputText : string) => inputText && inputText.trim().length;

function findDuplicateAfterValues(arr : any[]) {
    const seen = new Set();
    const duplicates = new Set();

    for (const item of arr) {
        const normalizedValue = String(item.after); // Convert all values to string for uniformity

        if (seen.has(normalizedValue)) {
            duplicates.add(normalizedValue);
        }
        seen.add(normalizedValue);
    }

    return [...duplicates]; // Convert Set to array for easy viewing
}

async function GetCurrentIp(){
    try {
        return await fetch(`https://api.ipify.org?format=json`).then(async response => {
            console.log("result : ", response);
            return await response.json();
        });
    } catch (error) {
        return false;
    }
}

async function OpenWindow(url : string){
    window.open(url,'_blank');
}

function pad2(n : number) {  // always returns a string
    return (n < 10 ? '0' : '') + n;
}

function getCurrentTimestamp() : string{
    const today = new Date();

    return today.getFullYear() + "_" +
           pad2(today.getMonth() + 1) + "_" +
           pad2(today.getDate()) + "_" +
           pad2(today.getHours()) + "_" +
           pad2(today.getMinutes()) + "_" +
           pad2(today.getSeconds());
}

export {
    isStrValid,
    findDuplicateAfterValues,
    GetCurrentIp,
    OpenWindow,
    getCurrentTimestamp
}