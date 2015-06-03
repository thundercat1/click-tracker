console.log('I am simply in the background');
window.item = 'item1';



if(!window.activityLog){
	window.activityLog = {
		clicks: 0,
		scrolls: 0,
		types: 0
	};
}




chrome.tabs.getAllInWindow(null, function(tabs){
	console.log("tabs:");
	console.log(tabs); 
	tabs.forEach(function(tab){
		chrome.tabs.executeScript(tab.id, {
			code: "window.activityLoggerStarted=true;var port = chrome.runtime.connect({name: 'activity'}); document.addEventListener('click', function(e){port.postMessage({action: 'click'});});"
		})
	})

});




console.log('no problems here');
console.log(window.activityLog);

chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "activity");
  port.onMessage.addListener(function(msg) {
  	console.log('Message received to background');
  	console.log(msg);
  	if (msg.action === 'click'){
  		window.activityLog.clicks += 1;
  		console.log(window.activityLog);
  	};
  });

});
