angular.module('twitter',['SNMock']).
    factory('Twitter', function(SNMock,Message,Profile) {

        /**
         * Class Description
         *
         * @type Twitter
         * @class
         *
         * Constructor Description
         *
         * @this {Twitter}
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
        var Twitter = function(){
            SNMock.apply(this);
            //list attributes
            this.name = "Twitter";
            this.id = 'twitter';
            this.displayName = "Twitter";
            this.picture = "TwitPic";
            this.icon = "/snapapp/common/img/logo_twitter_60x60.png";
			      this.limitChar = 140;
            this.lastMessages = [];
            return this;
        }

        /** Heritage des methodes de la classe SNMock **/
        Twitter.prototype = new SNMock();

        /** Surcharge des methodes de la classe SNMock **/
        Twitter.prototype.getSNName = function(){
            return "Twitter";
        }

        Twitter.prototype.getLastNMessages = function(n){


            //alert("This function should not be called");

            var self = this;
            self.lastMessages = [];

            twttr.anywhere(function (T) {
                if (T.isConnected()) {
                    usr = T.currentUser;
                    self.profile = new Profile();
                    self.profile.socialNetworkId = self.id;
                    self.profile.imageProfileURL = usr.profileImageUrl;
                    self.profile.name = usr.screenName;
                    self.profile.description = usr.description;
                    self.profile.lifePlace = usr.location;
                    self.profile.followersNb = usr.followersCount;
                    self.profile.followsNb = usr.friendsCount;
                    self.profile.msgCount = usr.statusesCount;
                    self.profile.subscriptionDate = usr.createdAt;
                    $("#login-Twitter").addClass("hide");
                    //self.getLastNMessages(20);//FIXME: handle vary problem
                }
            });

            var name;
            if(!self.profile || !self.profile.name){
                name = 'mellealizee';//return;
            } else {
                name = self.profile.name;
            }
            var data = {
                q:name,
                rpp:n
            };

            var callback = function(data){
                var m;
                self.lastMessages.length = 0;
                for(m in data.results){
                    var r = data.results[m];
                    var message = new Message();
                    message.socialNetworkId = self.id;
                    message.msgId = r.id;
                    message.authorId = r.to_user_id_str;
                    message.msgContent = r.text;
                    message.originalLink = r.source; //TODO: parse using regex
                    message.msgDate = r.created_at;
                    message.authorImg = r.profile_image_url;
                    message.authorName = r.from_user_name;
                    //message.mediaList; //TODO: handle media list
                    //message.localization;
                    //message.replyTo;
                    self.lastMessages.push(message);
                }
                return self.lastMessages;
            }

            $.ajax({
                url: 'http://search.twitter.com/search.json',
                data: data,
                dataType: 'jsonp',
                success: callback
            });
			return self.lastMessages;
		}

        Twitter.prototype.getUserProfile = function(id){
            return this.profile;
        }

        function updateUsrProfile(usr){


        }

        Twitter.prototype.connect = function(){
            var self = this;
            //FIXME: Set proper callback url
            //twttr.anywhere.config({ callbackURL: "http://localhost:5000/snapapp/desktop/index.html" });

            twttr.anywhere(function (T) {
                if (T.isConnected()) {
                    usr = T.currentUser;
                    updateUsrProfile(usr);
                    self.lastMessages = self.getLastNMessages(20);//FIXME: handle vary problem
                } else
                if(!self.connectAlreadyCalled){ //FIXME: Ugly Ugly Ugly hack
                    self.connectAlreadyCalled = true;
                    twttr.anywhere(function (T) {
                    T("#login-Twitter").connectButton({ //Fixme: use Twitter.name
                      authComplete: function(usr) {
                        // triggered when auth completed successfully
                        self.lastMessages = self.getLastNMessages(20);
                        console.log("You rock baby");
                      },
                      signOut: function() {
                        // triggered when user logs out
                        console.log("You suck baby");
                      }
                    });
                }
            });

            return ; //Must return connection object?
        }

        return Twitter;
    });
