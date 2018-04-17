function startScript(){
    let msg = {
		txt: "start"
	}
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, msg);
    });
}

var button = document.getElementById("startButton");
button.addEventListener('click', startScript);