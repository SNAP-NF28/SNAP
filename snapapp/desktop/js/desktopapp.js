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
                    '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
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
	
	$scope.clickLimitChanger = function(check) {
		if(check==true){
			if(tmp = $scope.socialNetwork.limitChar){
				if(tmp>0){
					$scope.cl.list.push(tmp);
					$scope.cl.list.sort();
					$scope.cl.counterLimit=$scope.cl.list[0];
				}
			}
		}
		else{
			if(tmp = $scope.socialNetwork.limitChar){
				if(tmp>0){	
					tmp2 = $scope.cl.list.indexOf(tmp);
					$scope.cl.list.splice(tmp2,tmp2);
				}
			}
		}	
	}
}

function desktopAppCtrlMsg($scope) {
    $scope.messages = $scope.socialNetwork.getLastNMessages(20);
	
	$scope.getImageProfile = function(message) {
		var img = $scope.socialNetwork.getUserProfile(message.socialNetworkId).imageProfileURL;
		if (img) return img;
		return "./img/defaultProfile.png";
	}
		
	$scope.getImageProfile = function(message) {
		var img = $scope.socialNetwork.getUserProfile(message.socialNetworkId).imageProfileURL;
		if (img) return img;
		return "./img/defaultProfile.png";
	}
	
	$scope.getNameProfile = function(message) {
		return $scope.socialNetwork.getUserProfile(message.socialNetworkId).name;
	}
	
	$scope.cutMsg = function(message, length){
		if(message.length>length) return message.substring(0,140) + "....";
		return message;
	}
}


function desktopAppCtrlAll($scope) {

 	var capsuleMessage = function(RS,Mess){
        this.reseau=RS;
		this.message=Mess;
    }
	
	function sortMsg(a, b){
		return b.message.msgDate-a.message.msgDate;
	}
	
	getMsgAll = function(nb){
		var temp;
		var listMess = [];
		for(j=0;j<$scope.socialNetworks.length;j++){
			temp = $scope.socialNetworks[j].getLastNMessages(nb);
			for(i=0;i<temp.length;i++){
				var temp2 = new capsuleMessage(j,temp[i])
				listMess.push(temp2);
			}
		}
		listMess.sort(sortMsg);
		listMess = listMess.slice(0,nb);
		return listMess;
	}
	
	$scope.messages = getMsgAll(20);
	
	$scope.getImageProfile = function(capsuleMessage) {
		var img = $scope.socialNetworks[capsuleMessage.reseau].getUserProfile(capsuleMessage.message.socialNetworkId).imageProfileURL;
		if (img) return img;
		return "./img/defaultProfile.png";
	}
	
	$scope.getNameProfile = function(capsuleMessage) {
		return $scope.socialNetworks[capsuleMessage.reseau].getUserProfile(capsuleMessage.message.socialNetworkId).name;
	}
	
	$scope.cutMsg = function(capsuleMessage, length){
		if(capsuleMessage.message.msgContent.length>length) return capsuleMessage.message.msgContent.substring(0,140) + "....";
		return capsuleMessage.message.msgContent;
	}
	
}
function charCounter(target, max, idchamp, btn){ 
	StrLen = target.value.length; 
	CharsLeft = max-StrLen;
	document.getElementById(btn).disabled="";
	if (StrLen > max ) 
	{ 
		document.getElementById(btn).disabled="disabled";
	} 
    document.getElementById(idchamp).innerHTML = CharsLeft;
} 

	
function resize(){ 
	var windowheight = window.innerHeight; 
	var frame = document.getElementsByClassName("pane")
	for(var i = 0; i < frame.length; i++) {
		if(window.innerWidth > 768) frame[i].style.maxHeight = windowheight-105 + "px";
		else frame[i].style.maxHeight = windowheight-305 + "px";
	}
} 