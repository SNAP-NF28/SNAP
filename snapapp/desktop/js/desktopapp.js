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
}

function desktopAppCtrlMsg($scope) {
    $scope.messages = $scope.socialNetwork.getLastNMessages(20)
	
	$scope.getImageProfile = function(message) {
		var img = $scope.socialNetwork.getUserProfile(message.socialNetworkId).imageProfileURL;
		if (img) return img;
		return "./img/defaultProfile.png";
	}
	$scope.getNameProfile = function(message) {
		return $scope.socialNetwork.getUserProfile(message.socialNetworkId).name;
	}
}

function charCounter(target, max, idchamp, btn){ 
	StrLen = target.value.length; 
	CharsLeft = 140-StrLen;
	document.getElementById(btn).disabled="";
	if (StrLen > max ) 
	{ 
		document.getElementById(btn).disabled="disabled";
	} 
    document.getElementById(idchamp).innerHTML = CharsLeft;
} 