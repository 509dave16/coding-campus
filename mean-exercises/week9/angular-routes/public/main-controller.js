angular.module('MyApp')
.controller('MainCtrl',mainCtrl);

function mainCtrl()
{
  var scope = this;
  scope.page = "Main";
}