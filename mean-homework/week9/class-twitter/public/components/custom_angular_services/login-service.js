angular.module('loginService',['ngRoute'])
    .provider('loginService', function loginServiceProvider() {
    var loginRoute = "/login";

    this.setLoginRoute = function(route) {
        loginRoute = route;
    };

    this.$get =  ['$location',function loginServiceFactory($location) {
        function Login()
        {
            this.goToLogin = function () {
                $location.path(loginRoute);
            };
        }
        return new Login();
    }];
});