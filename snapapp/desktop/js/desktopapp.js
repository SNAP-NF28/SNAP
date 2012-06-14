angular.module('desktopApp', ['socialNetworks']).
	directive('tabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope, $element) {
                var panes = $scope.panes = [];

                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                }

                this.addPane = function(pane) {
                    if (panes.length == 0) $scope.select(pane);
                    panes.push(pane);
                }
            },
            template:
                '<div class="tabbable">' +
                    '<ul class="nav nav-tabs">' +
                    '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
                    '<a href="#{{pane.title}}" ng-click="select(pane)" id="pane-{{pane.title}}">{{pane.title}}</a>' +
                    '</li>' +
                    '</ul>' +
                    '<div class="tab-content" ng-transclude></div>' +
                    '</div>',
            replace: true
        };
    }).
    directive('pane', function() {
        return {
            require: '^tabs',
            restrict: 'E',
            transclude: true,
            scope: { title: 'bind' },
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
            },
            template:
                '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
                    '</div>',
            replace: true
        };
    })

function desktopAppCtrl($scope, SocialNetworks) {
    $scope.socialNetworks = new SocialNetworks();
	$scope.cl = {
        counterLimit: -1,
		list: []
    }
	
	$scope.sendMsg = function(socialNetworks) {
		var message = $('textarea#newMsg').val();
		for(var i=0; i<socialNetworks.length; i++){
			if ($('#check'+socialNetworks[i].name).attr("checked")){
				socialNetworks[i].sendMessage(message);
			}
		}
		$("textarea#newMsg").val("");
	}
	
	$scope.logout = function(socialNetwork) {
		socialNetwork.logout();
	}
	
	$scope.getUserImageProfile = function(socialNetwork) {
		if (socialNetwork.connected) var img = socialNetwork.getUserProfile().imageProfileURL;
		if (img) return img;
		return "./img/defaultProfile.png";
	}
	
	$scope.getUserNameProfile = function(socialNetwork) {
		var name;
		if (socialNetwork.connected) name = socialNetwork.getUserProfile().name;
		else name="Un profil";
		return name;
	}
	
	$scope.getUserDateOfInscriptionProfile = function(socialNetwork) {
		var dateSub;
		if (socialNetwork.connected) {
			dateSub = socialNetwork.getUserProfile().subscriptionDate;
			var dateS = new Date(dateSub);
			var month = dateS.getMonth()+1;
			if (month < 10) {
				month = '0' + month;
			}
			return dateS.getDate() + '/' + month + '/' + dateS.getFullYear();
		} else {
			dateSub="A day";
			return dateSub;
		}
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
				if(sn && sn.lastMessages && sn.lastMessages > 0) {
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
		return "./img/defaultProfile.png";
	}
	
	$scope.getNameProfile = function(message) {
    var name = message.authorName;
    return name;
		//return $scope.socialNetwork.getUserProfile(message.socialNetworkId).name;
	}
	
	$scope.cutMsg = function(message, length){
		if(message.length>length) return message.substring(0,140) + "....";
		return message;
	}
	
	$scope.formatDate = function(message) {
      var d1 = new Date(message.msgDate);
	  var d2 = new Date();
	  
	  if (d1.getMinutes() == d2.getMinutes()) {
		return "Il y a quelques secondes";
		}
	  else if (d1.getHours() == d2.getHours()) {
		var m = d2.getMinutes() - d1.getMinutes();
		return "Il y a " + m + " minutes";
		}
	  else if ((d1.getDate() == d2.getDate()) && (d1.getMonth() == d2.getMonth())) {
		var h = d2.getHours() - d1.getHours();
		var c = "Il y a " + h ;
		if (h == 1)
			c += " heure";
		else
			c += " heures";
		return c;
		}
		else if (d2.getDate() - d1.getDate() == 1){
			return "Hier";
		}
		else {
			var c = "Le " + d1.toString('dddd, dd MMMM yyyy HH:mm');
			return c;
		} 
    }
	
	$scope.getDescriptionProfile = function(message) {
		return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut tellus sed neque auctor varius feugiat quis turpis. Quisque commodo nullam.";
	}
}

function checkboxCtrl($scope) {	
	$scope.check = true;
	$scope.limitFixer = function() {
		if(tmp = $scope.socialNetwork.limitChar){
			if(tmp>0){
				$scope.cl.list.push(tmp);
				if($scope.cl.counterLimit>=0){
					if (tmp<$scope.cl.counterLimit) $scope.cl.counterLimit=tmp;
				}
				else $scope.cl.counterLimit=tmp;
			}
		}
	}
	
	/*$scope.clickLimitChanger = function(check) {
		if(check==true){
			if($scope.socialNetwork.limitChar){
				if($scope.socialNetwork.limitChar>0){
					$scope.cl.list.push($scope.socialNetwork.limitChar);
					$scope.cl.list.sort();
					$scope.cl.counterLimit=$scope.cl.list[0];
				}
			}
		}
		else{
			if($scope.socialNetwork.limitChar = $scope.socialNetwork.limitChar){
				if($scope.socialNetwork.limitChar>0){	
					tmp = $scope.cl.list.indexOf($scope.socialNetwork.limitChar);
					$scope.cl.list.splice(tmp,tmp);
				}
				if($scope.cl.list==[]) $scope.cl.counterLimit =-1;
			}
		}	
	}*/
}

function desktopAppCtrlMsg($scope) {
    $scope.messages = $scope.socialNetwork.getLastNMessages(20);
	
	$scope.getImageProfile = function(message) {
    var img = message.authorImg;
    if (img) return img;
		// img = $scope.socialNetwork.getUserProfile(message.socialNetworkId).imageProfileURL;
		// if (img) return img;
		return "./img/defaultProfile.png";
	}
	
	$scope.getNameProfile = function(message) {
    var name = message.authorName;
    return name;
		//return $scope.socialNetwork.getUserProfile(message.socialNetworkId).name;
	}
	
	$scope.cutMsg = function(message, length){
		if(message.length>length) return message.substring(0,140) + "....";
		return message;
	}
	
	$scope.loginDiv = function() {
		if ($scope.socialNetwork.connected){}
			//return "<span id='login-{{socialNetwork.name}}'>{{socialNetwork.connect()}}</span>"
	}
	
	$scope.getDescriptionProfile = function(message) {
		return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut tellus sed neque auctor varius feugiat quis turpis. Quisque commodo nullam.";
	}
}

function charCounter(target, max, idchamp, btn){ 
	StrLen = target.value.length; 
	CharsLeft = max-StrLen;
	document.getElementById(btn).disabled="";
	if (StrLen > max || StrLen == 0) 
	{ 
		document.getElementById(btn).disabled="disabled";
	} 	
    document.getElementById(idchamp).innerHTML = CharsLeft;
} 

	
function resize(){ 
	var windowheight = window.innerHeight; 
	var frame = document.getElementsByClassName("pane")
	for(var i = 0; i < frame.length; i++) {
		if(window.innerWidth > 768) frame[i].style.maxHeight = windowheight-85 + "px";
		else frame[i].style.maxHeight = windowheight-285 + "px";
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