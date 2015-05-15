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
    .controller('MainController', ['$http',mainController])
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider','$httpProvider'];

  function config($urlProvider, $locationProvider, $httpProvider) {
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
    scope.apiUrl = "http://localhost:8080/";
    scope.longboardImages = [];
    scope.tempLongboardImage = {brandName:"",bottomImage:"",topImage:""};
    scope.tempLongboard = {};
    scope.tempLongboardIndex = -1;

    function copyObjectProperties(objectFrom,objectTo)
    {
      for(var property in objectFrom)
      {
         objectTo[property] = objectFrom[property];
      }
    }

    var onError = function(reason)
    {
      console.log(reason);
    };

    scope.resetTempLongboard = function()
    {
        scope.tempLongboard = {};
        scope.tempLongboardImage = {};
        scope.tempLongboardIndex = -1;
    }

    scope.copyLongboard = function(longboardIndex)
    {
        var longboard= scope.longboards[longboardIndex];
        copyObjectProperties(longboard, scope.tempLongboard);
        scope.tempLongboardIndex = longboardIndex;
        scope.tempLongboardImage.topImage = longboard.top_img_url;
        scope.tempLongboardImage.bottomImage = longboard.bottom_img_url;
    };
    //****************
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
    var getLongboardImages = function()
    {      
        console.log('Here');  
        $http.get("longboardstore-images.json").then
        (
          function(response)
          {
            scope.longboardImages = response.data;
          },
          onError
        );
    };
    //****************
    
    scope.updateLongboard = function()
    {
        var id = scope.tempLongboard['_id'];
        console.log(id);
        scope.tempLongboard.bottom_img_url = scope.tempLongboardImage.bottomImage;
        scope.tempLongboard.top_img_url = scope.tempLongboardImage.topImage;
        $http.put(scope.apiUrl + "longboard/" + id, scope.tempLongboard ).then
        (
            function(response)//success
            {
              var longboard = scope.longboards[scope.tempLongboardIndex];
              copyObjectProperties(scope.tempLongboard,longboard);
              scope.resetTempLongboard();
            },
            function(reason)//error
            {
              onError(reason);
              scope.resetTempLongboard();
            }
        );
        
    };

    scope.deleteLongboard = function(longboardIndex)
    {
        var longboard = scope.longboards[longboardIndex];
        var id = longboard['_id'];
        
        $http.delete(scope.apiUrl + "longboard/" + id).then
        (
          function(response)
          {
            console.log(response.data);
            scope.longboards.splice(longboardIndex,1);
          },
          onError
        );
    };

    //need scope object to hold data
    scope.createLongboard = function()
    {
        scope.tempLongboard.bottom_img_url = scope.tempLongboardImage.bottomImage;
        scope.tempLongboard.top_img_url = scope.tempLongboardImage.topImage;
        $http.post(scope.apiUrl + "longboard",scope.tempLongboard).then(
          function(response)
          {
            console.log(response.data);
            scope.longboards.push(response.data);
            scope.resetTempLongboard();
          },
          function(reason)
          {
            onError(reason);
            scope.resetTempLongboard();
          }
        );
    }
    getLongboards();
    getLongboardImages();
  }

})();
