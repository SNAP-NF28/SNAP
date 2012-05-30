angular.module('smartphoneApp', ['socialNetworks']);

/** Controleur principal **/

function smartphoneAppCtrl($scope, SocialNetworks) {
    $scope.socialNetworks = new SocialNetworks();
	
}

/** Controleurs pour chaque reseau social **/

function smartphoneFbCtrl($scope) {
 $scope.socialNetwork = $scope.socialNetworks[0];
 $scope.messages = $scope.socialNetwork.getLastNMessages(20); 
 $scope.getIcon = $scope.socialNetwork.icon;
 
 $scope.getImageProfile = function(message) {
	var img = $scope.socialNetwork.getUserProfile(message.socialNetworkId).imageProfileURL;
	if (img) return img;
	return "./img/defaultProfile.png";
	}

	$scope.getNFirstCharacters = function(message, lg) {
	if (message.msgContent.length > lg)
		return message.msgContent.substring(0, lg) + "....";
	return message.msgContent;
	}
	
	$scope.getNameProfile = function(message) {
		return $scope.socialNetwork.getUserProfile(message.socialNetworkId).name;
	}
}

function smartphoneGpCtrl($scope) {
 $scope.socialNetwork = $scope.socialNetworks[1];
 $scope.messages = $scope.socialNetwork.getLastNMessages(20);
 $scope.getIcon = $scope.socialNetwork.icon;
 
 $scope.getImageProfile = function(message) {
	var img = $scope.socialNetwork.getUserProfile(message.socialNetworkId).imageProfileURL;
	if (img) return img;
	return "./img/defaultProfile.png";
	}

	$scope.getNFirstCharacters = function(message, lg) {
	if (message.msgContent.length > lg)
		return message.msgContent.substring(0, lg) + "....";
	return message.msgContent;
	}
	
	$scope.getNameProfile = function(message) {
		return $scope.socialNetwork.getUserProfile(message.socialNetworkId).name;
	}
}

function smartphoneTwCtrl($scope) {
 $scope.socialNetwork = $scope.socialNetworks[2];
 $scope.messages = $scope.socialNetwork.getLastNMessages(20);
 $scope.getIcon = $scope.socialNetwork.icon;
 
 $scope.getImageProfile = function(message) {
	var img = $scope.socialNetwork.getUserProfile(message.socialNetworkId).imageProfileURL;
	if (img) return img;
	return "./img/defaultProfile.png";
	}

	$scope.getNFirstCharacters = function(message, lg) {
	if (message.msgContent.length > lg)
		return message.msgContent.substring(0, lg) + "....";
	return message.msgContent;
	}
	
	$scope.getNameProfile = function(message) {
		return $scope.socialNetwork.getUserProfile(message.socialNetworkId).name;
	}
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

