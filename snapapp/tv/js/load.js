require({paths: {order: "/snapapp/common/lib/requirejs/order"}},
    commonScripts.concat([
        //List here script specific to desktop
        "order!/snapapp/tv/js/tvApp.js"
    ]), function() {
        angular.bootstrap(document, ['tvApp']);
    });

