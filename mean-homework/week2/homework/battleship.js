var BattleshipUtiity = require("./battleship-utility.js");
var battleShipUtility = new BattleshipUtiity();
//Generate Point Grid
var pointGrid = battleShipUtility.generatePointGrid(10,10);
printGrid(pointGrid);
//Generate Ships
var ships = battleShipUtility.generateShips(pointGrid,5,1,5);
var numOfAliveShips = ships.length;
printShips(ships);

//markAllPoints(pointGrid);
function markAllPoints(pointGrid)
{
    for(var rowIndex = 0; rowIndex < pointGrid.length; rowIndex++)
    {
        var row = pointGrid[rowIndex];
        for(var columnIndex = 0; columnIndex < row.length; columnIndex++)
        {
            var point = pointGrid[rowIndex][columnIndex];
            point.markPoint();
        }
    }
}

function printGrid(grid)
{
  //
  var outputLines = "";
  //Traverse rows
  
  for(var rowIndex = 0; rowIndex < grid.length; rowIndex++)
  {
    var row = grid[rowIndex];
    if(rowIndex === 0)
    {
        outputLines += "    ";
        for(var columnIndex = 0; columnIndex < row.length; columnIndex++)
        {
            outputLines += columnIndex + " ";
        }
        outputLines += "\n";
    }
    var outputLine = "";
    outputLine += rowIndex + " | ";
    //Traverse columns in a row
    for(columnIndex = 0; columnIndex < row.length; columnIndex++)
    {
       //Retrive the array that contains the values of the column and row index
       var point = row[columnIndex];
       outputLine += point.getMarker();
       if(columnIndex != row.length - 1)
       {
           outputLine += " ";
       }
    }
    outputLine += " |";
    if(rowIndex !== (grid.length -1))
    {
      outputLine += "\n";
    }
    outputLines += outputLine;
   
  }
  console.log(outputLines);
}

function printShips(ships)
{
    for(var shipIndex = 0; shipIndex < ships.length; shipIndex++)
    {
        var ship = ships[shipIndex];
        ship.printPoints();
    }
}


var inputReader = require('readline-sync');
while(numOfAliveShips > 0)
{
    console.log("Below is the Battleship Grid. Please enter an Column,Row coordinate pair for where you would like to strike:");
    printGrid(pointGrid);
    var input = inputReader.question("Column,Row -> ");
    var coordinates = input.split(",");
    var column = coordinates[0];
    var row = coordinates[1];
    var action = pointGrid[row][column].markPoint();
    console.log('You ' + action);
    if(action === 'destroyed a Ship.')
    {
        numOfAliveShips--;
        console.log( (ships.length - numOfAliveShips) + " down. " + numOfAliveShips + " to go!" );
        
    }
    if(numOfAliveShips > 0)
    {
        input = inputReader.question('Would you like to continue the battle(y/n)? ');
        if(input === 'n')
        {
            console.log("Thank you for your support solider!");
            break;
        }
    }
}
if(numOfAliveShips === 0)
{
    console.log("You won the naval battle! Well done soldier!!!");
}