'use strict';

/* App Module */

angular.module('phonecat', ['phonecatFilters', 'phonecatServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/phones', {template: 'partials/phone-list.html',   controller: PhoneListCtrl}).
      when('/phones/:phoneId', {template: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/phones'});
}]);
