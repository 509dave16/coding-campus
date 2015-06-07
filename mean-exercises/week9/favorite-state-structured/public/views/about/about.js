angular.module('favstate.about',['ngRoute'])
    .config(config)
.controller('AboutCtrl',aboutCtrl);

function aboutCtrl()
{
  var scope = this;
  scope.header = "About";
}

function config($routeProvider)
{
  $routeProvider
      .when('/about',{
        controller: 'AboutCtrl',
        templateUrl: 'public/views/about/about.tpl.html',
        controllerAs: 'aboutCtrl'
      });
}