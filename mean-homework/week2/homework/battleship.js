
//Require, Declare, and initialize a BattleShiputility
var BattleshipUtiity = require("./battleship-utility.js");
var battleShipUtility = new BattleshipUtiity();
var inputReader = require('readline-sync');
var playAgain = "y";

while(playAgain === "y")
{
    var columns = parseInt(inputReader.question("How many columns would you like the Battleship Grid to have? "));
    var rows = parseInt(inputReader.question("How many rows would you like the Battleship Grid to have? "));
    var numOfShips = parseInt(inputReader.question("How many ships would you like to have generated on the grid? "));
    var minShipLength = parseInt(inputReader.question("What should the minimum length of a Ship be? " ));
    var maxShipLength = parseInt(inputReader.question("What should the maximum length of a Ship be? ")); 
    //Generate Point Grid
    var pointGrid = battleShipUtility.generatePointGrid(rows,columns);
    //Generate Ships
    var ships = battleShipUtility.generateShips(pointGrid,numOfShips,minShipLength,maxShipLength);
    var playBy = inputReader.question("Would you like to play this naval battle by number of hits scored or Ships destroyed(hits/ships)? ");
    var scoreToWin = parseInt(inputReader.question("How many " + playBy + " to win the naval battle? "));
    var score = 0;
    var seeShips = inputReader.question("Would you like to have the Ships positions revealed(y/n)? ");
    //Not enough ships were generated if undefinted was returned above
    if(ships !== undefined)
    {
        //Keep the game going while there are ships still alive
        while(score !== scoreToWin)
        {
            if(seeShips === "y")
            {
                battleShipUtility.printShips(ships);
            }
            console.log("Below is the Battleship Grid. Please enter an Column,Row coordinate pair for where you would like to strike:");
            battleShipUtility.printGrid(pointGrid);
            var input = inputReader.question("Column,Row -> ");
            var coordinates = input.split(",");
            var column = coordinates[0];
            var row = coordinates[1];
            var action = pointGrid[row][column].mark();
            console.log('You ' + action);
            if( ( (playBy === "ships" || playBy === "hits") && action === 'destroyed a Ship.' ) || ( playBy === "hits" && action === 'hit a Ship.' ) )
            {
                score++;
                console.log( score + " down. " + (scoreToWin - score) + " to go!" );
                
            }
            if(score !== scoreToWin)
            {
                input = inputReader.question('Would you like to continue the battle(y/n)? ');
                if(input === 'n')
                {
                    playAgain = 'n';
                    console.log("Thank you for your support solider!");
                    break;
                }
            }
            else
            {
                console.log("You won the naval battle! Well done soldier!!!");
                playAgain = inputReader.question("Would you like to face another armada soldier(y/n)? ");
            }
        }
    }
    else
    {
        console.log("We could not find enough ships for you to battle :( !");
    }
}