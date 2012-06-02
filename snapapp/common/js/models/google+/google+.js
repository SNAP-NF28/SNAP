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
			this.limitChar = 200;
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
				var msg = new Message();
				msg.msgContent = "Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur";
				msg.originalLink = "http://plus.google.com";
				msg.msgDate = 200; //stockez la date sous forme de seconde depuis un repere que vous choisirez, je pourrais comparer facilement comme �a. -Charles
				msg.msgId = "def456";
				
				listMessages[i] = msg;
			}
			return listMessages;
		}

        Googleplus.prototype.connect = function(){

            // si l'id n'existe pas on quitte la fonction
            if (document.getElementById('login-' + this.name) == null) {
                return;
            }


            document.getElementById('login-' + this.name).innerHTML = "<div><button id='log-G' class='buttons action'>Connect with Google+</button><br/><br/></div>";

            document.getElementById('log-G').addEventListener('click', function() {
                var config = {
                    'client_id': '331376332087',
                    'scope': 'https://www.googleapis.com/auth/plus.me'
                };
                gapi.auth.authorize(config, function() {
                    console.log('login complete');
                    console.log(gapi.auth.getToken());
                });
            });

            return;
        }


        return Googleplus;
    });

