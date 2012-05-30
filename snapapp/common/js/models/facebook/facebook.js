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

		 // Heritage :  http://livingmachines.net/2009/02/creating-javascript-classes-part-2-property-inheritance-with-screencast/ 
        Facebook = function(){
            SNMock.apply(this);
            //list attributes
            this.name = "Facebook";
			this.displayName = "Facebook";
            return this;
        }
		
		Facebook.prototype = new SNMock();
		
        //List methods
        Facebook.prototype.getSNName = function(){
            return "facebook";
        }
		
		Facebook.prototype.getLastNMessages = function(n){
			var listMessages=new Array();
			for (i=0; i<n; i++) {
				var msg = new Message();
				msg.msgContent = "YO SWAAAAAG lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem.";
				msg.originalLink = "http://www.facebook.com/";
				listMessages[i] = msg;
			}
			return listMessages;
		}
		
        return Facebook;
    });

