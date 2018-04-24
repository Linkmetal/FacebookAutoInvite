let urls = [];

if($(document).ready()){
    var button = document.getElementById("startButton");
    button.addEventListener('click', startScript);
    document.getElementById("addButton").addEventListener("click", addUrl);
    chrome.storage.sync.get(['UrlList'], function(result) {
        if(result.UrlList != null){
            urls = result.UrlList;
            console.log(urls);
            for(let i = 0; i < urls.length; i++){
                $("#urlList").append("<input type='checkbox' name='urls' class='urls' checked='true'>" + urls[i] + "</input><br/>");
            }
        }
    });
}
    

function startScript(){
    let max = document.getElementById("maxPosts").value;
    let msg = {
        txt: "start",
        maxPosts: max,
        urlList: urls
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
        $("#urlList").append("<input type='checkbox' name='urls' class='urls' checked='true'>" + url + "</input><br/>");
        document.getElementById("newUrl").value = "";
        chrome.storage.sync.set({"UrlList": urls}, function() {
            console.log("Url saved");
        });
    }
    else{
        alert("URL not valid or already on the list.");
    }
}

