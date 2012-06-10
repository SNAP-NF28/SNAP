angular.module('tvApp', ['socialNetworks']);

function tvAppCtrl($scope, SocialNetworks) {
    $scope.socialNetworks = new SocialNetworks();
    
    
    $scope.getUserProfile = function(name) {
    	if (name == 'Facebook') {
    		socialNetworks[0].getUserProfile();
    	} else if (name == 'Twitter') {
    		socialNetworks[2].getUserProfile();
    	} else {
    		socialNetworks[1].getUserProfile();
    	}
    	
    }
}