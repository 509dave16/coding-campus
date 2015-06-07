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
    scope.username = "";
    scope.password = "";
    scope.errorStatus = "";

    scope.login = function()
    {
      classTwitterService.login(scope.username,scope.password).then(onLoginSignup,onError);
    };

    scope.signup = function()
    {
        classTwitterService.signup(scope.username,scope.password).then(onLoginSignup,onError);
    };

    function onLoginSignup(status)
    {
        $location.path('/myfeed');
    }

    function onError(status)
    {
        scope.errorStatus = status;
    }
}