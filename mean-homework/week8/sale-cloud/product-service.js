(function(){
  angular.module('ProductService',[])
  .service('productService', productService);
  
  function productService($http,uuid)
  {
    var apiUrl = "http://mean.codingcamp.us:5555";
    var resource = "product";
    var appKey = '509Dave16@limelyte';

    this.getByID = function(productID)
    {
      var route = joinPath(apiUrl,appKey,resource,productID);
      return $http.get(route).then(success,failure);
    };
    this.get = function()
    {
      var route = joinPath(apiUrl,appKey,resource);
      return $http.get(route).then(success,failure);
    };
    
    this.update = function(product)
    {
      
    };
    this.delete = function(productID)
    {
      
    };
    this.create = function(product)
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