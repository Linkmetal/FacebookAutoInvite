let urls = [];

if($(document).ready()){
    var button = document.getElementById("startButton");
    button.addEventListener('click', startScript);
    document.getElementById("addButton").addEventListener("click", addUrl);
    chrome.storage.sync.get(['UrlList'], function(result) {
        if(result != null){
            urls = result.UrlList;
            console.log(urls);
            for(let i = 0; i < urls.length; i++){
                $("#urlList").append("<p>" + urls[i] + "</p>");
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
    urls.push(url);
    $("#urlList").append("<p>" + url + "</p>");
    chrome.storage.sync.set({"UrlList": urls}, function() {
        console.log("Url saved");
    });
}

