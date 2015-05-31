angular.module('SaleCloud').controller('ProductCtrl',['cartService','productService','key',productCtrl]);

function productCtrl(cartService,productService,key)
{
  var userKey = key.get();
  var scope = this;
  scope.products = [];
  scope.getAllProducts = function()
  {
    productService.get().then(
        function(data)
        {
          scope.products = data;
        }
      ,
        function(error)
        {
        }
    );
  };
  
  scope.addToCart = function(product)
  {
    cartService.add(userKey,product);
  };
   
   scope.getAllProducts();
}