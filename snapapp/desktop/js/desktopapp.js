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
		if (socialNetwork.isConnected()) var img = socialNetwork.getUserProfile().imageProfileURL;
		if (img) return img;
		return "./img/defaultProfile.png";
	}
	
	$scope.getUserNameProfile = function(socialNetwork) {
		var name;
		if (socialNetwork.isConnected()) name = socialNetwork.getUserProfile().name;
		else name="Un profil";
		return name;
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
		if ($scope.socialNetwork.isConnected){}
			//return "<span id='login-{{socialNetwork.name}}'>{{socialNetwork.connect()}}</span>"
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
      if(temp)
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

    $scope.envoiMessage = function() {
        alert('EEEE');
        var msg_content = $('.newMsg');
        console.log('msgcontenu: ' + msg_content);
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

function sendMessage() {

}
