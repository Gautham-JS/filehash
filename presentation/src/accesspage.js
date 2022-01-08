

async function loadFileList() {
    const result = document.getElementById("res");
    result.innerHTML = "Loading IPFS File List...";
    try{
        let response = await fetch('http://127.0.0.1:11311/ipfs/list', {method: "GET", mode: "cors"});
        if(response.status == 200){
            const robj = await response.json();
            console.log(robj.links);
            for(upload of robj.uploads) {
                console.log(`${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`);
                uploadToTableRow(upload);
            }
            result.innerHTML = `Succesfully loaded ${robj.uploads.length} uploads`;
            console.log("Succesful request");
        }
        else {
            result.innerHTML = "Failed to find uploads : server error";
            console.log("Failed to invoke request with status : " + response.status);
        }
    }
    catch (err) {
        result.innerHTML = "Connection to IPFS interface failed";
        console.error("Failed with error : " + err);
    }
}

function uploadToTableRow(upload) {
    const table = document.getElementById("filelist");
    let row = table.insertRow(-1);
    let filename = row.insertCell(0);
    filename.innerHTML = upload.name;
    let cid = row.insertCell(-1);
    cid.innerHTML = upload.cid;
    let timecreated = row.insertCell(2);
    timecreated.innerHTML = upload.created;
    let pinstatus = row.insertCell(3);
    if(upload.pins.length > 0) pinstatus.innerHTML = upload.pins[0].status;
    else pinstatus.innerHTML = "false";

    let infotab = row.insertCell(4);
    infotab.innerHTML = `<button class="rowbtn" id="rowbtn#${row.rowIndex}">Get Info</button>`

    let inforow = table.insertRow(-1);
    let infoSpace = inforow.insertCell(0);
    let ispaceId = `infospace#${row.rowIndex}`;
    infoSpace.setAttribute("colspan", "5");
    infoSpace.setAttribute("id", `infospace#${row.rowIndex}`);

    let infodiv = document.createElement("div");
    let infopara = document.createElement("p");
    infopara.innerHTML = "jagdvakdkva"
    infodiv.appendChild(infopara);
    infoSpace.appendChild(infodiv);

    $(function (){
        $("td[colspan=5]").find("p").hide();
        $(".rowbtn").click(function(event) {
            event.stopPropagation();
            var $target = $(event.target);
            console.log(target.id);
            if ( $target.closest("td").attr("colspan") > 1 ) {
                $target.slideUp();
            } else {
                $target.closest("tr").next().find("p").slideToggle();
            }                    
        });
    });
}

// function exposeInfoRow(rowbutton) {
//     console.log("ID : " + rowbutton.id);
//     console.log(rowbutton.closest('tr').rowIndex);

// }

function listData() {
    const table = document.getElementById("filelist");
}

$("#filelist .rowbtn").click(function(){
    console.log("Initiated click");
    $(this).addClass('selected').siblings().removeClass('selected');    
    var value=$(this).find('td:nth-child(2)').html();
    alert(value);    
});


$(function (){
    $("td[colspan=5]").find("p").hide();
    $(".rowbtn").click(function(event) {
        event.stopPropagation();
        var $target = $(event.target);
        if ( $target.closest("td").attr("colspan") > 1 ) {
            $target.slideUp();
        } else {
            $target.closest("tr").next().find("p").slideToggle();
        }                    
    });
});

window.onload = loadFileList;