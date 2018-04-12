console.log("bajvopwqjnvoiwqnj");

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
	console.log("buttonclicked")
	let msg = {
		txt: "hello"
	}
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tab.id, msg);
	});
}