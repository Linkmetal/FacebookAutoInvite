let urls = [];

if($(document).ready()){
    var button = document.getElementById("startButton");
    button.addEventListener('click', startScript);
    document.getElementById("addButton").addEventListener("click", addUrl);
    document.getElementById("checkAll").addEventListener("click", checkAll);
    document.getElementById("unCheckAll").addEventListener("click", unCheckAll);
    document.getElementById("deleteChecked").addEventListener("click", deleteChecked);
    chrome.storage.sync.get(['UrlList'], function(result) {
        if(result.UrlList != null){
            urls = result.UrlList;
            console.log(urls);
            for(let i = 0; i < urls.length; i++){
                $("#urlList").append("<input type='checkbox' name='urls' class='urls' checked='true'><span>" + urls[i] + "</span></input><br/>");
            }
        }
    });
}
    

function startScript(){
    let max = document.getElementById("maxPosts").value;
    
    let aux = $(".urls:checked + span");
    let activeUrls = [];
    for(let i = 0; i < aux.length; i++){
        activeUrls.push($(aux[i]).text());
    }
    console.log(activeUrls);
    let msg = {
        txt: "start",
        maxPosts: max,
        urlList: activeUrls
	}
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, msg);
    });
}

function addUrl(){
    let url = document.getElementById("newUrl").value;
    let re = new RegExp(/(https?:\/\/[^\s]+)/g);
    if(re.test(url) && urls.indexOf(url) == -1){
        urls.push(url);
        $("#urlList").append("<input type='checkbox' name='urls' class='urls' checked='true'><span>" + url + "</span></input><br/>");
        document.getElementById("newUrl").value = "";
        chrome.storage.sync.set({"UrlList": urls}, function() {
            console.log("Url saved");
        });
    }
    else{
        alert("URL not valid or already on the list.");
    }
}

function checkAll(){
    let checkboxes = document.querySelectorAll(".urls");
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = true;
    }
}

function unCheckAll(){
    let checkboxes = document.querySelectorAll(".urls");
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = false;
    }
}

function deleteChecked(){
    let texts = $(".urls:checked + span");
    let checkboxes = $(".urls:checked");
    if(confirm("Do you want to delete all the checked URL? Number of elements: " + checkboxes.length + ".")){
        for(let i = 0; i < checkboxes.length; i++){
            $(texts[i]).remove();
            $(checkboxes[i]).remove();
        }
        urls = [];
        texts = $(".urls + span");
        for(let i = 0; i < texts.length; i++){
            urls.push($(texts[i]).text());
        }
        console.log(urls);
        chrome.storage.sync.set({"UrlList": urls}, function() {
            console.log("Url saved");
        });
    }
}