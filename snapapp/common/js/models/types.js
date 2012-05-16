angular.module('types',['typeMocks']).
    factory('Message', function(MessageMock) {

        /**
         * Class Description
         *
         * @type Message
         * @class  Instance of a generic Message (ex: twit, facebook post, etc.)
         *
         * Constructor Description
         *
         * @this {Message}
         * @description Basic constructor
         *
         * Attributes
         *
         * @property socialNetworkId source network
         * @property msgId message unique identifier
         * @property authorId message author
         * @property msgContent message content
         * @property originalLink html link to the original message
         * @property msgDate Date of post
         * @property mediaList List of media, attached to the message
         * @property localization geo-localization
         * @property replyTo If this message responds to another message
         */

        var Message = function(){
            var message =  new MessageMock();
            // /list attributes
            message.socialNetworkId;
            message.msgId;
            message.authorId;
            message.msgContent;
            message.originalLink;
            message.msgDate;
            message.mediaList;
            message.localization;
            message.replyTo;
            return message;
        }

        return Message;
    }).
    factory('Profile', function(ProfileMock) {

        /**
         * Class Description
         *
         * @type Profile
         * @class  Contains a use profile (relative to a social network)
         *
         * Constructor Description
         *
         * @this {Profile}
         * @description Basic constructor
         *
         * Attributes
         *
         * @property socialNetworkId social network where this profile comes from
         * //@property profileID ID du profil
         * @property name user name
         * @property firstName
         * @property nickName
         * @property description profile description
         * @property birthPlace
         * @property birthDate
         * @property lifePlace
         * @property workPlace
         * @property friendNb friends count
         * @property followersNb Followers count
         * @property followsNbFollows count
         * @property msgCount total message sent
         * @property subscriptionDate
         */

        var Profile = function(){
            var profile =  new ProfileMock();
            // /list attributes
            profile.socialNetworkId;
            profile.name;
            profile.firstName;
            profile.nickName;
            profile.description;
            profile.birthPlace;
            profile.birthDate;
            profile.lifePlace;
            profile.workPlace;
            profile.friendNb;
            profile.followersNb;
            profile.followsNb;
            profile.msgCount;
            profile.subscriptionDate;
            //End attributes
            return profile;
        }

        return Profile;
    }).
    factory('Search', function(SearchMock) {

        /**
         * Class Description
         *
         * @type Search
         * @class  Search query sent to social networks
         *
         * Constructor Description
         *
         * @this {Search}
         * @description
         *
         * Attributes
         *
         * @property searchType type of search
         * @property searchText
         * @property startDate Lower date bound
         * @property endDate upper date bound
         * //@property networks
         *
         */

        var Search = function(){
            var search =  new SearchMock();
            // /list attributes
            search.searchType;
            search.searchText;
            search.startDate;
            search.endDate;
            //search.networks; //TOCHECK : Useless?
            //End attributes
            return search;
        }

        return Search;
    }).
    factory('SearchResult', function(SearchResultMock) {

        /**
         * Class Description
         *
         * @type SearchResult
         * @class
         *
         * Constructor Description
         *
         * @this {ResultSearch}
         * @description C
         *
         * Attributes
         *
         * @property searchType
         * @property resultContent
         *
         */

        var SearchResult = function(){
            var searchResult =  new SearchResultMock();
            // /list attributes
            searchResult.searchType;
            searchResult.resultContent;
            //End attributes
            return searchResult;
        }

        return SearchResult;
    });