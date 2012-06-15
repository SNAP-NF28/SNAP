angular.module('smartphoneApp', ['socialNetworks']);

/** Controleur principal **/

function smartphoneAppCtrl($scope, SocialNetworks) {
	$scope.socialNetworks = new SocialNetworks();
	
	$('#msgDetails').live('pageshow', function () {displayMessage()});
	$('#usrPage').live('pageshow', function () {displayProfile()});
	
	/** Force fixed toolbars (no toggle tap) **/
	$("[data-role=header]").fixedtoolbar({ tapToggle: false });
	$("[data-role=footer]").fixedtoolbar({ tapToggle: false });
	
	//angular.element(document).scope().$apply(null); // force refresh view
	
	$scope.anyConnected = function(){
      for(i in $scope.socialNetworks){
        var sn = $scope.socialNetworks[i];
        if(sn.connected == true)
          return true;
      }
      return false;
    }
	
	$scope.getAllMessages = function(nb) { 
		if ($scope.allMsg && $scope.allMsg.length > 0) {
			console.log("all messages already sorted");
			return $scope.allMsg;
		} else {
			console.log("get all messages");
			
			var tmp_1 = [];
			for (var i = 0; i < $scope.socialNetworks.length; i++) {
				var sn = $scope.socialNetworks[i];
				var tmp = [];
				if(sn && sn.lastMessages && sn.lastMessages > 0 && !force) {
					console.log("messages from " + sn.name + " already fetched");
					tmp = sn.lastMessages;
				} else {
					//sn.alreadyFetched = true;
					console.log(" fetch from " + sn.name);
					tmp = sn.getLastNMessages(nb);
				}
				
				console.log("fetch " + tmp.length + " messages from " + sn.name);
				
				for (var j = 0; j < tmp.length; j++) {
					tmp[j].socialNetworkMinIcon = sn.miniIcon;
					tmp_1.push(tmp[j]);
				}
			}
			//$scope.alreadyFetched = true;
			console.log("fetch done");
			var tmp_2 = mergeSort(tmp_1);
			$scope.allMsg = tmp_2.slice(0, nb);
		}
		
		return $scope.allMsg;
	}
	
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
	
	$scope.formatDate = function(message) {
      var d1 = new Date(message.msgDate);
	  var d2 = new Date();
	  
	  if ((d1.getDate() == d2.getDate()) && (d1.getMonth() == d2.getMonth())) {
		  if (d1.getMinutes() == d2.getMinutes()) {
			return "Il y a quelques secondes";
			}
		  else if ((d1.getHours() == d2.getHours()) || ((d2.getHours()-d1.getHours() == 1) && (d2.getMinutes() < d1.getMinutes()))) {
			var h = d2.getHours()- d1.getHours();
			var m = (60*h + d2.getMinutes()) - d1.getMinutes();
			var c = "Il y a ";
			if (m == 1) {
				c += "1 minute";
				return c;
			}
			c += m;
			c += " minutes";
			return c;
			}
		  else {
			var h = d2.getHours() - d1.getHours();
			var c = "Il y a " + h ;
			if (h == 1)
				c += " heure";
			else
				c += " heures";
			return c;
			} 
		}
		else {
			if ((d2.getDate() - d1.getDate() == 1) && (d1.getMonth() == d2.getMonth()) ){
				return "Hier";
			}else {
				var c = "Le " + d1.toString('dddd, dd MMMM yyyy HH:mm');
				return c;
			}
		} 
    }
	
	$scope.counter = 0; // compteur pour l'envoi de messages
	$scope.setCounter = function() {
	
	}
	
	$scope.sendMsg = function() {
	var message = $('textarea').val();
	
	for(var i=0; i<$scope.socialNetworks.length; i++){
		var sN = $scope.socialNetworks[i];	
		var name = '#'+ sN.id+'CheckBox';
			if ($(name).attr("checked")){
				sN.sendMessage(message);
				$('label[for='+sN.id+'CheckBox]').removeClass('ui-checkbox-on ui-btn-active').addClass('ui-checkbox-off');
				//$(name).attr("checked", false);
				console.log($(name).attr("checked"));
			}
	}
	$('textarea').val('');
}
}

/** Controleurs pour chaque reseau social **/
function smartphoneFbCtrl($scope) {

	$scope.socialNetwork = $scope.socialNetworks[0];
	//$scope.messages = $scope.socialNetwork.getLastNMessages(20);
	$scope.getIcon = $scope.socialNetwork.icon;
	//$('#fbPage').live('pagebeforechange', function () {$scope.getLastMsg($scope.socialNetwork, true)});
	
	
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
	
	$scope.formatDate = function(message) {
      var d1 = new Date(message.msgDate);
	  var d2 = new Date();
	  
	  if ((d1.getDate() == d2.getDate()) && (d1.getMonth() == d2.getMonth())) {
		  if (d1.getMinutes() == d2.getMinutes()) {
			return "Il y a quelques secondes";
			}
		  else if ((d1.getHours() == d2.getHours()) || ((d2.getHours()-d1.getHours() == 1) && (d2.getMinutes() < d1.getMinutes()))) {
			var h = d2.getHours()- d1.getHours();
			var m = (60*h + d2.getMinutes()) - d1.getMinutes();
			var c = "Il y a ";
			if (m == 1) {
				c += "1 minute";
				return c;
			}
			c += m;
			c += " minutes";
			return c;
			}
		  else {
			var h = d2.getHours() - d1.getHours();
			var c = "Il y a " + h ;
			if (h == 1)
				c += " heure";
			else
				c += " heures";
			return c;
			} 
		}
		else {
			if ((d2.getDate() - d1.getDate() == 1) && (d1.getMonth() == d2.getMonth()) ){
				return "Hier";
			}else {
				var c = "Le " + d1.toString('dddd, dd MMMM yyyy HH:mm');
				return c;
			}
		} 
    }
}

function smartphoneGpCtrl($scope) {
	$scope.socialNetwork = $scope.socialNetworks[1];
	//$scope.messages = $scope.socialNetwork.getLastNMessages(20);
	$scope.getIcon = $scope.socialNetwork.icon;
	//$('#gpPage').live('pagebeforechange', function () {$scope.getLastMsg($scope.socialNetwork, true)});
	
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
	
	$scope.formatDate = function(message) {
      var d1 = new Date(message.msgDate);
	  var d2 = new Date();
	  
	  if ((d1.getDate() == d2.getDate()) && (d1.getMonth() == d2.getMonth())) {
		  if (d1.getMinutes() == d2.getMinutes()) {
			return "Il y a quelques secondes";
			}
		  else if ((d1.getHours() == d2.getHours()) || ((d2.getHours()-d1.getHours() == 1) && (d2.getMinutes() < d1.getMinutes()))) {
			var h = d2.getHours()- d1.getHours();
			var m = (60*h + d2.getMinutes()) - d1.getMinutes();
			var c = "Il y a ";
			if (m == 1) {
				c += "1 minute";
				return c;
			}
			c += m;
			c += " minutes";
			return c;
			}
		  else {
			var h = d2.getHours() - d1.getHours();
			var c = "Il y a " + h ;
			if (h == 1)
				c += " heure";
			else
				c += " heures";
			return c;
			} 
		}
		else {
			if ((d2.getDate() - d1.getDate() == 1) && (d1.getMonth() == d2.getMonth()) ){
				return "Hier";
			}else {
				var c = "Le " + d1.toString('dddd, dd MMMM yyyy HH:mm');
				return c;
			}
		} 
    }
}

function smartphoneTwCtrl($scope) {
	$scope.socialNetwork = $scope.socialNetworks[2];
	//$scope.messages = $scope.socialNetwork.getLastNMessages(20);
	$scope.getIcon = $scope.socialNetwork.icon;

	//$('#twPage').live('pagebeforechange', function () {$scope.getLastMsg($scope.socialNetwork, true)});
	
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

	$scope.formatDate = function(message) {
      var d1 = new Date(message.msgDate);
	  var d2 = new Date();
	  
	  if ((d1.getDate() == d2.getDate()) && (d1.getMonth() == d2.getMonth())) {
		  if (d1.getMinutes() == d2.getMinutes()) {
			return "Il y a quelques secondes";
			}
		  else if ((d1.getHours() == d2.getHours()) || ((d2.getHours()-d1.getHours() == 1) && (d2.getMinutes() < d1.getMinutes()))) {
			var h = d2.getHours()- d1.getHours();
			var m = (60*h + d2.getMinutes()) - d1.getMinutes();
			var c = "Il y a ";
			if (m == 1) {
				c += "1 minute";
				return c;
			}
			c += m;
			c += " minutes";
			return c;
			}
		  else {
			var h = d2.getHours() - d1.getHours();
			var c = "Il y a " + h ;
			if (h == 1)
				c += " heure";
			else
				c += " heures";
			return c;
			} 
		}
		else {
			if ((d2.getDate() - d1.getDate() == 1) && (d1.getMonth() == d2.getMonth()) ){
				return "Hier";
			}else {
				var c = "Le " + d1.toString('dddd, dd MMMM yyyy HH:mm');
				return c;
			}
		} 
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
 
function merge(left, right) {
    var result = [];
 
    while (left.length && right.length) {
        if (left[0].msgDate > right[0].msgDate) {
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

/** Details d'un message **/

function storeMessage($msg, $authorImg) {
	
	$('#msgDetails').data('message', escape($msg.msgContent));
	$('#msgDetails').data('author', escape($msg.authorName));
	$('#msgDetails').data('authorImg', $authorImg);
	
}

function displayMessage() {
	var msg = unescape($('#msgDetails').data('message'));
	var author = unescape($('#msgDetails').data('author'));
	var authorImg = $('#msgDetails').data('authorImg');	
	
	$('#msgDetails').find($('b.usrName')[0]).text(author);
	$('#msgDetails').find($('span.msgText')[0]).text(msg);
	$('#msgDetails').find($('img.imgProfile')[0]).attr('src', authorImg);	

	//$('#msgDetails').find($('.msgImgProfile')[0]).attr('src', authorImg);
	
	$('#msgDetails').removeData('message');
	$('#msgDetails').removeData('author');
	$('#msgDetails').removeData('authorImg');
	
}

function storeUser($socialNetwork, $user) {
	$('#usrPage').data('socialNetwork', $socialNetwork);
	$('#usrPage').data('profile', escape($user));
}

function displayProfile() {
	var sN = $('#usrPage').data('socialNetwork');
	var user = unescape($('#usrPage').data('profile')) + "'s profile";
	
	$('usrPage').find($('h1.userNameProfile').[0]).text(user);
}

