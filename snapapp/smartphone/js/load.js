require({paths: {order: "/snapapp/common/lib/requirejs/order"}},
    commonScripts.concat([
        //List here script specific to desktop
        "order!/snapapp/smartphone/js/smartphoneApp.js"
    ]), function() {
        angular.bootstrap(document, ['smartphoneApp']);
    });

