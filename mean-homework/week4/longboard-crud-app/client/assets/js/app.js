(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
    .controller('MainController', mainController)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

  function mainController($http) 
  {
    var scope = this;
    scope.apiUrl = "http://mean.codingcamp.us:8888/509Dave16/";
    
    var onError = function(reason)
    {
      scope.error = "Could not act on the longboard resource using the Longboard API !";
      console.log(reason);
    };
    
    function findLongboardIndex(id)
    {
      var foundIndex = -1;
      for(var index = 0; index < scope.longboards.length; index++)
      {
          var longboard = scope.longboards[index];
          if(longboard['_id'] === id)
          {
            foundIndex = index;
            break;
          }
      }
      return foundIndex;
    }

    //only fire on load
    var getLongboards = function()
    {        
        $http.get(scope.apiUrl + "longboards").then
        (
          function(response)
          {
            scope.longboards = response.data;
          },
          onError
        );
    };

    scope.updateLongboard = function(longboard)
    {
        var id = longboard['_id'];
        console.log(id);
        $http.put(scope.apiUrl + "longboard/" + id, longboard ).then
        (
          function(response)
          {
            console.log(response.data);
          },
          onError
        );
    };

    scope.deleteLongboard = function(longboardIndex)
    {
        console.log(longboardIndex);
        //var longboardIndex = findLongboardIndex(id);
        // scope.longboards.splice(longboardIndex,1);
        // $http.delete(scope.apiUrl + "longboard/" + id).then
        // (
        //   function(response)
        //   {
        //     console.log(response.data);
        //   },
        //   onError
        // );
    };

    //need scope object to hold data
    scope.createLongboard = function()
    {
        $http.post(scope.apiUrl + "longboard", longboard ).then
        (
          function(response)
          {
            console.log(response.data);
          },
          onError
        );
    }
    getLongboards();
  }

})();
