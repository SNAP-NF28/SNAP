'use strict';

/* Controllers */

function PhoneListCtrl($scope, Phone) {
  $scope.phones = Phone.query();
  $scope.orderProp = 'idMsg';
  
  $scope.goToDetail = function(idMsg) {
		window.location.href="#/phones/"+idMsg;
	};  
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];



function PhoneDetailCtrl($scope, $routeParams, Phone) {
  $scope.message = Phone.get({phoneId: $routeParams.phoneId}, function(message) {
    $scope.mainImageUrl = message.imageAuteur;
  });
  
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
