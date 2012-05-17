angular.module('smartphoneApp', ['socialNetworks']);

function smartphoneAppCtrl($scope, SocialNetworks) {
    $scope.socialNetworks = new SocialNetworks();
}