angular.module('MyApp')
.controller('AboutCtrl',aboutCtrl);

function aboutCtrl()
{
  var scope = this;
  scope.page = "About";
}