angular.module('SNMock',['types']).
    factory('SNMock', function(Message,Profile) {
        var SNMock = function(){
            //init
            this.name = "Mock";
			this.displayName = "Mock";
            this.picture = "MockPic";
            this.icon = 'cacaIcon';
			this.miniIcon = 'cacaIcon';
            this.citation = 'Mockcitation';
			this.limitChar = "-1";
        };

        SNMock.prototype.getSNName = function(){
            return "Mock";
        }
		
		SNMock.prototype.getLastNMessages = function(n){
			var listMessages=new Array();
			for (i=0; i<n; i++) {
				listMessages[i]=new Message();
			}
			return listMessages;
		}
		
		SNMock.prototype.getUserProfile = function(){
			var profile=new Profile();
			return profile;
		}

        SNMock.prototype.isConnected = function(){
            return true; //Must return connection object?
        }

        SNMock.prototype.sendMessage = function(){
            return ; //Must return connection object?
        }


        SNMock.prototype.connect = function(){
			return ; //Must return connection object?
		}

        return SNMock;
    });

