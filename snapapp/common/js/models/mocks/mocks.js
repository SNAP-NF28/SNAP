angular.module('mocks',[]).
    factory('Mock', function() {
        var Mock = function(){
            //init
            this.name = "Mock";
            this.picture = "MockPic";
            this.icon = 'cacaIcon';
            this.citation = 'Mockcitation';
        };

        Mock.prototype.getSNName = function(){
            return "Mock";
        }
        return Mock;
    });


