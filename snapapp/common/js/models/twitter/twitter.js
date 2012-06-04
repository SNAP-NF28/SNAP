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
            this.profile = new Profile();
            return this;
        }
		
		/** Heritage des methodes de la classe SNMock **/
		Twitter.prototype = new SNMock();
		
		/** Surcharge des methodes de la classe SNMock **/
        Twitter.prototype.getSNName = function(){
            return "Twitter";
        }
		
		Twitter.prototype.getLastNMessages = function(n){


            var msgList = [];

            var data = {
                q:'mellealizee',
                rpp:n
            };

            var callback = function(data){
                var m;
                msgList.length = 0;
                for(m in data.results){
                    var r = data.results[m];
                    var message = new Message();
                    message.socialNetworkId = this.id;
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
                    msgList.push(message);
                }
                return msgList;
            }

            $.ajax({
                  url: 'http://search.twitter.com/search.json',
                  data: data,
                  dataType: 'jsonp',
                  success: callback
                });

			var listMessages=new Array();
			for (i=0; i<n; i++) {
				var msg = new Message();
				msg.msgContent = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur";
				msg.originalLink = "http://twitter.com/?id=000000";
				msg.msgDate = 300; //stockez la date sous forme de seconde depuis un repère que vous choisirez, je pourrais comparer facilement comme ça. -Charles
				msg.msgId = "ghi789";
				listMessages[i] = msg;
			}
			return msgList;
		}

        Twitter.prototype.getUserProfile = function(id){
            return this.profile;
        }

        function updateUsrProfile(usr){
            this.profile.socialNetworkId = this.id;
            this.profile.imageProfileURL = usr.profileImageUrl;
            this.profile.name = usr.screenName;
            this.profile.description = usr.description;
            this.profile.lifePlace = usr.location;
            this.profile.followersNb = usr.followersCount;
            this.profile.followsNb = usr.friendsCount;
            this.profile.msgCount = usr.statusesCount;
            this.profile.subscriptionDate = usr.createdAt;
            $("#login-Twitter").addClass("hide");
            this.getLastNMessages(20);//FIXME: handle vary problem
        }

        Twitter.prototype.connect = function(){

            //FIXME: Set proper callback url
            //twttr.anywhere.config({ callbackURL: "http://www.yoursite.com/anywhere-complete" });
            twttr.anywhere(function (T) {
                if (T.isConnected()) {
                    usr = T.currentUser;
                    updateUsrProfile(usr);
                } else
                if(!this.connectAlreadyCalled){ //FIXME: Ugly Ugly Ugly hack
                    this.connectAlreadyCalled = true;
                    twttr.anywhere(function (T) {
                    T("#login-Twitter").connectButton({ //Fixme: use Twitter.name
                      authComplete: function(usr) {
                        // triggered when auth completed successfully
                        updateUsrProfile(usr);
                        console.log("You rock baby");
                      },
                      signOut: function() {
                        // triggered when user logs out
                        console.log("You suck baby");
                      }
                    });
                  });
                }
            });

            return ; //Must return connection object?
        }
		
        return Twitter;
    });

