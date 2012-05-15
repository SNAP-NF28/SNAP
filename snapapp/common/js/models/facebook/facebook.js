angular.module('facebook',['mocks']).
    factory('Facebook', function(Mock) {
        var Facebook = function(){
            var facebook =  new Mock();
            //list attributes
            facebook.name = "Facebook";
            return facebook;
        }



        //List methods
        Facebook.prototype.getSNName = function(){
            return "facebook";
        }
        return Facebook;
    });
