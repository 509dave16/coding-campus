// Code goes here

angular.module('MyApp',['ngRoute'])
.config(['$routeProvider',config]);

function config($routeProvider)
{
  $routeProvider
  .when('/main',{
    controller: 'MainCtrl',
    templateUrl: 'main.tpl.html',
    controllerAs: 'mainCtrl'
  })
  .when('/about',{
    controller: 'AboutCtrl',
    templateUrl: 'about.tpl.html',
    controllerAs: 'aboutCtrl'
  })
  .otherwise('/main',{
    controller: 'MainCtrl',
    templateUrl: 'main.tpl.html',
    controllerAs: 'mainCtrl'
  });
}