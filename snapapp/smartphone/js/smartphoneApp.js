angular.module('smartphoneApp', ['socialNetworks']);


function smartphoneAppCtrl($scope, SocialNetworks) {
    $scope.socialNetworks = new SocialNetworks();
	
}

function smartphoneAppCtrlMsg($scope) {
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

