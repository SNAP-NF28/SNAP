angular.module('facebook',['SNMock']).
    factory('Facebook', function(SNMock) {

        /**
         * Class Description
         *
         * @type Facebook
         * @class
         *
         * Constructor Description
         *
         * @this {Facebook}
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

        var Facebook = function(){
            var facebook =  new SNMock();
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

