(function() {
    angular.module('class-twitter.service',[])
        .service('classTwitterService', ['$http', classTwitterService]);

    function classTwitterService($http) {

        //var sessionToken = '3d1af5ee-caad-4c52-8537-2a754407edee';
        var sessionToken = '';
        //this.sessionUser = '509Dave16';
        var sessionUser = '';
        var baseUrl = 'http://mean.codingcamp.us:3377';

        this.getSessionUser = function()
        {
            return sessionUser;
        };

        this.isAuthenticated = function()
        {
          if(!sessionToken)
          {
             return false;
          }
            return true;
        };

        this.signup = function (username,password) {
            return $http({
                method: 'POST',
                url: joinPath(baseUrl, 'signup'),
                data : {"username":username,"password":password}
            }).then(function(response){
                    sessionUser = username;
                    sessionToken = response.data.sessionToken;
                    return "success";
                },failure);
        };
        this.login = function (username,password) {
            return $http({
                method: 'POST',
                url: joinPath(baseUrl, 'login'),
                data : {"username":username,"password":password}
            }).then(function(response){
                    sessionUser = username;
                    sessionToken = response.data.sessionToken;
                    return "success";
                }, failure);
        };

        this.getAllTweets = function () {
           return $http({
                method: 'GET',
                url: joinPath(baseUrl, 'tweet')
            }).then(success, failure);
        };

        this.getUserTweets = function (username) {
            return $http({
                method: 'GET',
                url: joinPath(baseUrl, 'tweet',username)
            }).then(success, failure);
        };

        this.createTweet = function (tweet) {
            return $http({
                method: 'POST',
                url: joinPath(baseUrl, 'tweet'),
                headers: {'Authorization': sessionToken},
                data: {"text":tweet}
            }).then(success, failure);
        };

        this.deleteTweet = function (tweetID) {
            return $http({
                method: 'Delete',
                url: joinPath(baseUrl, 'tweet',tweetID),
                headers: {'Authorization': sessionToken}
            }).then(success, failure);
        };

        function success(response) {
            console.log("Success: ", response);
            return response.data;
        }

        function failure(response) {
            console.log("Error: ", response);
            return response.data;
        }

        function joinPath() {
            var path = "";
            var separator = "/";
            for (var argIndex = 0; argIndex < arguments.length; argIndex++) {
                path += arguments[argIndex];
                if (argIndex < (arguments.length - 1)) {
                    path += separator;
                }
            }
            return path;
        }
    }
})();

