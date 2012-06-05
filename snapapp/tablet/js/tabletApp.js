angular.module('tabletApp', ['socialNetworks']);

function tabletAppCtrl($scope, SocialNetworks) {

    $scope.socialNetworks = new SocialNetworks();

    $scope.loadProfile = function(socialNetwork) {

        if (socialNetwork.name == 'Facebook') {

            if ($scope.socialNetworks[0].getUserProfile(0).name == 'Charles') {
                alert('Bonjour ! Bienvenue sur SNAP ');
            }
            return $scope.socialNetworks[0].getUserProfile(0);

        } else if (socialNetwork.name == 'Twitter') {
            return $scope.socialNetworks[2].getUserProfile(2);
        } else {
            return $scope.socialNetworks[1].getUserProfile(1);
        }

    }

    $scope.profileFb = $scope.loadProfile($scope.socialNetworks[0]);
    $scope.profileG = $scope.loadProfile($scope.socialNetworks[1]);
    $scope.profileTw = $scope.loadProfile($scope.socialNetworks[2]);

    $scope.getProfile = function (socialNetwork) {
        if (socialNetwork.name == 'Facebook') {
            return $scope.profileFb;
        } else if (socialNetwork.name == 'Twitter') {
            return $scope.profileTw;
        } else {
            return $scope.profileG;
        }
    }

}