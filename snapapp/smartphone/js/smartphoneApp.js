angular.module('smartphoneApp', ['socialNetworks']);


function smartphoneAppCtrl($scope, SocialNetworks) {
    $scope.socialNetworks = new SocialNetworks();
	
}

function smartphoneFbContentCtrl($scope) {
 $scope.socialNetwork = $scope.socialNetworks[0];
 $scope.messages = $scope.socialNetwork.getLastNMessages(20);
}

function smartphoneGpContentCtrl($scope) {
 $scope.socialNetwork = $scope.socialNetworks[1];
 $scope.messages = $scope.socialNetwork.getLastNMessages(20);
}

function smartphoneTwContentCtrl($scope) {
 $scope.socialNetwork = $scope.socialNetworks[2];
 $scope.messages = $scope.socialNetwork.getLastNMessages(20);
}

/** Controleur pour la navigation : page precedente et page suivante **/
/** On peut changer l'ordre des pages dans pageOrder, ça fonctionnera toujours **/

function smartphoneFooterCtrl($scope) {
$scope.pageOrder = new Array("homePage", "fbPage", "twPage", "gpPage", "srchPage", "usrPage", "optionsPage");
$scope.getPrevPage = function (curPage) {
	var idx = $scope.pageOrder.indexOf(curPage);
	if (idx <= 0) {
		idx += $scope.pageOrder.length;
	}
	idx--;
	return "#" + $scope.pageOrder[idx];
}
$scope.getNextPage = function (curPage) {
	var idx = $scope.pageOrder.indexOf(curPage);
	if (idx >=  $scope.pageOrder.length - 1) {
		idx -= $scope.pageOrder.length;
	}
	idx++;
	return "#" + $scope.pageOrder[idx];
}
}

