angular.module('favstate.home',['ngRoute'])
    .config(config)
    .controller('HomeCtrl',homeCtrl);


function homeCtrl($location)
{
  var scope = this;
  scope.header = "Washington";
  scope.stateImg = "http://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Washington.svg/1280px-Flag_of_Washington.svg.png";
    scope.homeButtonClicked = function()
    {
        $location.path('/checkout');
    };
}
function config($routeProvider) {
  $routeProvider
      .when('/home', {
        controller: 'HomeCtrl',
        templateUrl: 'public/views/home/home.tpl.html',
        controllerAs: 'homeCtrl'
      });
}