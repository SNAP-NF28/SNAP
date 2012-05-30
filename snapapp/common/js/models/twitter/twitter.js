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
			this.displayName = "Twitter";
            this.picture = "TwitPic";
            this.icon = "/snapapp/common/img/logo_twitter_60x60.png";
            return this;
        }
		
		/** Heritage des methodes de la classe SNMock **/
		Twitter.prototype = new SNMock();
		
		/** Surcharge des methodes de la classe SNMock **/
        Twitter.prototype.getSNName = function(){
            return "Twitter";
        }
		
		Twitter.prototype.getLastNMessages = function(n){
			var listMessages=new Array();
			for (i=0; i<n; i++) {
				listMessages[i]=new Message();
				listMessages[i].msgContent = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur";
				listMessages[i].originalLink = "http://twitter.com/?id=000000";
				msg.date = 300; //stockez la date sous forme de seconde depuis un repère que vous choisirez, je pourrais comparer facilement comme ça. -Charles
			}
			return listMessages;
		}

        Twitter.prototype.connect = function(){

            //FIXME: Set proper callback url
            //twttr.anywhere.config({ callbackURL: "http://www.yoursite.com/anywhere-complete" });

            if(!this.connectAlreadyCalled){ //FIXME: Ugly Ugly Ugly hack
                this.connectAlreadyCalled = true;
                twttr.anywhere(function (T) {
                T("#login-Twitter").connectButton({ //Fixme: use Twitter.name
                  authComplete: function(user) {
                    // triggered when auth completed successfully
                    console.log("You rock baby");
                  },
                  signOut: function() {
                    // triggered when user logs out
                    console.log("You suck baby");
                  }
                });
              });
            }
            return ; //Must return connection object?
        }
		
        return Twitter;
    });

