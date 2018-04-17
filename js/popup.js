if($(document).ready()){
    var button = document.getElementById("startButton");
    button.addEventListener('click', startScript);
    document.getElementById("addButton").addEventListener("click", addUrl);
    
}


function startScript(){
    let max = document.getElementById("maxPosts").value;
    let msg = {
        txt: "start",
        maxPosts: max
	}
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, msg);
    });
}

function addUrl(){
    let url = document.getElementById("newUrl").value;
    $("#urlList").append("<p>" + url + "</p>");
}

