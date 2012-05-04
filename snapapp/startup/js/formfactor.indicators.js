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

// Set here the indicators for each device
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


// Set here the ressouces needed for each device
var formfactorActions = [ //TODO: Look for ressources needed
  {
    "formfactor": "phone",
    //"resources": ["/FausseRessource/phone.js"]
},
  {
    "formfactor": "tv",
    //"resources": ["/FausseRessource/tv.js"]
  },
  {
    "formfactor": "tablet",
    //"resources": ["/FausseRessource/tablet.js"]
 },
  {
    "formfactor": "desktop",
    //"resources": ["/FausseRessource/desktop.js"]
  }
];

var factor = formfactor.detect( formfactorActions,
{
	"formfactor": "default",
    //"resources": ["/FausseRessource/default.js"]
}
);

specificScriptsLoaded(factor);