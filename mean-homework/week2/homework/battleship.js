/**
 * This function calls the mark() method of every Point object in the 2D Array.
 * 
 * @param {Point[][]} pointGrid a 2D Array that is to be traversed
 * @return {undefined}
 */
function markAllPoints(pointGrid)
{
    for(var rowIndex = 0; rowIndex < pointGrid.length; rowIndex++)
    {
        var row = pointGrid[rowIndex];
        for(var columnIndex = 0; columnIndex < row.length; columnIndex++)
        {
            var point = pointGrid[rowIndex][columnIndex];
            point.mark();
        }
    }
}

/**
 * This function prints the contents of a 2D Array.
 * 
 * @param {Point[][]} grid a 2D Array that is to be printed
 * @returns {undefined}
 */
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

/**
 * This function prints the Point objects of each Ship object
 * 
 * @param {Ship[]} ships An array of Ship objects
 * @return {undefined}
 */
function printShips(ships)
{
    for(var shipIndex = 0; shipIndex < ships.length; shipIndex++)
    {
        var ship = ships[shipIndex];
        ship.printPoints();
    }
}
//Require, Declare, and initialize a BattleShiputility
var BattleshipUtiity = require("./battleship-utility.js");
var battleShipUtility = new BattleshipUtiity();
//Generate Point Grid
var pointGrid = battleShipUtility.generatePointGrid(10,10);
printGrid(pointGrid);
//Generate Ships
var ships = battleShipUtility.generateShips(pointGrid,5,1,5);
//Not enough ships were generated if undefinted was returned above
if(ships !== undefined)
{
    var numOfAliveShips = ships.length;
    printShips(ships);
    var inputReader = require('readline-sync');
    
    //Keep the game going while there are ships still alive
    while(numOfAliveShips > 0)
    {
        console.log("Below is the Battleship Grid. Please enter an Column,Row coordinate pair for where you would like to strike:");
        printGrid(pointGrid);
        var input = inputReader.question("Column,Row -> ");
        var coordinates = input.split(",");
        var column = coordinates[0];
        var row = coordinates[1];
        var action = pointGrid[row][column].mark();
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
}
else
{
    console.log("We could not find enough ships for you to battle :( !");
}
