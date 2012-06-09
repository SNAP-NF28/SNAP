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
            this.connected = false;
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
            if(!self.lastMessages) {
			//	console.log("nothing !!");
              self.lastMessages = [];
			}
			/*else {
			
				console.log("something with a size of " + self.lastMessages.length);
				for (var j = 0; j < self.lastMessages.length; j++)
					console.log ("bouh " + self.lastMessages[j].msgContent);
			}
			
			console.log("pending....");*/
            twttr.anywhere(function (T) {
                if (T.isConnected()) {
                    usr = T.currentUser;
                    self.doGetMessages(self, usr, n);
					console.log("messages fetched !");
                }
				else {
				//console.log("not connected :/");
				}
            });
			//console.log("done");
			/*
			 if(!self.lastMessages) {
				console.log("nothing 2 !!");
			}
			else {
			
				console.log("2 something with a size of " + self.lastMessages.length);
				for (var j = 0; j < self.lastMessages.length; j++)
					console.log ("bouh 2 " + self.lastMessages[j].msgContent);
			}*/
			return self.lastMessages;
		}

        Twitter.prototype.getUserProfile = function(id){
            return this.profile;
        }

        Twitter.prototype.doGetMessages = function(self, usr, n){
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

                    usr.homeTimeline({
                        count:n,
                        success: function(data){
                              var m;
                              if(self.lastMessages)
                                self.lastMessages.length = 0;
                              else
                                self.lastMessages = [];
                              for(m in data.array){
                                  var r = data.array[m];
                                  var message = new Message();
                                  message.socialNetworkId = self.id;
                                  message.msgId = r.id;
                                  message.authorId = r.user.id;
                                  message.msgContent = r.text;
                                  message.originalLink = r.source; //TODO: parse using regex
                                  message.msgDate = new Date(r.createdAt).getTime();
                                  message.authorImg = r.user.profileImageUrl;
                                  message.authorName = r.user.name;
								  message.socialNetworkId = "twitter";
                                  //message.mediaList; //TODO: handle media list
                                  //message.localization;
                                  //message.replyTo;
                                  self.lastMessages.push(message);
                              }
                              if(self.lastMessages.length > 0){
                                console.log("Messages grabbed from twitter.");
                                angular.element(document).scope().$apply(null); // force refresh view
                              }
                              return self.lastMessages;
                          }
                        });
                        console.log("You rock baby");
        }

        Twitter.prototype.connect = function(){
            var self = this;
            //FIXME: Set proper callback url
            //twttr.anywhere.config({ callbackURL: "http://localhost:5000/snapapp/desktop/index.html" });

            twttr.anywhere(function (T) {
                if(!self.connectAlreadyCalled){ //FIXME: Ugly Ugly Ugly hack
                    self.connectAlreadyCalled = true;
                    twttr.anywhere(function (T) {
                    T("#login-Twitter").connectButton({ //Fixme: use Twitter.name
                      authComplete: function(usr) {
                        // triggered when auth completed successfully
                        self.doGetMessages(self, usr, 20);
                        self.connected = true;
                      },
                      signOut: function() {
                        // triggered when user logs out
                        console.log("You suck baby");
                      }
                    });
                });
              }
            });
        }

        return Twitter;
    });
