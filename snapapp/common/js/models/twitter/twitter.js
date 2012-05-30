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

        var Twitter = function(){
			SNMock.apply(this);
            //list attributes
            this.name = "Twitter";
			this.displayName = "Twitter";
            this.picture = "TwitPic";
            this.icon = 'twittIcon';
            return this;
        }

		Twitter.prototype = new SNMock();
		
        Twitter.prototype.getSNName = function(){
            return "Twitter";
        }
		
		Twitter.prototype.getLastNMessages = function(n){
			var listMessages=new Array();
			for (i=0; i<n; i++) {
				listMessages[i]=new Message();
				listMessages[i].msgContent = "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur";
				listMessages[i].originalLink = "http://twitter.com/?id=000000";
			}
			return listMessages;
		}
		
        return Twitter;
    });

