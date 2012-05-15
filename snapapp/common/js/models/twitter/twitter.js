angular.module('twitter',['mocks']).
    factory('Twitter', function(Mock) {
        var Twitter = function(){
            var twitter =  new Mock();
            //list attributes
            twitter.name = "Twitter";
            twitter.picture = "TwitPic";
            twitter.icon = 'twittIcon';
            return twitter;
        }

        Twitter.prototype.getSNName = function(){
            return "Twitter";
        }
        return Twitter;
    });

