angular.module('smartphoneApp', ['socialNetworks']);

/** Controleur principal **/

function smartphoneAppCtrl($scope, SocialNetworks) {
	$scope.socialNetworks = new SocialNetworks();
	$('#msgDetails').live('pageshow', function () {displayMessage()});
	//angular.element(document).scope().$apply(null); // force refresh view

}

/** Controleurs pour chaque reseau social **/

function smartphoneFbCtrl($scope) {

	$scope.socialNetwork = $scope.socialNetworks[0];
	$scope.messages = $scope.socialNetwork.getLastNMessages(20);
	$scope.getIcon = $scope.socialNetwork.icon;

	$scope.getImageProfile = function(message) {
    var img = message.authorImg;
    if (img) return img;
		// img = $scope.socialNetwork.getUserProfile(message.socialNetworkId).imageProfileURL;
		// if (img) return img;
		return "../common/img/defaultProfile.png";
	}
	
	$scope.getNFirstCharacters = function(message, lg) {
	if (message.msgContent.length > lg)
		return unescape(message.msgContent.substring(0, lg)) + "....";
	return unescape(message.msgContent);
	}

	$scope.getNameProfile = function(message) {
	//console.log(unescape(message.authorName));	
    return unescape(message.authorName);
		//return $scope.socialNetwork.getUserProfile(message.socialNetworkId).name;
	}
}

function smartphoneGpCtrl($scope) {
	$scope.socialNetwork = $scope.socialNetworks[1];
	$scope.messages = $scope.socialNetwork.getLastNMessages(20);
	$scope.getIcon = $scope.socialNetwork.icon;

	$scope.getImageProfile = function(message) {
	var img = message.authorImg;
  if (img) return img;
	var img = $scope.socialNetwork.getUserProfile(message.socialNetworkId).imageProfileURL;
	if (img) return img;
	return "./img/defaultProfile.png";
	}

	$scope.getNFirstCharacters = function(message, lg) {
	if (message.msgContent.length > lg)
		return unescape(message.msgContent.substring(0, lg)) + "....";
	return unescape(message.msgContent);
	}

	$scope.getNameProfile = function(message) { 
    //return unescape(message.authorName);
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
		return unescape(message.msgContent.substring(0, lg)) + "....";
	return unescape(message.msgContent);
	}

	$scope.getNameProfile = function(message) { 
    return unescape(message.authorName);
		//return $scope.socialNetwork.getUserProfile(message.socialNetworkId).name;
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

function storeMessage($msg, $authorImg) {
	/*console.log("Message original : " + $msg);
	console.log("Auteur original : " + $author);
	*/
	$('#msgDetails').data('message', escape($msg.msgContent));
	$('#msgDetails').data('author', escape($msg.authorName));
	$('#msgDetails').data('authorImg', $authorImg);
	/*
	console.log("Message stocke : " + $('#msgDetails').data('message'));
	console.log("Auteur stocke : " + $('#msgDetails').data('author'));
	*/
}

function displayMessage() {
	var msg = unescape($('#msgDetails').data('message'));
	var author = unescape($('#msgDetails').data('author'));
	var authorImg = $('#msgDetails').data('authorImg');
	/*
	console.log("Message recupere : " + msg);
	console.log("Auteur recupere : " + author);
	*/
	$('#msgDetails').find($('b.userName')[0]).text(author);
	$('#msgDetails').find($('span.msgContent')[0]).text(msg);
	$('#msgDetails').find($('img.msgImgProfile')[0]).attr('src', authorImg);	
	/*
	console.log("Message affiche : " + $('#msgDetails').find($('b.userName')[0]).text());
	console.log("Auteur affiche : " + $('#msgDetails').find($('span.msgContent')[0]).text());
	*/
	$('#msgDetails').removeData('message');
	$('#msgDetails').removeData('author');
	$('#msgDetails').removeData('authorImg');
	
}

