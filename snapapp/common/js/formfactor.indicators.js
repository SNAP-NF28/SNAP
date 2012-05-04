/*   
   Copyright 2012 Google Inc && SNAP Labs :)

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

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
	//alert("Loaded");
	if(areSpecificScriptsLoaded){
		displayRemainingTime();
	}
};

function specificScriptsLoaded(factor){
	areSpecificScriptsLoaded = true;
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
	selectedDevice(deviceName);	
	formfactor.override( deviceName, {});
	factor = formfactor.detect( formfactorActions,{});
	//alert(factor);
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

formfactor.register({
  'desktop': [
	 'desktop',
     function() { return true; } // default value
  ],
/*  'handheld': [ //One day maybe :)
    'handheld',
    function() { return navigator.userAgent.indexOf("Opera Mini") > 0; },
    function() { return navigator.userAgent.indexOf("Opera Mobi") > 0; }
  ],*/
  'phone': [
    'phone',
    function() { return navigator.userAgent.toLowerCase().indexOf("mobile") > 0 } ,
    function() { return navigator.userAgent.toLowerCase().indexOf("phone") > 0 },
  ],
	'tablet': [
	'tablet',
	function () { return navigator.userAgent.toLowerCase().indexOf("android") > 0 && !(navigator.userAgent.toLowerCase().indexOf("mobile") > 0) },
    function () { return navigator.userAgent.indexOf("iPad") > 0 },
    function() { return navigator.userAgent.indexOf("Xoom") > 0 }
  ],
  'tv': [
    'tv', 
    function() { return navigator.userAgent.indexOf("TV") > 0 }
  ]
});



var formfactorActions = [ //TODO: Look for ressources needed
  {
    "formfactor": "phone",
    //"resources": ["/FausseRessource/phone.js"]
  	//"callbacks": specificScriptsLoaded()
},
  {
    "formfactor": "tv",
    //"resources": ["/FausseRessource/tv.js"]
	//"callbacks": specificScriptsLoaded()
  },
  {
    "formfactor": "tablet",
    //"resources": ["/FausseRessource/tablet.js"]
	//"//callbacks": specificScriptsLoaded() 
 },
/*  {
    "formfactor": "handheld",
    //"resources": ["/css/default.css"]  
	"callbacks": specificScriptsLoaded()
  },*/
  {
    "formfactor": "desktop",
    //"resources": ["/FausseRessource/desktop.js"]
	//"callbacks": specificScriptsLoaded()
  }
];

var factor = formfactor.detect( formfactorActions,
{
	"formfactor": "default",
    //"resources": ["/FausseRessource/default.js"]
	//"callbacks": specificScriptsLoaded() 
}
);

specificScriptsLoaded(factor);

/*
if(!!factor) {
  $(document).ready(function() {
    $("#formfactors a").live("click", function(e) {
      formfactor.override($(this).data().formfactor, { path: "/" });
      $("#formfactors a").removeClass("active");
      $(this).addClass("active");
      window.location.reload();
      return false;
    });
  });
}
*/



