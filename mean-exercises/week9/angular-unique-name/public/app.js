/**
 * Created by rise4031 on 6/3/15.
 */
angular.module('MyApp',[])
.controller('MainCtrl',mainCtrl);

function mainCtrl()
{
    var scope = this;
    scope.uniqueNamesArray = [];
    scope.uniqueNamesObject = {};
    scope.enteredValue = "";
    scope.addUniqueNameToArray = function()
    {
        var index = scope.uniqueNamesArray.indexOf(scope.enteredValue);
        if(index === -1)
        {
            scope.uniqueNamesArray.push(scope.enteredValue);
        }

    };
    scope.addUniqueNameToObject = function() {
        if (!scope.uniqueNamesObject.hasOwnProperty(scope.enteredValue))
        {
            scope.uniqueNamesObject[scope.enteredValue] = scope.enteredValue;
        }
    };
}