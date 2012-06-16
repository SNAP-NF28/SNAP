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
    });

