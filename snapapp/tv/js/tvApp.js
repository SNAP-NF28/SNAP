angular.module('tvApp', ['socialNetworks']);

function tvAppCtrl($scope, SocialNetworks) {
    $scope.socialNetworks = new SocialNetworks();
    
    
    $scope.getUserProfile = function(name) {

    	if (name == 'Facebook') {
    		return $scope.socialNetworks[0].getUserProfile();
    	} else if (name == 'Twitter') {
    		return $scope.socialNetworks[2].getUserProfile();
    	} else {
    		return $scope.socialNetworks[1].getUserProfile();
    	}
    }
}