console.log('I am simply in the background');

window.activityCountingOn = true;



chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "activity");
	port.onMessage.addListener(function(msg) {
		if(window.activityCountingOn){
			console.log(msg);
			if (msg.action === 'click'){
				window.activityLog.clicks += 1;
				console.log(window.activityLog);
			};

		};
	});
});

var resetActivityCount = function(){
	console.log('resetting activity count');
	window.activityLog = {
		clicks: 0,
		scrolls: 0,
		types: 0
	};
};

if(!window.activityLog){
	resetActivityCount();
}