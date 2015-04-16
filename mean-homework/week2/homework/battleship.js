var BattleshipUtiity = require("./battleship-utility.js");
var battleShipUtility = new BattleshipUtiity();
//Generate Point Grid
var pointGrid = battleShipUtility.generatePointGrid(10,10);
console.log(pointGrid);
//Generate Ships
BattleshipUtiity.generateShips(pointGrid,3,1,5);

