(function(){
  angular.module('CartService',['ProductService'])
  .service('cartService',cartService);
  
  function cartService($http,productService)
  {
    var apiUrl = "http://mean.codingcamp.us:5555";
    var resource = 'cart';
    var items = [];
    var products = [];
    
    this.get = function(userKey)
    {
      var route = joinPath(apiUrl,userKey,resource);
      return $http.get(route).then(
        function(response)
        {
          var data = response.data;
          items = data;
          return data;
        }
        ,failure);
    };
    
    this.update = function(userKey,items)
    {
      var route = joinPath(apiUrl,userKey,resource);
      return $http.post(route,items).then(success,failure);
    };
    
    this.add = function(userKey,product)
    {
      var itemID = product['_id'];
      var itemsCopy = angular.copy(items);
      var itemIndex = findItem(itemID);
      if(itemIndex===-1)
      {
        itemsCopy.push({'_id':itemID,'quantity':1});
      }
      else
      {
        itemsCopy[itemIndex].quantity++;
      }
      this.update(userKey,itemsCopy).then(
        function(data)
        {
          if(itemIndex===-1)
          {
            products.push(item);
          }
          items = itemsCopy;
        }
      ,
        null
      );
    };
    
    this.remove = function(userKey,itemID)
    {
      var itemsCopy = angular.copy(items);
      var itemIndex = findItem(itemID);
      itemsCopy[itemIndex].quantity--;
      this.update(userKey,itemsCopy).then(
        function(data)
        {
          if(itemsCopy[itemIndex].quantity ===0)
          {
            itemsCopy.splice(itemIndex,1);
          }
          items = itemsCopy;
        }
      ,
        null
      );
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
    
    
    function findItem(itemID)
    {
      for(var itemIndex = 0; itemIndex < items.length; itemIndex++)
      {
        var item = items[itemIndex];
        if(item['_id'] === itemID)
        {
          return itemIndex;
        }
      }
      return -1;
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