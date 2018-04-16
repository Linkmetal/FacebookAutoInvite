chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
	console.log("buttonclicked")
	let msg = {
		txt: "start"
	}
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, msg);
	});
}