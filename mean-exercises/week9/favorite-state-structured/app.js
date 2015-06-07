// Code goes here

angular.module('favstate',['ngRoute','favstate.home','favstate.about','favstate.whyilove','favstate.checkout'])
.config(['$routeProvider',config]);

function config($routeProvider)
{
  $routeProvider
  .when('/', {redirectTo:'/home'})
      .otherwise({redirectTo:'/'});
}