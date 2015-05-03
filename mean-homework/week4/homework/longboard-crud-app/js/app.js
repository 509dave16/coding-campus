angular.module('longboard-crud-app',[])
.controller('MainController', function($http) {
    var scope = this;
    
    var onError = function(reason)
    {
      scope.error = "Could not fetch the longboards from the Longboard API !";
    };
    
    var getLongboards = function()
    {        
        $http.get("http://mean.codingcamp.us:8888/509Dave16/longboards").then(
          function(response)
          {
            scope.longboards = response.data;
          },
          onError
        );
    };
    getLongboards();
});
