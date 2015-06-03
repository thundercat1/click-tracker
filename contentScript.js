//console.log('This is running in the main window');
//document.body.style.backgroundColor="blue";

console.log('contentScript run');

if(!window.activityLoggerSetUp){
	var port = chrome.runtime.connect({name: "activity"});
	document.addEventListener('click', function(e){
		port.postMessage({action: 'click'});
		});

	document.addEventListener('scroll', function(e){
		port.postMessage({action: 'scroll'});
		});

	document.addEventListener('keydown', function(e){
		port.postMessage({action: 'keydown'});
		});

	window.activityLoggerSetUp = true;
	console.log('Activity Logger Added');
}

/*
document.addEventListener('scroll', function(e){
		console.log('scrolling');
	activity.scrolls += 1;
	port.postMessage(activity);
	});

*/

//port.postMessage(activity);

