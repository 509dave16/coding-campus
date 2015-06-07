/**
 * Created by rise4031 on 6/6/15.
 */
angular.module('class-twitter',['ngMaterial','ngRoute','loginService','class-twitter.service','class-twitter.myfeed','class-twitter.myaccount','class-twitter.login-signup'])
    .config(config);

function config($routeProvider,loginServiceProvider)
{
    loginServiceProvider.setLoginRoute('/login-signup');
    $routeProvider
        .when('/', {redirectTo:'/myfeed/:username?'})
        .otherwise({redirectTo:'/'});
}


