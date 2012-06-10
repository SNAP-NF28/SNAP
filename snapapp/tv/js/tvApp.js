angular.module('tvApp', ['socialNetworks']);

function tvAppCtrl($scope, SocialNetworks) {
    $scope.socialNetworks = new SocialNetworks();
    
    
    $scope.getUserProfile = function(name) {
    	if (name == 'Facebook') {
    		$scope.socialNetworks[0].getUserProfile();
    	} else if (name == 'Twitter') {
    		$scope.socialNetworks[2].getUserProfile();
    	} else {
    		$scope.socialNetworks[1].getUserProfile();
    	}
    	
    }
}