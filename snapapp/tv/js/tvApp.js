angular.module('tvApp', ['socialNetworks']);

function tvAppCtrl($scope, SocialNetworks) {
    $scope.socialNetworks = new SocialNetworks();
}