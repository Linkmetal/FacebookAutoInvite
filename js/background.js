chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
	console.log("buttonclicked")
	// let msg = {
	// 	txt: "start"
	// }
	// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	// 	chrome.tabs.sendMessage(tabs[0].id, msg);
	// });

	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
		  conditions: [new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {hostEquals: 'developer.chrome.com'},
		  })
		  ],
			  actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
}