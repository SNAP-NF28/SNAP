require({paths: {order: "/snapapp/common/lib/requirejs/order"}},
    commonScripts.concat([
    //List here script specific to desktop
	"order!/snapapp/common/lib/jquery/jquery-1.7.2.min.js",
	"order!/snapapp/common/lib/bootstrap/js/bootstrap.js",
    "order!/snapapp/desktop/js/desktopapp.js"

]), function() {
    angular.bootstrap(document, ['desktopApp']);
});

