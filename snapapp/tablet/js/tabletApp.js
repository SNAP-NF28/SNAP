angular.module('tabletApp', ['socialNetworks']);

function tabletAppCtrl($scope, SocialNetworks) {
    $scope.socialNetworks = new SocialNetworks();
}