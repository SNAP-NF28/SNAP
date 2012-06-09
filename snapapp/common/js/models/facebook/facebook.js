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
            return this;
        }
		
		/** Heritage des methodes de la classe SNMock **/
		Facebook.prototype = new SNMock();
		
        /** Surcharge des methodes de la classe SNMock **/
        Facebook.prototype.getSNName = function(){
            return "facebook";
        }

        Facebook.prototype.isConnected = function() {
            
            if(this.connected)
                return true;

            self = this;

            console.log('Facebook call: isConnected');

            if(typeof(FB) === "object" && FB._apiKey === null) {
                FB.init({
                    appId      : '454890441191384',
                    status     : true,
                    cookie     : true,
                    xfbml      : true,
                    oauth      : true
                });
            }

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    console.log('Connected');
                    self.connected = true;
                    return true;
                }
            });

            return false;
        }


        Facebook.prototype.init = function() {
            console.log('Facebook call: init');
            if(typeof(FB) === "object" && FB._apiKey === null) {

                FB.init({
                    appId      : '454890441191384',
                    status     : true,
                    cookie     : true,
                    xfbml      : true,
                    oauth      : true
                });

                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {

                        FB.api('/me', function(response) {
                            Facebook.prototype.isConnected = function() {
                                return true;
                            }
                            Facebook.prototype.getUserProfile = function(id) {
                                FB.api('/me/picture', function(response2) {
                                    profile.imageProfileURL = response2;
                                });

                                var profile = new Profile();
                                profile.name = response.name;
                                profile.firstName = response.first_name;
                                profile.nickName = response.username;

                                return profile;
                            }
                            console.log(response.name);
                        });
                    } else if (response.status === 'not_authorized') {
                        console.log("No auth");
                    } else {
                        console.log("No auth");
                    }
                });
            }

        }


        Facebook.prototype.getUserProfile = function(id) {

            //console.log('Facebook call: getUserProfile');

            if(!this.profile){
                this.profile = new Profile();

                this.init();

                if(this.connected){

                        FB.api('/me/picture', function(response) {
                            this.profile.imageProfileURL = response;
                        });

                        FB.api('/me', function(response) {

                            this.profile.name = response.name;
                            this.profile.firstName = response.first_name;
                            this.profile.nickName = response.username;
                            return this.profile;
                        });
                    }
            }

            return this.profile;
        }


        Facebook.prototype.getImgMessage = function(res) {
            //console.log('Facebook call: getImgMessage');
            var self = this;

            FB.getLoginStatus(function(resp) {
                FB.api('/me/home?limit=40', function(respon) {
                    for (var i=0; i<respon.data.length; i++) {
                        if (!respon.data[i].message) {
                            continue;
                        }

                        FB.api('/' + respon.data[i].from.id + '/picture', function(response) {
                            console.log(response);
                            self.lastImgPath.push(response);
                            return response;
                        });
                    }
                    return self.lastImgPath;
                });
            });

            return self.lastImgPath;
        }

		
		Facebook.prototype.getLastNMessages = function(n){
            //console.log('Facebook call: getLastNMessages');
            var self = this;
            self.lastMessages = [];

            var current_time = new Date().getTime();

            if(typeof(FB) === "object" && FB._apiKey === null) {
                FB.init({
                    appId      : '454890441191384',
                    //channelUrl : '//localhost://8000/app/channel.html', // Channel File
                    status     : true,
                    cookie     : true,
                    xfbml      : true,
                    oauth      : true
                });
            }

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    FB.api('/me/home?limit=40&until='+current_time, {access_token: response.authResponse.accessToken}, function(response) {
                        var j = 0;
                        if (response.data) {
                            for (var i=0; i<response.data.length; i++) {
                                if (!response.data[i].message) {
                                    continue;
                                }

                                if (j >= n) {
                                    return listMessages;
                                }

                                var msg = new Message();
                                msg.msgContent = response.data[i].message;
                                console.log(msg.msgContent);
                                msg.originalLink = "http://www.facebook.com/"; //TODO changer le lien
                                msg.authorId = response.data[i].from.id;
                                msg.msgId = response.data[i].id;
                                msg.authorName = response.data[i].from.name;
                                msg.msgDate = new Date(response.data[i].created_time).getTime();

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

            return self.lastMessages;
		}

        Facebook.prototype.connect = function(){

            if (!this.isConnected()){
                console.log('Facebook call: connect');

                // si l'id n'existe pas on quitte la fonction
                if (document.getElementById('login-' + this.name) == null) {
                    return;
                }

                document.getElementById('login-' + this.name).innerHTML = "<div id='log-Fb' class='fb-login-button'>Connect with Facebook</div>";

                FB.init({
                    appId      : '454890441191384',
                    //channelUrl : '//localhost://8000/app/channel.html', // Channel File
                    status     : true,
                    cookie     : true,
                    xfbml      : true,
                    oauth      : true
                });

                document.getElementById('log-Fb').addEventListener('click', function() {
                     FB.login(function(response) {
                       if (response.authResponse) {
                         console.log('Welcome!  Fetching your information.... ');
                         FB.api('/me', function(response) {
                           console.log('Good to see you, ' + response.name + '.');
                         });
                       } else {
                         console.log('User cancelled login or did not fully authorize.');
                       }
                     }, {scope: 'email,user_about_me,read_stream,publish_stream'});
                });
            }
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

