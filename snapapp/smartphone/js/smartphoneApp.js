angular.module('smartphoneApp', ['socialNetworks']);

/** Controleur principal **/

function smartphoneAppCtrl($scope, SocialNetworks) {
	$scope.socialNetworks = new SocialNetworks();
	$('#msgDetails').live('pageshow', function () {displayMessage()});
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

	// Si on enleve l'alert les messages ne sont pas affichés Je NE COMPRENDS PAS POURQUOI!!
	alert('nbMsg: ' + $scope.messages.length); //TODO retirer l'alert
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
	return "../common/img/defaultProfile.png";
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
/** On peut changer l'ordre des pages dans pageOrder, ca fonctionnera toujours **/

function smartphoneFooterCtrl($scope) {
$(document).bind('pageinit', function(event) {
    var activePage = $(event.target);
});
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

function storeMessage($msg, $author, $authorImg) {
	$('#msgDetails').data('message', $msg);
	$('#msgDetails').data('author', $author);
	$('#msgDetails').data('authorImg', $authorImg);
}

function displayMessage() {
	var msg = $('#msgDetails').data('message');
	var author = $('#msgDetails').data('author');
	var authorImg = $('#msgDetails').data('authorImg');

	console.log("img url : " + authorImg);
	console.log("default img : " + $('#msgDetails').find($('img.msgImgProfile')[0]).attr('src'));
	
	$('#msgDetails').find($('b.userName')[0]).text(author);
	$('#msgDetails').find($('span.msgContent')[0]).text(msg);
	$('#msgDetails').find($('img.msgImgProfile')[0]).attr('src', authorImg);
	
	console.log("new url : " + $('#msgDetails').find($('img.msgImgProfile')[0]).attr('src'));
	
	console.log("display done");
}

