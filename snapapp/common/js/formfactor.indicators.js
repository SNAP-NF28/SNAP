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

function handleFormfactorDetection(){
	if(commonScriptsLoaded && specificScriptsLoaded){
		doDeviceRouting();
	} else {
		setTimeout("handleFormfactorDetection()",1000);
	}
};

function commonScriptsLoaded(){
	var commonScriptsLoaded = true;
	//alert("Loaded");
};

function specificScriptsLoaded(){
	var specificScriptsLoaded = true;
	$("#loadingLbl").text("We think your device is:");
	selectedDevice(factor);
	return factor;
};

function doDeviceRouting(){
	//alert("Redirect");
};

function selectedDevice(deviceName){
	$('#dd').text(deviceName);
}

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

var factor = formfactor.detect([ //TODO: Look for ressources neededà
  {
    "formfactor": "phone",
    //"resources": ["/scripts/phone/jquery.touch.js", "/scripts/tablet/css-beziers.js", "/scripts/tablet/touchscroll.js", "/scripts/phone/controller.js", "/css/phone.css"]
  	//"callbacks": specificScriptsLoaded()
},
  {
    "formfactor": "tv",
    //"resources": ["/scripts/tv/controller.js", "/css/tv.css"]
	//"callbacks": specificScriptsLoaded()
  },
  {
    "formfactor": "tablet",
    //"resources": ["/css/tablet.css", '/css/tablet/touchscroll.css', "/scripts/tablet/jquery.touch.tablet.js", "/scripts/tablet/css-beziers.js", "/scripts/tablet/touchscroll.js", "/scripts/tablet/controller.js"]
	//"//callbacks": specificScriptsLoaded() 
 },
/*  {
    "formfactor": "handheld",
    //"resources": ["/css/default.css"]  
	"callbacks": specificScriptsLoaded()
  },*/
  {
    "formfactor": "desktop",
    //"resources": ["/scripts/desktop/controller.js"]
	//"callbacks": specificScriptsLoaded()
  }
],
{
	"formfactor": "default",
	//"resources": ["/css/default.css"]
	//"callbacks": specificScriptsLoaded() 
}
);

var device =  specificScriptsLoaded();

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



