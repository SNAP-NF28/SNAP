require({paths: {order: "/snapapp/common/lib/requirejs/order"}},
    commonScripts.concat([
        //List here script specific to smartphone
		"order!/snapapp/smartphone/js/jquery.mobile-1.1.0.js",
        "order!/snapapp/smartphone/js/smartphoneApp.js"
    ]), function() {
        angular.bootstrap(document, ['smartphoneApp']);
    });

