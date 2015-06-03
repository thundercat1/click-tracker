console.log('I am simply in the background');

window.activityCountingOn = true;

var lastActivityType = null;

chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "activity");
	port.onMessage.addListener(function(msg) {
		if(window.activityCountingOn){
			//console.log(msg);
			var action = msg.action;
			if (lastActivityType != action || action === 'click'){
				//Every click counts, but multiple keydowns or scrolls in a row
				//counts as a single action
				window.activityLog[action] += 1;
			}
			
			lastActivityType = action;
			console.log(window.activityLog);
			

		};
	});
});

var resetActivityCount = function(){
	console.log('resetting activity count');
	window.activityLog = {
		click: 0,
		scroll: 0,
		keydown: 0
	};
};

if(!window.activityLog){
	resetActivityCount();
}