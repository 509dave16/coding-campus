angular.module('class-twitter.login-signup',['ngRoute','class-twitter.service'])
    .config(config)
    .controller('LoginSignupCtrl',['$location','classTwitterService',loginSignupCtrl]);

function config($routeProvider)
{
    $routeProvider
        .when('/login-signup',
        {
            controller:"LoginSignupCtrl",
            templateUrl: "views/login-signup/login-signup.tpl.html",
            controllerAs:"loginSignupCtrl"
        });

}

function loginSignupCtrl($location,classTwitterService)
{
    var scope = this;
    scope.tweets = [];
    scope.displayTweets = function()
    {
        if($routeParams.username)
        {
            classTwitterService.getUserTweets($routeParams.username).then(onGetTweets, onError);
        }
        else
        {
            classTwitterService.getAllTweets().then(onGetTweets, onError);
        }

    };
    scope.displayTweets();

    function onGetTweets(tweets)
    {
        scope.tweets = tweets;
    }

    function onError(error)
    {

    }
}