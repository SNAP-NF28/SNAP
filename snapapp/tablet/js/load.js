require({paths: {order: "/snapapp/common/lib/requirejs/order"}},
    commonScripts.concat([
        //List here script specific to desktop
        "order!/snapapp/tablet/js/tabletApp.js"
    ]), function() {
        angular.bootstrap(document, ['tabletApp']);
    });

