angular.module('SNMock',['types']).
    factory('SNMock', function(Message) {
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
        return SNMock;
    });

