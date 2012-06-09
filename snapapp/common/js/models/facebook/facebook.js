angular.module('facebook',['SNMock']).
    factory('Facebook', function(SNMock,Message,Profile) {

        /**
         * Class Description
         *
         * @type Facebook
         * @class
         *
         * Constructor Description
         *
         * @this {Facebook}
         * @description
         *
         * Attributes
         *
         * @property socialNetworkId
         * @property name
         * @property homeSite
         * @property picture
         *
         */

		/** Heritage des attributs de la classe SNMock **/
        Facebook = function(){
            SNMock.apply(this);
            //list attributes
            this.name = "Facebook";
			this.displayName = "Facebook";
			this.icon = "/snapapp/common/img/logo_facebook_60x60.png";
			this.limitChar = 400;
            this.lastMessages = [];
            this.lastMessagesIds = [];
            this.lastImgPath = [];
            this.connected = false;
            return this;
        }

        FB.init({
                            appId      : '454890441191384',
                            status     : true,
                            cookie     : true,
                            xfbml      : true,
                            oauth      : true
                        });
		
		/** Heritage des methodes de la classe SNMock **/
		Facebook.prototype = new SNMock();
		
        /** Surcharge des methodes de la classe SNMock **/
        Facebook.prototype.getSNName = function(){
            return "facebook";
        }

        Facebook.prototype.connect = function(){

            if(this.isConnected())
                return;

            var self = this;
            console.log('Facebook call: connect');

            var fbButton = $('#login-' + self.name);

            fbButton.html(
                "<div id='log-Fb' class='fb-login-button'>Connect with Facebook</div>");

            FB.init({ //Crappy stuff... to make to button display
                        appId      : '454890441191384',
                        status     : true,
                        cookie     : true,
                        xfbml      : true,
                        oauth      : true
                    });

            if(!this.connectAlreadyCalled){
                //this.connectAlreadyCalled = true;

                $('#log-Fb').bind('click', function() {
                     FB.login(function(response) {
                       if (response.authResponse) {
                         console.log('Welcome!  Fetching your information.... ');
                         FB.api('/me', function(response) {
                           console.log('Good to see you, ' + response.name + '.');
                           self.connected = true;
                           angular.element(document).scope().$apply(null);
                         });
                       } else {
                         console.log('User cancelled login or did not fully authorize.');
                       }
                     }, {scope: 'email,user_about_me,read_stream,publish_stream'});
                });
            }
            //angular.element(document).scope().$apply(null);
        }


        Facebook.prototype.getLastNMessages = function(n){

            var self = this;

            if(self.lastMessages > 0)
                return this.lastMessages;

            console.log('Facebook call: getLastNMessages')

            if(!this.lastMessages)
              this.lastMessages = [];

            var current_time = new Date().getTime();

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    FB.api('/me/home?limit=' + 40, {access_token: response.authResponse.accessToken}, function(response) {
                        var j = 0;
                        self.lastMessages.length = 0;

                        if (response.data) {
                            for (var i=0; i<response.data.length; i++) {
                                if (!response.data[i].message) {
                                    continue;
                                }
                                console.log('msg pushed');

                                var msg = new Message();
                                msg.msgContent = response.data[i].message;
                                //console.log(msg.msgContent);
                                msg.originalLink = "http://www.facebook.com/"; //TODO changer le lien
                                msg.authorId = response.data[i].from.id;
                                msg.msgId = response.data[i].id;
                                msg.authorName = response.data[i].from.name;
                                msg.msgDate = new Date(response.data[i].created_time).getTime();
                                msg.authorImg = "/snapapp/common/img/defaultProfile.png";
                                FB.api('/' + msg.authorId + '/picture', function(response) {
                                    var regex = /[\d]+_([\d]+)_[\d]+/;
                                    for (i in self.lastMessages){
                                        var m = self.lastMessages[i];
                                        var match = regex.exec(response);
                                        if(!match || !match[1])
                                            return;
                                        var id = match[1];
                                        if(m.authorId === id){
                                            m.authorImg = response;
                                            angular.element(document).scope().$apply(null); // force refresh view
                                        }
                                    }
                                });
                                self.lastMessages.push(msg);
                                j++;
                            }
                        }

                    });

                    return self.lastMessages;


                } else {
                    console.log('no Auth');


                    return  self.lastMessages;
                }
            });
            return this.lastMessages;
        }



        Facebook.prototype.isConnected = function() {
            
            if(this.connected)
                return true;

            self = this;

            console.log('Facebook call: isConnected');

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    console.log('Connected');
                    $('#login-' + self.name).addClass('hide');
                    self.connected = true;
                }
            });

            return false;
        }

        Facebook.prototype.sendMessage = function(text){
            //console.log('Facebook call: sendMessage');
            if(typeof(FB) === "object" && FB._apiKey === null) {
                return;
            }

            //var content = $('.newMsg').val();
            console.log(text);

            FB.api('/me/feed', 'post', { message: text}, function(response) {
                if (!response || response.error) {
                    console.log('Error occured');
                } else {
                    console.log('Post ID: ' + response.id);
                }
            });
        }

        return Facebook;
    });

