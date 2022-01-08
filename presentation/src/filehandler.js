const SUCCESS_CLR = "#027524";
const PROCESSING_CLR = "#e1a95f";
const FAIL_CLR = "#aa4344";

const uploadDone = false;

async function uploadFile() {
    console.log("Starting upload routine...");
    const fileElement = document.getElementById("IPFSupload").files[0];
    const uploadBtn = document.getElementById("submitbtn");
    uploadBtn.value = "Uploading...";
    uploadBtn.style.background = PROCESSING_CLR;
    let formData = new FormData();
    formData.append("IPFSdocument", fileElement);
    let fsize = formData.get("IPFSdocument").size;
    console.log("Invoking webserver");
    try{
        let response = await fetch('http://127.0.0.1:11311/ipfs/upload', {method: "POST", body: formData, mode: "cors"});
        if(response.status == 200){
            const robj = await response.json();
            console.log(robj);
            console.log("Succesful request");
            uploadBtn.value = "Done!";
            uploadBtn.setAttribute("disabled", "true");
            uploadBtn.style.background = SUCCESS_CLR;
            disableUploadSection();
            createATag("File uploaded to IPFS Filecoin chain using Content ID : ", robj.cid);
        }
        else {
            console.log("Failed to invoke request with status : " + response.status);
            uploadBtn.value = "Failed";
            uploadBtn.style.background = FAIL_CLR;
        }
    }
    catch (err) {
        console.error("Failed with error : " + err);
        uploadBtn.value = "Failed";
        uploadBtn.style.background = FAIL_CLR;
        let response = { status:-1 };
    }
}

function disableUploadSection() {
    const uploadSec = document.getElementById("IPFSupload");
    uploadSec.setAttribute("disabled", "true");
}

function createATag(content, cid) {
    let a = document.createElement("a");
    const text = document.createTextNode(content);
    a.setAttribute("class", "resline");
    a.appendChild(text);
    let ar = document.createElement("a");
    const textcid = document.createTextNode(cid);
    ar.setAttribute("class", "resline");
    ar.setAttribute("id", "cidresult");
    ar.appendChild(textcid);

    let div = document.createElement("div");
    div.setAttribute("class", "txspacelog");
    div.appendChild(a);
    div.appendChild(ar);
    
    var element = document.getElementById("transferspace");
    element.appendChild(div);
}