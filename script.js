chrome.tabs.executeScript(null, {file: "contentScript.js"});

var clicksDisplay = document.getElementById('clicks');
var scrollsDisplay = document.getElementById('scrolls');
var typesDisplay = document.getElementById('types');
var statusDisplay = document.getElementById('status');

var bg = chrome.extension.getBackgroundPage();
bg.hello = 'hello';

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
  //console.log(bg.activityLog.click);
  console.log(bg.activityLog.scroll);
  console.log(scrollsDisplay);
  clicksDisplay.innerHTML = bg.activityLog.click;
  scrollsDisplay.innerHTML = bg.activityLog.scroll;
  typesDisplay.innerHTML = bg.activityLog.keydown;
  console.log(scrollsDisplay);
}

var resetActivityCount = function(){
  bg.resetActivityCount();
  updateActivityView();
}

var updateStatusDisplay = function(){
  statusDisplay.innerHTML = "Running: " + bg.activityCountingOn;
}

var startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', function(){
  bg.activityCountingOn = true;
  updateStatusDisplay();
});

var stopBtn = document.getElementById('stopBtn');
stopBtn.addEventListener('click', function(){
  bg.activityCountingOn = false;
  updateStatusDisplay();
});

var resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', resetActivityCount);
updateActivityView();
updateStatusDisplay();