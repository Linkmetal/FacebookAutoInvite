chrome.browserAction.onClicked.addListener(buttonClicked);
let msg = {
	txt: "start"
}
let urlList = [];
let maxPosts;


function buttonClicked(tab){
	console.log("buttonclicked")

	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([{
		  conditions: [new chrome.declarativeContent.PageStateMatcher({
			pageUrl: {hostEquals: 'www.facebook.com'},
		  	})
		  ],
			  actions: [new chrome.declarativeContent.ShowPageAction()]
		}]);
	});
}

chrome.runtime.onMessage.addListener(function(request, sender) {
	urlList = request.urlList;
	maxPosts = request.maxPosts;
	chrome.tabs.update(sender.tab.id, {url: request.urlList[0]}, function(){
		setTimeout(function(){
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(sender.tab.id, {txt: "next", urlList, maxPosts});
			});
		}, 4000);
	});
});