angular.module('smartphoneApp', ['socialNetworks']);

/** Controleur principal **/

function smartphoneAppCtrl($scope, SocialNetworks) {
	$scope.socialNetworks = new SocialNetworks();
	$('#msgDetails').live('pageshow', function () {displayMessage()});
	//angular.element(document).scope().$apply(null); // force refresh view
	
	/** WTF 10 APPELS ???!! **/
	$scope.getAllMessages = function(nb) { 
		if ($scope.allMsg && $scope.allMsg.length > nb) {
			console.log("all messages already sorted");
			return $scope.allMsg;
		} else {
			console.log("get all messages");
			
			var tmp_1 = [];
			for (var i = 0; i < $scope.socialNetworks.length; i++) {
				var sn = $scope.socialNetworks[i];
				var tmp = [];
				if(sn.lastMessages && sn.lastMessages > nb) {
					console.log("messages from " + sn.name + " already fetched");
					tmp = sn.lastMessages;
				} else {
					//sn.alreadyFetched = true;
					console.log("first time fetch from " + sn.name);
					tmp = sn.getLastNMessages(20);
				}
				
				console.log("fetch " + tmp.length + " messages from " + sn.name);
				
				for (var j = 0; j < tmp.length; j++) {
					tmp_1.push(tmp[j]);
				}
			}
			//$scope.alreadyFetched = true;
			console.log("fetch done");
			$scope.allMsg = tmp_1;
		}
		
		return $scope.allMsg;
	}
	
}
/** Controleurs pour chaque reseau social **/

function smartphoneFbCtrl($scope) {

	$scope.socialNetwork = $scope.socialNetworks[0];
	//$scope.messages = $scope.socialNetwork.getLastNMessages(20);
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
	
	$scope.getDate = function(message) {
		return message.msgDate;
	}
	 
	$scope.getLastMsg = function(sn){
      if(sn.alreadyFetched)
        return sn.lastMessages;
      sn.alreadyFetched = true;
      return sn.getLastNMessages(20);
    }
}

function smartphoneGpCtrl($scope) {
	$scope.socialNetwork = $scope.socialNetworks[1];
	//$scope.messages = $scope.socialNetwork.getLastNMessages(20);
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
	
	    $scope.getLastMsg = function(sn){
      if(sn.alreadyFetched)
        return sn.lastMessages;
      sn.alreadyFetched = true;
      return sn.getLastNMessages(20);
    }
}

function smartphoneTwCtrl($scope) {
	$scope.socialNetwork = $scope.socialNetworks[2];
	//$scope.messages = $scope.socialNetwork.getLastNMessages(20);
	$scope.getIcon = $scope.socialNetwork.icon;

	$scope.getImageProfile = function(message) {
    var img = message.authorImg;
    if (img) return img;
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
	
	$scope.getDate = function(message) {
	return message.msgDate;
	}
	
	$scope.getLastMsg = function(sn){
      if(sn.alreadyFetched)
        return sn.lastMessages;
      sn.alreadyFetched = true;
      return sn.getLastNMessages(20);
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

/** Tri fusion **/
/* Functions mergeSort & merge : http://www.stoimen.com/blog/2010/07/02/friday-algorithms-javascript-merge-sort/ */
function mergeSort(arr)
{
    if (arr.length < 2)
        return arr;
 
    var middle = parseInt(arr.length / 2);
    var left   = arr.slice(0, middle);
    var right  = arr.slice(middle, arr.length);
 
    return merge(mergeSort(left), mergeSort(right));
}
 
function merge(left, right)
{
    var result = [];
 
    while (left.length && right.length) {
        if (left[0].msgDate <= right[0].msgDate) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
 
    while (left.length)
        result.push(left.shift());
 
    while (right.length)
        result.push(right.shift());
 
    return result;
}

function storeMessage($msg, $authorImg) {
	/*console.log("Message original : " + $msg.msgContent);
	console.log("Auteur original : " + $msg.authorName);
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

