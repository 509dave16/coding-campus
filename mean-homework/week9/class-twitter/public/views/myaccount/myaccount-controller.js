
angular.module('class-twitter.myaccount',['ngRoute','class-twitter.service','loginService'])
    .config(config)
    .controller('MyAccountCtrl',['$location','classTwitterService','loginService',myAccountCtrl]);

function config($routeProvider)
{
    $routeProvider
        .when('/myaccount',
        {
            controller:"MyAccountCtrl",
            templateUrl: "views/myaccount/myaccount.tpl.html",
            controllerAs:"myAccountCtrl"
        });

}

function myAccountCtrl($location,classTwitterService,loginService)
{
    if(!classTwitterService.isAuthenticated())
    {
        loginService.goToLogin();
    }
    else {
        var onGetTweets = function(tweets) {
            scope.tweets = tweets;
        };

        var onCreateTweet = function(tweet) {
            scope.tweets.push(tweet);
            scope.enteredTweet = "";
        };

        var onError = function(error) {

        };
        var scope = this;
        scope.tweets = [];
        scope.enteredTweet = "";

        scope.displayTweets = function () {
            var username = classTwitterService.getSessionUser();
            classTwitterService.getUserTweets(username).then(onGetTweets, onError);
        };
        scope.displayTweets();

        scope.createTweet = function () {
            classTwitterService.createTweet(scope.enteredTweet).then(onCreateTweet, onError);
        };

        scope.deleteTweet = function (tweetIndex) {
            var tweet = scope.tweets[tweetIndex];
            var tweetID = tweet._id;

            classTwitterService.deleteTweet(tweetID).then(function (successMessage) {
                scope.tweets.splice(tweetIndex, 1);
            }, onError);
        };
    }
}