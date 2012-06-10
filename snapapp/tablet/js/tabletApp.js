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

    $scope.formatDate = function(date){
      var d = new Date(date);
      return d.toString('dddd, MMMM d, yyyy - h:m tt');      
    }

    $scope.onMsgDetail = function(msg){
      sessionStorage.setItem('tabletCurrentMsg', JSON.stringify(msg)); // OMG :| this is a hack!
    }

    $scope.getAllMsg = function(){
      var msgList = [];
      for(i in $scope.socialNetworks){
        var sn = $scope.socialNetworks[i];
        var msgL = $scope.getLastMsg(sn);
        if(sn && msgL){
          //console.log('TabletAll: Grabbed ' + msgL.length + 'msg from ' + sn.id );
          msgList = msgList.concat(msgL);
        }
      }
      console.log('TabletAll: Total Grabbed ' + msgList.length + 'msg');
      msgList.sort(function(a,b){
        return b.msgDate - a.msgDate;
      });
      return msgList;
    }

    $scope.anyConnected = function(){
      for(i in $scope.socialNetworks){
        var sn = $scope.socialNetworks[i];
        if(sn.connected == true)
          return true;
      }
      return false;
    }
}

function tabletMsgCtrl($scope){
  $scope.msg = JSON.parse(sessionStorage.getItem("tabletCurrentMsg"));
  console.log($scope.msg);

  $scope.formatDate = function(date){
      var d = new Date(date);
      return d.toString('dddd, MMMM d, yyyy - h:m tt');      
    }
}