angular.module('tabletApp', ['socialNetworks']);

function tabletAppCtrl($scope, SocialNetworks) {

    $scope.socialNetworks = new SocialNetworks();
    $scope.selectPane = function(selectedPane){
        $(".sn-pane").addClass('hide');
        $('#'+selectedPane).removeClass('hide');
    }

    $scope.isConnected = false;

}