angular.module('googleplus',['SNMock']).
    factory('Googleplus', function(SNMock,Message,Profile) {

        /**
         * Class Description
         *
         * @type Googleplus
         * @class
         *
         * Constructor Description
         *
         * @this {Googleplus}
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

        var Googleplus = function(){
            SNMock.apply(this);
            //list attributes
            this.name = "Googleplus";
			this.displayName = "Google+";
            this.citation = "G+citation"
            return this;
        }
            //init

		Googleplus.prototype = new SNMock();
			
        Googleplus.prototype.getSNName = function(){
           return "Googleplus";
        }
		
		Googleplus.prototype.getLastNMessages = function(n){
			var listMessages=new Array();
			for (i=0; i<n; i++) {
				listMessages[i]=new Message();
				listMessages[i].msgContent = "Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur";
				listMessages[i].originalLink = "http://plus.google.com";
			}
			return listMessages;
		}
		
        return Googleplus;
    });

