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
            this.miniIcon = "/snapapp/common/img/logo_twitter_20x20.png";
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
          var self = this;
          if(!self.lastMessages) {
            self.lastMessages = [];
	        }

          if(self.lastMessages.length > 0)
            return self.lastMessages;

          twttr.anywhere(function (T) {
            if (T.isConnected()) {
              usr = T.currentUser;
              self.doGetMessages(self, usr, n);
              console.log("messages fetched !");
            }
            console.log("not connected :/");
		      });
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

        Twitter.prototype.sendMessage = function(text){

          $(document.body).append('<div id="tbox"></div>');

          twttr.anywhere(function (T) {
            T("#tbox").tweetBox({
              //height: 0,
              //width: 0,
              defaultContent: text,
              counter: false,
              label: "",
              onTweet: function(){
                $('#tbox').html(""); // delete the tbox :)
              }
            });
          });
          
          //FIXME: Rooooho : SoooOOoOOoOOOOo Ugly Hack :'(
          setTimeout("var iframe = $('iframe'); var tweetBoxBtn = $('#tweeting-button', iframe.contents()); if(tweetBoxBtn){tweetBoxBtn.click();console.log('Tweet Sent!');$('#tbox').remove();}", 250);

          return true;
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
