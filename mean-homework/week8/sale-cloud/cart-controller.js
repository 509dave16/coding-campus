angular.module('SaleCloud').controller('CartCtrl', cartCtrl);

function cartCtrl(cartService,productService,key)
{
  var userKey = key.get();
  var scope = this;
  scope.items = [];
  scope.products = [];
  getItems();
  scope.removeFromCart = function(product)
  {
    cartService.remove(userKey,product['_id']);
  };
  
  function getItems()
  {
    cartService.get(userKey).then
    (
      function(data)
      {
        if(data !== null)
        {
          scope.items = data;
          getProducts();
        }
      }
      ,
      function(error)
      {
        //todo
      }
    );
  }
  function getProducts()
  {
   for(var itemIndex = 0; itemIndex < scope.items.length; itemIndex++)
   {
     getProductByID(scope.items[itemIndex]['_id']);
   }
  }
  function getProductByID(productID)
  {
    productService.getByID(productID).then(
        function(data)
        {
          scope.products.push(data);
        }
      ,
        function(error)
        {
          //todo
        }
    );
  }
  
  
}
