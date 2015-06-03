chrome.tabs.executeScript(null, {file: "contentScript.js"});

var clicksDisplay = document.getElementById('clicks');
var scrollsDisplay = document.getElementById('scrolls');
var bgClicksDisplay = document.getElementById('clicksFromBackground');
console.log(clicksDisplay);

var bg = chrome.extension.getBackgroundPage();
bg.hello = 'hello';
console.log('Background Page:');
console.log(bg);
console.log(bg.hello);
console.log(bg.item);

/*
chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "activity");
  port.onMessage.addListener(function(msg) {
  	console.log(msg);
  	clicksDisplay.innerHTML = msg.clicks;
  	scrollsDisplay.innerHTML = msg.scrolls;
  });
});
*/

var updateActivityView = function(){
  console.log('updating using background activity log');
  console.log(bg.activityLog);
  bgClicksDisplay.innerHTML = bg.activityLog.clicks;
}

var updateBtn = document.getElementById('updateActivityBtn');
console.log(updateBtn);
console.log(updateActivityView);
updateBtn.addEventListener('click', updateActivityView);

updateActivityView();

/*
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request.clicks)
      sendResponse(
      	{ 
      		msg: "Message successfully processed"
      	});
  });
*/