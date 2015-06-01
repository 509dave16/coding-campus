(function() {
    angular.module('SaleCloud')
        .controller('MainCtrl', mainCtrl);

    function mainCtrl(keyService,productService,cartService)
    {
        var scope = this;
        var userKey = keyService.get();
        var appKey = '509Dave16@limelyte';
        scope.items = [];
        scope.products = [];
        scope.cartProducts = [];

        function init()
        {
            productService.get(appKey).then(
                 function(data)
                 {
                     scope.products = data;
                     getItems();
                     console.log('Products: ',scope.products);
                 }
                ,function(error) {}
            );
        }

        function getItems()
        {
          cartService.get(userKey).then(
             function(data)
             {
                 scope.items = data;
                 console.log('Items: ',scope.items);
                 getCartProducts();
             }
            ,function(error){}
          );
        }

        scope.addToCart = function(product)
        {
            var productID = product['_id'];
            var itemIndex = findItem(productID);
            var itemsCopy = scope.items.length > 0 ? angular.copy(scope.items) : [];
            if(itemIndex===-1)
            {
                itemsCopy.push({'_id':productID,'quantity':1});
            }
            else
            {
                itemsCopy[itemIndex].quantity++;
            }
            cartService.update(userKey,itemsCopy).then(
                function(data)
                {
                    if(itemIndex===-1)
                    {
                        scope.cartProducts.push(product);
                    }
                    scope.items = itemsCopy;
                }
                ,
                null
            );
        };

        scope.removeFromCart = function(product)
        {
            console.log(product);
            var productID = product['_id'];
            var itemsCopy = angular.copy(scope.items);
            var itemIndex = findItem(productID);
            itemsCopy[itemIndex].quantity--;
            var itemRemoved = false;
            if(itemsCopy[itemIndex].quantity===0)
            {
                itemsCopy.splice(itemIndex,1);
                itemRemoved = true;
            }
            cartService.update(userKey,itemsCopy).then(
                function(data)
                {
                    if(itemRemoved)
                    {
                        scope.cartProducts.splice(itemIndex,1);
                    }
                    scope.items = itemsCopy;
                }
                ,
                null
            );
        };

        scope.subtotal = function()
        {
            var total = 0;
            for(var itemIndex = 0; itemIndex < scope.items.length; itemIndex++)
            {
                var item = scope.items[itemIndex];
                var productIndex = findProduct(item['_id']);
                var product = scope.products[productIndex];
                var price = product.price;
                var quantity = item.quantity;
                total +=  (price * quantity);
            }
            return total;
        };

        function getCartProducts()
        {
            for(var itemIndex = 0; itemIndex < scope.items.length; itemIndex++)
            {
                var item = scope.items[itemIndex];
                var productID = item['_id'];
                var productIndex = findProduct(productID);
                var product = scope.products[productIndex];
                scope.cartProducts.push(product);
                /*productService.getByID(appKey,productID).then(
                  function(data){scope.cartProducts.push(data);}
                  ,function(error){}
                );*/
            }
            console.log('Cart Products: ',scope.cartProducts);
        }

        function findItem(productID)
        {
            for(var itemIndex = 0; itemIndex < scope.items.length; itemIndex++)
            {
                var item = scope.items[itemIndex];
                if(item['_id'] === productID)
                {
                    return itemIndex;
                }
            }
            return -1;
        }


        function findProduct(productID)
        {
            for(var productIndex = 0; productIndex < scope.products.length; productIndex++)
            {
                var product = scope.products[productIndex];
                if(product['_id'] === productID)
                {
                    return productIndex;
                }
            }
            return -1;
        }

        scope.getItemQuantity = function(product)
        {
          var itemIndex = findItem(product['_id']);
            return scope.items[itemIndex].quantity;
        };

        init();
    }
})();
