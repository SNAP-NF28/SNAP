angular.module('socialNetworks', ['facebook','googleplus','twitter']).
    factory('SocialNetworks', function(Facebook, Googleplus , Twitter) {

        var SocialNetworks = function() {
            return [new Facebook(), new Googleplus() , new Twitter()];
        };

        // list here function to apply to each social network
        //SocialNetworks.prototype.toSmth = function(cb) {
        //    return
        //};
        return SocialNetworks;
    });


function SocialNetworkCtrl($scope, SocialNetworks) {
    $scope.socialNetworks = new SocialNetworks();//SocialNetworks();
}