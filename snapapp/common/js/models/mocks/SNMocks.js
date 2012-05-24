angular.module('SNMock',['types']).
    factory('SNMock', function(Message,Profile) {
        var SNMock = function(){
            //init
            this.name = "Mock";
			this.displayName = "Mock";
            this.picture = "MockPic";
            this.icon = 'cacaIcon';
            this.citation = 'Mockcitation';
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
		
		SNMock.prototype.getUserProfile = function(id){
			var profile=new Profile();
			return profile;
		}
        return SNMock;
    });

