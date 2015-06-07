
angular.module('class-twitter.myfeed',['ngRoute','class-twitter.service','loginService'])
    .config(config)
    .controller('MyFeedCtrl',['$location','$routeParams','classTwitterService','loginService',myFeedCtrl]);

function config($routeProvider)
{
    $routeProvider
        .when('/myfeed/:username?',
        {
            controller:"MyFeedCtrl",
            templateUrl: "views/myfeed/myfeed.tpl.html",
            controllerAs:"myFeedCtrl"
        });

}

function myFeedCtrl($location,$routeParams,classTwitterService, loginService) {
    if(!classTwitterService.isAuthenticated())
    {
        loginService.goToLogin();
    }
    else
    {
        var onGetTweets = function(tweets)
        {
            scope.tweets = tweets;
        };

        var onError = function(error)
        {

        };
        var scope = this;
        scope.tweets = [];
        scope.displayTweets = function () {
            if ($routeParams.username) {
                classTwitterService.getUserTweets($routeParams.username).then(onGetTweets, onError);
            }
            else {
                classTwitterService.getAllTweets().then(onGetTweets, onError);
            }

        };
        scope.displayTweets();


    }
}


