angular.module('favstate.checkout',['ngRoute'])
    .config(config)
    .controller('CheckoutCtrl', checkoutCtrl)
    .controller('ConfirmCtrl', confirmCtrl)
    .controller('ReceiptCtrl', receiptCtrl);

function config($routeProvider)
{
    $routeProvider
        .when('/checkout',{
            controller: "CheckoutCtrl",
            templateUrl: "public/views/checkout/checkout.tpl.html",
            controllerAs: "checkoutCtrl"
        })
        .when('/checkout/receipt',{
            controller: "ReceiptCtrl",
            templateUrl: "public/views/checkout/receipt.tpl.html",
            controllerAs: "receiptCtrl"
        })
        .when('/checkout/confirm',{
            controller: "ConfirmCtrl",
            templateUrl: "public/views/checkout/confirm.tpl.html",
            controllerAs: "confirmCtrl"
        });
}

function checkoutCtrl($location)
{
    var scope = this;
    scope.checkoutButtonClicked = function()
    {
        console.log('Made it here');
        $location.path('/checkout/confirm');
    };
}

function confirmCtrl($location)
{
    var scope = this;
    scope.confirmButtonClicked = function()
    {
        $location.path('/checkout/receipt');
    };
}

function receiptCtrl($location)
{
    var scope = this;
    scope.receiptButtonClicked = function()
    {
        $location.path('/home');
    };
}
