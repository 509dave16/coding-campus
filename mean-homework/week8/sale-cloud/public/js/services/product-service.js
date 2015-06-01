(function(){
  angular.module('ProductService',[])
  .service('productService', productService);
  
  function productService($http)
  {
    var apiUrl = "http://mean.codingcamp.us:5555";
    var resource = "product";

    this.getByID = function(userKey,productID)
    {
      var route = joinPath(apiUrl,userKey,resource,productID);
      return $http.get(route).then(success,failure);
    };
    this.get = function(userKey)
    {
      var route = joinPath(apiUrl,userKey,resource);
      return $http.get(route).then(success,failure);
    };
    
    this.update = function(userKey,product)
    {
      
    };
    this.delete = function(userKey,productID)
    {
      
    };
    this.insert = function(userKey,product)
    {
      
    };
    
    
    function success(response)
    {
      console.log(response);
      return response.data;
    }
    
    function failure(response)
    {
      console.log(response);
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