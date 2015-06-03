// Code goes here

angular.module('MyApp',['ngRoute'])
.config(['$routeProvider',config]);

function config($routeProvider)
{
  var defaultRouteName = '/home';
  var defaultRouteObj = {
    controller: 'HomeCtrl',
    templateUrl: 'home.tpl.html',
    controllerAs: 'homeCtrl'
  };
  $routeProvider
  .when(defaultRouteName,defaultRouteObj)
  .when('/about',{
    controller: 'AboutCtrl',
    templateUrl: 'about.tpl.html',
    controllerAs: 'aboutCtrl'
  })
  .when('/whyilove', {
    controller: 'WhyILoveCtrl',
    templateUrl: 'whyilove.tpl.html',
    controllerAs: 'whyiloveCtrl'
  })
  .otherwise(defaultRouteName,defaultRouteObj);
}