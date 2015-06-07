/**
 * Created by rise4031 on 6/6/15.
 */
angular.module('class-twitter.myfeed',['ngRoute'])
    .config(config)
    .controller('MyFeedCtrl',myFeedCtrl);

function config($routeProvider)
{
    $routeProvider
        .when('/myfeed',
        {
            controller:"MyFeedCtrl",
            templateUrl: "public/views/myfeed/myfeed.html",
            controllerAs:"myFeedCtrl"
        }
    )
}

function myFeedCtrl()
{

}