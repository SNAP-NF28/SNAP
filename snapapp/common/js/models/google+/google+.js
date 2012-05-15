angular.module('googleplus',['mocks']).
    factory('Googleplus', function(Mock) {
        var Googleplus = function(){
            var googleplus =  new Mock();
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

