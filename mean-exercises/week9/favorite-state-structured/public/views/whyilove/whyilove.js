angular.module("favstate.whyilove",['ngRoute'])
    .config(config)
.controller('WhyILoveCtrl', whyiloveCtrl);

function whyiloveCtrl()
{
    var scope = this;
    scope.header = "Why I Love";
    scope.imagesOfState = [
        'http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/South_Eastern_Washington_State.tif/lossy-page1-275px-South_Eastern_Washington_State.tif.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Cascade_pass.jpg/250px-Cascade_pass.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/ColumbiaRiverGorge1.JPG/275px-ColumbiaRiverGorge1.JPG',
        'http://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Large_dust_storm_in_parts_of_eastern_Washington_on_October_4%2C_2009.jpg/250px-Large_dust_storm_in_parts_of_eastern_Washington_on_October_4%2C_2009.jpg'
    ];
}

function config($routeProvider)
{
    $routeProvider
        .when('/whyilove', {
            controller: 'WhyILoveCtrl',
            templateUrl: 'public/views/whyilove/whyilove.tpl.html',
            controllerAs: 'whyiloveCtrl'
        });
}