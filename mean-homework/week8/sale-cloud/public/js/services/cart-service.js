(function(){
  angular.module('CartService',['ProductService'])
  .service('cartService',cartService);
  
  function cartService($http,productService)
  {
    var apiUrl = "http://mean.codingcamp.us:5555";
    var resource = 'cart';
    
    this.get = function(userKey)
    {
      var route = joinPath(apiUrl,userKey,resource);
      return $http.get(route).then(success,failure);
    };
    
    this.update = function(userKey,items)
    {
      var route = joinPath(apiUrl,userKey,resource);
      return $http.post(route,items).then(success,failure);
    };
    
    function success(response)
    {
      console.log("Success: ",response);
      return response.data;
    }
    
    function failure(response)
    {
      console.log("Error: ",response);
      return response.data;
    }
        
    function joinPath()
    {
      var path = "";
      var separator = "/";
      for(var argIndex = 0; argIndex < arguments.length; argIndex++)
      {
        path += arguments[argIndex];
        if(argIndex < (arguments.length-1))
        {
          path += separator;
        }
      }
      return path;
    }
  }
})();