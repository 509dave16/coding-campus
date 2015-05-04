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
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }

  function run() {
    FastClick.attach(document.body);
  }

  function mainController($http) 
  {
/*    $http.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    $http.defaults.headers.common['Access-Control-Allow-Methods'] = 'OPTIONS,GET,POST,PUT,DELETE';
    $http.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With";*/
    console.log($http);
    var scope = this;
    scope.apiUrl = "http://mean.codingcamp.us:8888/509Dave16/";
    scope.longboardImages = [];
    scope.createLongboardImage = {brandName:"",bottomImage:"",topImage:""};
    scope.longboardCreate = {};
    scope.longboardUpdate = {};
    scope.longboardDelete = {};
    
    var onError = function(reason)
    {
      scope.error = "Could not act on the longboard resource using the Longboard API !";
      console.log(reason);
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
    
    scope.updateLongboard = function(longboardIndex)
    {
        var id = longboard['_id'];
        console.log(id);
        $http.put(scope.apiUrl + "longboard/" + id, scope.updateLongboard ).then
        (
          function(response)
          {

            console.log(response.data);
            var longboard = scope.longboards[longboardIndex];
            for(var property in scope.updateLongboard)
            {
               
               longboard[property] = scope.updateLongboard[property];
            }

          },
          onError
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
        $http.post(scope.apiUrl + "longboard", scope.longboardCreate ).then
        (
          function(response)
          {
            console.log(response.data);
            scope.longboards.push(response.data);
          },
          onError
        );
    }
    getLongboards();
    getLongboardImages();
  }

})();
