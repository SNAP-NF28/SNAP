require({paths: {order: "/snapapp/common/lib/requirejs/order"}},
    [
        //List here script specific to smartphone
        "order!http://code.jquery.com/mobile/1.1.0/jquery.mobile-1.1.0.min.js",
        "order!/snapapp/common/lib/angular/angular.min.js",
        "order!/snapapp/common/lib/date.js",
        "order!https://raw.github.com/tigbro/jquery-mobile-angular-adapter/master/compiled/min/jquery-mobile-angular-adapter-1.0.7-rc2.js",
        "order!/snapapp/common/js/models/facebook/facebook.js",
        "order!http://platform.twitter.com/anywhere.js?id=HDz4lPcTE9tIMD3SV3Nkg&v=1",
        "order!http://connect.facebook.net/en_US/all.js",
        "order!https://apis.google.com/js/client.js",
        "order!/snapapp/common/js/models/google+/google+.js",
        "order!/snapapp/common/js/models/mocks/SNMocks.js",
        "order!/snapapp/common/js/models/mocks/typeMocks.js",
        "order!/snapapp/common/js/models/types.js",
        "order!/snapapp/common/js/models/twitter/twitter.js",
        "order!/snapapp/common/js/models/socialNetworks.js",
        "order!/snapapp/tablet/js/tabletApp.js"
    ], function() {
        angular.bootstrap(document, ['tabletApp']);
        $(document).trigger("");
        $.mobile.hidePageLoadingMsg();

        // (function() { // async loading
        //     var toLoad = [
        //         "https://apis.google.com/_/apps-static/_/js/gapi/client/rt=j/ver=C3gMxNHYp0E.fr./sv=1/am=!rFmBCPi40VqIDfp2cA/d=1/rs=AItRSTNtba_fwu1cPVsKtdIBy1r40dDTiA/cb=gapi.loaded_0",
        //         "http://anywhere.platform.twitter.com/1.2.0/javascripts/client.js",
        //         "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js",
        //         "http://anywhere.platform.twitter.com/1.2.0/javascripts/client.bundle.js",
        //         "http://anywhere.platform.twitter.com/1.2.0/javascripts/api.bundle.js",
        //         "https://twitter-any.s3.amazonaws.com/server/production/xd_receiver.js",
        //         "https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js",
        //         "http://twitter.com/javascripts/i18n/fr.js",
        //         "http://anywhere.platform.twitter.com/1.2.0/javascripts/connect.bundle.js",
        //         "http://anywhere.platform.twitter.com/1.2.0/javascripts/tweet_box.bundle.js"
        //     ];
        //     var i;
        //     for (i in toLoad){
        //             try{
        //             var s = document.createElement('script');
        //             s.type = 'text/javascript';
        //             s.async = true;
        //             s.src = toLoad[i];
        //             var x = document.getElementsByTagName('script')[0];
        //             x.parentNode.insertBefore(s, x);
        //             } catch(err){}
        //     }         
        // })();
    });

