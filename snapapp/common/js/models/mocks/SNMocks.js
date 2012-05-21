angular.module('SNMock',[]).
    factory('SNMock', function() {
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
        return SNMock;
    });

