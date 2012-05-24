angular.module('typeMocks',[]).
factory('MessageMock', function() {
    var MessageMock = function(){
		this.msgContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in purus vestibulum elit pretium pretium quis nec urna. Morbi facilisis nullam.";
		this.originalLink = "http://twitter.com/?id=000000";
    };

    return MessageMock;
}).
    factory('ProfileMock', function() {
        var ProfileMock = function(){
		
            //init

        };

        return ProfileMock;
    }).
    factory('SearchMock', function() {
        var SearchMock = function(){
            //init

        };

        return SearchMock;
    }).
    factory('SearchResultMock', function() {
        var SearchResultMock = function(){
            //init

        };

        return SearchResultMock;
    });