angular.module('MyApp')
.controller('HomeCtrl',homeCtrl);

function homeCtrl()
{
  var scope = this;
  scope.header = "Washington";
  scope.stateImg = "http://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Washington.svg/1280px-Flag_of_Washington.svg.png";
}