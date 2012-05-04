areSpecificScriptsLoaded = false;
areCommonScriptsLoaded = false;

function handleFormfactorDetection(){
	if(areCommonScriptsLoaded && areSpecificScriptsLoaded){
		doDeviceRouting();
	} else {
		var retryTime = 1000;
		selectionTime += retryTime;
		setTimeout("handleFormfactorDetection()",retryTime);
	}
};

function commonScriptsLoaded(){
	areCommonScriptsLoaded = true;
	console.log("Common scripts loaded.");
	if(areSpecificScriptsLoaded){
		displayRemainingTime();
	}
};

function specificScriptsLoaded(factor){
	areSpecificScriptsLoaded = true;
	console.log("Specific scripts loaded.")
	$("#loadingLbl").text("We think your device is a");
	selectedDevice(factor);
	if(areCommonScriptsLoaded){
		displayRemainingTime();
	}
	return factor;
};

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
};

function capitaliseFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function onDeviceChange(deviceName){
	if(deviceName === factor)
	  return;
	if(displayTimer){
		clearTimeout(displayTimer);
	}
	areSpecificScriptsLoaded = false;
	$("#loadingLbl").text("You said your device is a");
	selectedDevice(deviceName);	
	formfactor.override( deviceName, {});
	factor = formfactor.detect( formfactorActions,{});
    specificScriptsLoaded(factor);
}

function resetTimer(){
	clearTimeout(timer);
	setGlobalTimer();
	$('#timeLbl').text();
}

function selectedDevice(deviceName){
	$('#dd').text(capitaliseFirstLetter(deviceName));
};

function displayRemainingTime(){
	var remainingTimeMS = selectionTime - ( (new Date()).getTime() - startTimeMS );
	$('#timeLbl').text('Redirecting in ' + Math.max(Math.ceil(remainingTimeMS / 1000.),0) + ' s');
	displayTimer = setTimeout("displayRemainingTime()", 1000);
};
