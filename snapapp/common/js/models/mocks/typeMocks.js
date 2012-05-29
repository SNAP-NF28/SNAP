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
			this.imageProfileURL = "https://twimg0-a.akamaihd.net/profile_images/1126933087/fef61c23219a521010627333af7bbadd9c398dd770e4978facb12c666b2be326e56f045cfull.jpg";
			this.name = "Charles";

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

	