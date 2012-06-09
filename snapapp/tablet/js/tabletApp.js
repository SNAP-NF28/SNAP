angular.module('tabletApp', ['socialNetworks']);

function tabletAppCtrl($scope, SocialNetworks) {

    $scope.socialNetworks = new SocialNetworks();
    $scope.selectPane = function(selectedPane){
        $(".sn-pane").addClass('hide');
        $('#'+selectedPane).removeClass('hide');
    }

    $scope.getMsgImg = function(msg){
      var img = msg.authorImg;
      if (img) return img;
      return "/snapapp/common/img/defaultProfile.png";
    }

    $scope.getLastMsg = function(sn){
      if(sn.alreadyFetched)
        return sn.lastMessages;
      sn.alreadyFetched = true;
      return sn.getLastNMessages(10);
    }
}