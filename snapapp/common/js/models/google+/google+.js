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

		 /** Heritage des attributs de la classe SNMock **/
        var Googleplus = function(){
            SNMock.apply(this);
            //list attributes
            this.name = "Googleplus";
			this.displayName = "Google+";
            this.citation = "G+citation";
			this.icon = "/snapapp/common/img/logo_googlePlus_60x60.png";
            return this;
        }

		/** Heritage des methodes de la classe SNMock **/
		Googleplus.prototype = new SNMock();
			
		/** Surcharge des methodes de la classe SNMock **/	
        Googleplus.prototype.getSNName = function(){
           return "Googleplus";
        }
		
		Googleplus.prototype.getLastNMessages = function(n){
			var listMessages=new Array();
			for (i=0; i<n; i++) {
				listMessages[i]=new Message();
				listMessages[i].msgContent = "Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur";
				listMessages[i].originalLink = "http://plus.google.com";
				msg.msgDate = 200; //stockez la date sous forme de seconde depuis un repère que vous choisirez, je pourrais comparer facilement comme ça. -Charles
			}
			return listMessages;
		}
		
        return Googleplus;
    });

