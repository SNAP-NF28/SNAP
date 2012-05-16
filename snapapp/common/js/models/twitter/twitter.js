angular.module('twitter',['SNMock']).
    factory('Twitter', function(SNMock) {

        /**
         * Class Description
         *
         * @type Twitter
         * @class
         *
         * Constructor Description
         *
         * @this {Twitter}
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

        var Twitter = function(){
            var twitter =  new SNMock();
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

