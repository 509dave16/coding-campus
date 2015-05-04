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
    console.log($http);
    var scope = this;
    scope.apiUrl = "http://mean.codingcamp.us:8888/509Dave16/";
    scope.longboardImages = [];
    scope.createLongboardImage = {brandName:"",bottomImage:"",topImage:""};
    scope.longboardCreate = {};
    scope.longboardUpdate = {};
    scope.longboardUpdateIndex = -1;
    scope.longboardDelete = {};
    
    var onError = function(reason)
    {
      scope.error = "Could not act on the longboard resource using the Longboard API !";
      console.log(reason);
    };

    var onUpdateError = function(reason)
    {
        var longboard = scope.longboards[scope.longboardUpdateIndex];
        for(var property in longboard)
        {
           longboard[property] = scope.longboardUpdate[property];
        }
    };

    scope.copyLongboard = function(longboardIndex)
    {
        var longboard= scope.longboards[longboardIndex];
        scope.updateLongboardIndex = longboardIndex;
        for(var property in longboard)
        {
           scope.longboardUpdate[property] = longboard[property];
        }
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
            scope.createLongboardImage.bottomImage = scope.longboardImages[0].bottomImage;
            scope.createLongboardImage.topImage = scope.longboardImages[0].topImage;
          },
          onError
        );
    };
    //****************
    scope.getLongboard = function(id)
    {        
        $http.get(scope.apiUrl + "longboard/" + id).then
        (
          function(response)
          {
            scope.longboards.push(response.data);
          },
          onError
        );
    };
    scope.updateLongboard = function(longboardIndex)
    {
        var longboard = scope.longboards[longboardIndex];
        var id = longboard['_id'];
        console.log(id);
        $http.put(scope.apiUrl + "longboard/" + id, longboard ).then
        (
          function(response)
          {
            console.log(response.data);
          },
          onUpdateError
        );
    };

    scope.deleteLongboard = function(longboardIndex)
    {
        console.log(longboardIndex);
        var longboard = scope.longboards[longboardIndex];
        var id = longboard['_id'];
        
        $http.delete(scope.apiUrl + "longboard/" + id).then
        (
          function(response)
          {
            scope.longboards.splice(longboardIndex,1);
            console.log(response.data);
          },
          onError
        );
    };

    //need scope object to hold data
    scope.createLongboard = function()
    {
        scope.longboardCreate.bottom_img_url = scope.createLongboardImage.bottomImage;
        scope.longboardCreate.top_img_url = scope.createLongboardImage.topImage;
        console.log(scope.longboardCreate);

        $http.post(scope.apiUrl + "longboard", scope.longboardCreate ).then
        (
          function(response)
          {
            console.log(response.data);
            scope.getLongboard(response.data['_id']);
          },
          onError
        );
    }
    getLongboards();
    getLongboardImages();
  }

})();
