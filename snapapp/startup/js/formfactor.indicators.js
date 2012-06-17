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
    function() { return navigator.userAgent.toLowerCase().indexOf("mobile") > 0 && !((navigator.userAgent.toLowerCase().indexOf("ipad") > 0))} ,
    function() { return navigator.userAgent.toLowerCase().indexOf("phone") > 0 && !((navigator.userAgent.toLowerCase().indexOf("ipad") > 0))},
  ],
	'tablet': [
	'tablet',
	function () { return navigator.userAgent.toLowerCase().indexOf("android") > 0 && !((navigator.userAgent.toLowerCase().indexOf("mobile") > 0)) },
    function () { return navigator.userAgent.toLowerCase().indexOf("ipad") > 0 },
    function() { return navigator.userAgent.toLowerCase().indexOf("xoom") > 0 }
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
    "resources": [
        "http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.js",
        "/snapapp/common/lib/angular/angular.min.js",
        "/snapapp/common/lib/date.js",
        "https://raw.github.com/tigbro/jquery-mobile-angular-adapter/master/compiled/min/jquery-mobile-angular-adapter-1.0.7-rc2.js",
        "/snapapp/common/js/models/facebook/facebook.js",
        "http://platform.twitter.com/anywhere.js?id=HDz4lPcTE9tIMD3SV3Nkg&v=1",
        "http://connect.facebook.net/en_US/all.js",
        "https://apis.google.com/js/client.js",
        "/snapapp/common/js/models/google+/google+.js",
        "/snapapp/common/js/models/mocks/SNMocks.js",
        "/snapapp/common/js/models/mocks/typeMocks.js",
        "/snapapp/common/js/models/types.js",
        "/snapapp/common/js/models/twitter/twitter.js",
        "/snapapp/common/js/models/socialNetworks.js",
        "/snapapp/tablet/js/tabletApp.js",
        //additional scripts
        "https://apis.google.com/_/apps-static/_/js/gapi/client/rt=j/ver=C3gMxNHYp0E.fr./sv=1/am=!rFmBCPi40VqIDfp2cA/d=1/rs=AItRSTNtba_fwu1cPVsKtdIBy1r40dDTiA/cb=gapi.loaded_0",
        "http://anywhere.platform.twitter.com/1.2.0/javascripts/client.js",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js",
        "http://anywhere.platform.twitter.com/1.2.0/javascripts/client.bundle.js",
        "http://anywhere.platform.twitter.com/1.2.0/javascripts/api.bundle.js",
        "https://twitter-any.s3.amazonaws.com/server/production/xd_receiver.js",
        "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js",
        "http://twitter.com/javascripts/i18n/fr.js",
        "http://anywhere.platform.twitter.com/1.2.0/javascripts/connect.bundle.js"
    ]
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

specificScriptsLoaded(factor,"We think your device is a");