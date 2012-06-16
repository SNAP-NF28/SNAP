var areSpecificScriptsLoaded = false;
var areCommonScriptsLoaded = false;
var selectionTime, startTimeMS, timer, displayTimer; //" Global" vars

function setGlobalTimer(timeMS, jsCode){
	stopTimer();
	selectionTime = timeMS;
	startTimeMS = (new Date()).getTime();
	timer = setTimeout(jsCode, selectionTime);
}

function overrideChoice(){
	stopTimer();
	selectedDevice("Select Device");
}

function stopTimer(){
	if(timer){
		clearTimeout(timer);
	}
	if(displayTimer){
		clearTimeout(displayTimer);
		$("#timeLbl").text("");
	}
} 

function commonScriptsLoaded(){
	areCommonScriptsLoaded = true;
	//console.log("Common scripts loaded.");
	if(areSpecificScriptsLoaded){
		redirectInXSec(3000);
	}
}

function specificScriptsLoaded(factor, display){
	areSpecificScriptsLoaded = true;
	//console.log("Specific scripts loaded.")
	$("#loadingLbl").text(display);
	selectedDevice(factor);
	if(areCommonScriptsLoaded){
		redirectInXSec(4000);
	}
	return factor;
}

function doDeviceRouting(){
	var targetPage;
	switch(factor){
	case "phone":
	  targetPage = "./smartphone/index.html";
	  break;
	case "tablet":
	  targetPage = "./tablet/index.html";
	  break;
	case "tv":
	  targetPage = "./tv/index.html";
	  break;
	default:
	  targetPage = "./desktop/index.html";
	}
	document.location.href = targetPage;
}

function capitaliseFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function onDeviceChange(deviceName){
	areSpecificScriptsLoaded = false;
	var txt = "You said your device is a";
	$('#loadingLbl').text(txt);
	selectedDevice(deviceName);	
	formfactor.override( deviceName, {});
	formfactor.detect( formfactorActions,{});//Load missing Scripts
	factor = deviceName;
    specificScriptsLoaded(factor,txt);
}


function selectedDevice(deviceName){
	$('#dd').text(capitaliseFirstLetter(deviceName));
}

function redirectInXSec(time){
	setGlobalTimer(time, "doDeviceRouting()");
	displayRemainingTime();
}

function displayRemainingTime(){	
	var remainingTimeMS = selectionTime - ( (new Date()).getTime() - startTimeMS );
	$('#timeLbl').text('Redirecting in ' + Math.max(Math.ceil(remainingTimeMS / 1000.),0) + ' s');
	displayTimer = setTimeout("displayRemainingTime()", 1000);
}

$.mobile.hidePageLoadingMsg();

