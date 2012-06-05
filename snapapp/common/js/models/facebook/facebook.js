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
            return this;
        }
		
		/** Heritage des methodes de la classe SNMock **/
		Facebook.prototype = new SNMock();
		
        /** Surcharge des methodes de la classe SNMock **/
        Facebook.prototype.getSNName = function(){
            return "facebook";
        }

        Facebook.prototype.isConnected = function() {
            if(typeof(FB) === "object" && FB._apiKey === null) {
                return false;
            }

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    console.log('Connected');
                    return true;
                }
            });

            return false;
        }


        Facebook.prototype.init = function() {

            if(typeof(FB) === "object" && FB._apiKey === null) {

                FB.init({
                    appId      : '454890441191384',
                    //channelUrl : '//localhost://8000/app/channel.html', // Channel File
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
                                    alert(profile.imageProfileURL);
                                });

                                var profile = new Profile();


                                profile.name = response.name;
                                profile.firstName = response.first_name;
                                profile.nickName = response.username;
                                //console.log(profile.nickName);

                                //console.log(profile.imageProfileURL);

                                //alert(profile.imageProfileURL);
                                console.log(profile);


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
            var profile = new Profile();

            this.init();

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {

                    FB.api('/me/picture', function(response) {
                        profile.imageProfileURL = response;
                    });

                    FB.api('/me', function(response) {

                        //console.log('your name, ' + response.name + '.');

                        profile.name = response.name;
                        profile.firstName = response.first_name;
                        profile.nickName = response.username;
                        //console.log(profile.nickName);

                        //console.log(profile.imageProfileURL );

                        console.log(profile);

                        return profile;
                    });

                } else {
                    console.log('no profile because no auth');
                }
            });

            if (profile.name == null) {
                var profile=new Profile();
                return profile;
            }

            return profile;
        }

		
		Facebook.prototype.getLastNMessages = function(n){
            var listMessages=new Array();
            var self = this;

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
                    FB.api('/me/home', {access_token: response.authResponse.accessToken}, function(response) {
                        var j = 0;
                        for (var i=0; i<response.data.length; i++) {
                            if (!response.data[i].message) {
                                continue;
                            }

                            if (j >= n) {
                                return listMessages;
                            }

                            console.log('msg: ' + response.data[i].message);
                            var msg = new Message();
                            msg.msgContent = response.data[i].message;
                            msg.originalLink = "http://www.facebook.com/"; //TODO changer le lien
                            msg.authorId = response.data[i].from.id;
							msg.msgId = response.data[i].id;
                            msg.authorName = response.data[i].from.name;

                            msg.msgDate = new Date(response.data[i].created_time).getTime();

                            listMessages[j] = msg;
                            j++;
                            console.log('id: ' + i + ' - ' + msg.msgContent);
                        }

                        return listMessages;
                    });

                } else {
                    console.log('no Auth');
                    for (i=0; i<n; i++) {
                        var msg = new Message();
                        msg.msgContent = "YO SWAAAAAG lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem.";
                        msg.originalLink = "http://www.facebook.com/";
                        msg.msgDate = 111; //stockez la date sous forme de seconde depuis un rep�re que vous choisirez, je pourrais comparer facilement comme �a. -Charles
                        msg.msgId = "abc123";
						listMessages[i] = msg;
                    }

                    console.log('nbMsg: ' + listMessages.length);

                    return listMessages;
                }
            });

            return listMessages;
		}

        Facebook.prototype.connect = function(){

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
                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        FB.api('/me', function(response) {
                            console.log('Good to see you, ' + response.name + '.');
                            console.log('Your email address, ' + response.email + '.');
                            //window.location.reload();
                        });
                    } else if (response.status === 'not_authorized') {
                        console.log("No auth");
                    } else {
                        console.log("No auth");
                    }
                });
            });

            return ; //Must return connection object?
        }
		
        return Facebook;
    });

