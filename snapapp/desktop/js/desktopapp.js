angular.module('desktopApp', ['socialNetworks']);

function desktopAppCtrl($scope, SocialNetworks) {
    $scope.socialNetworks = new SocialNetworks();
}