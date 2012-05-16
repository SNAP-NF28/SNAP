angular.module('googleplus',['SNMock']).
    factory('Googleplus', function(SNMock) {

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

        var Googleplus = function(){
            var googleplus =  new SNMock();
            //list attributes
            googleplus.name = "Googleplus";
            googleplus.citation = "G+citation"
            return googleplus;
        }
            //init


        Googleplus.prototype.getSNName = function(){
           return "Googleplus";
        }
        return Googleplus;
    });

