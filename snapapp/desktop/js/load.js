require({paths: {order: "/snapapp/common/lib/requirejs/order"}},
    commonScripts.concat([
    //List here script specific to desktop
    "order!/snapapp/desktop/js/desktopapp.js",	
]), function() {
    angular.bootstrap(document, ['desktopApp']);
});

