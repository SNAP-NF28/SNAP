angular.module('tabletApp', ['socialNetworks']);

function tabletAppCtrl($scope, SocialNetworks) {

    var getSn = function(){
      if($scope.getSnAlreadyCalled)
        return $scope.socialNetworks;
      $scope.getSnAlreadyCalled = true;
      return new SocialNetworks();
    }

    $scope.socialNetworks = getSn();

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

    $scope.sendPendingMsg = function(){
      var msg = JSON.parse(sessionStorage.getItem('tabletMsg2Send'));
      if(msg){
        var content = msg.content;
        var okNotif = "";
        var problemNotif = "";
        for(i in $scope.socialNetworks){
          var sn = $scope.socialNetworks[i];
          //console.log(sn.id,msg.sn);
          if(msg.sn.indexOf(sn.id) != -1)
            if(!sn.connected)
              problemNotif += "<br/> Message could't be delivered to " + sn.displayName + " because you are not authenticated.";
            else{
              var sent = sn.sendMessage(content);
              if(sent)
                okNotif += "<br/> Message delivered to " + sn.displayName;
              else
                problemNotif += "<br/> Message could't be delivered to " + sn.displayName + " because something bad happened :( .";
            console.log('Sending "' + content + '" to ' + sn.id);
          }
        }
        sessionStorage.removeItem('tabletMsg2Send');
        if(okNotif)
          //console.log(okNotif);
          sessionStorage.setItem("tabletOkNotif", okNotif);
        if(problemNotif)
          //console.log(problemNotif);
          sessionStorage.setItem("tabletProblemNotif", problemNotif);
        $('#ackMsgspent').trigger('click');
      }
    };
}

function tabletMsgCtrl($scope){
  $scope.msg = JSON.parse(sessionStorage.getItem("tabletCurrentMsg"));
  console.log($scope.msg);

  $scope.formatDate = function(date){
      var d = new Date(date);
      return d.toString('dddd, MMMM d, yyyy - h:m tt');      
    }
}

function tabletSendMsgCtrl($scope, SocialNetworks){

  var getSn = function(){
      if($scope.getSnAlreadyCalled)
        return $scope.socialNetworks;
      $scope.getSnAlreadyCalled = true;
      return new SocialNetworks();
    }

    $scope.socialNetworks = getSn();

  $scope.sendMsg = function(){
    var content = $('#textarea').val();

    if(content === "")
      return;

    var fb = $('#fb').attr('checked');
    var googleplus = $('#googleplus').attr('checked');
    var twtr = $('#twtr').attr('checked');
    var sn = [];
    if(fb)
      sn.push("fb");
    if(googleplus)
      sn.push('googleplus');
    if(twtr)
      sn.push('twitter');

    sessionStorage.setItem('tabletMsg2Send', JSON.stringify({
      content: content,
      sn: sn
    }));
  }
}

function tabletNotifMsgCtrl($scope){
  $scope.fetchNotif = function(){
    var okNotif =sessionStorage.getItem("tabletOkNotif");
    sessionStorage.removeItem("tabletOkNotif"); 
    if(okNotif){
      $('#okNotif').html(okNotif);
    }
    var problemNotif = sessionStorage.getItem("tabletProblemNotif");
    sessionStorage.removeItem('tabletProblemNotif');
    if(problemNotif){
      $('#problemNotif').html(problemNotif);
    }
  }
}
