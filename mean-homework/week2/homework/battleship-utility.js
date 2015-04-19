
function BattleshipUtiity()
{
    var Ship = require("./ship.js");
    var Point = require("./point.js");
    var generatePermutations = require("./permutations.js");
    //Array of indices for indexing into the directions Array
    var directionIndices = [0,1,2,3];
    //0 Up, 1 Left, 2 Down, 3 Right
    var directions = [-1,-1,1,1];
    //This variable will hold all the possible permutations of the 4 directions
    //to check when creating the Points path for a Ship.
    var directionIndexPermutations = generatePermutations(directionIndices);
    //Number for indexing into the Array of direction permutation sets.
    var permutationIndex = 0;
    
    /**
     * This method generates a 2D Point Array.
     * 
     * @param {number} rows This determines the height of the grid as well as how many nested arrays will be instantiated
     * @param {number} columns This determines the width of the grid as well as how many elements a nested array will have
     * @return {Point[][]) a 2D Point Array
     */
    this.generatePointGrid = function(rows, columns)
    {
        var grid = [];
        for(var rowIndex = 0; rowIndex < rows; rowIndex++)
        {
            grid[rowIndex] = [];
            for(var columnIndex = 0; columnIndex < columns; columnIndex++)
            {
                grid[rowIndex][columnIndex] = new Point(rowIndex,columnIndex); 
            }
        }
        return grid;
    };
    
    /**
     * This method generates the Ship objects that will cover Points of the grid.
     * 
     * @param {Point[][]} pointGrid A 2D Point Array
     * @return {Ship[]} A Ship Array representing the created ships.
     */
    this.generateShips = function(pointGrid, numOfShips,minShipLength,maxShipLength)
    {
        if(isGridJagged(pointGrid))
        {
            console.log("Grid was jagged. Only non-jagged grids are allowed.");
            return;
        }
        if(gridAvailabilityValidation(pointGrid.length, pointGrid[0].length,numOfShips,maxShipLength) === false)
        {
            console.log("Grid did not have enough available points.");
            return;
        }
        var sourcePoint = undefined;
        var shipPoints = undefined;
        var ships = [];
        while(ships.length !== numOfShips)
        {
            sourcePoint = randomSourcePoint(pointGrid);
            //Check for the case when no source point for a ship could be found.
            if(sourcePoint === undefined)
            {
                ships = undefined;
                break;   
            }
            shipPoints = pointsPath(pointGrid, sourcePoint, minShipLength, maxShipLength);
            if(shipPoints !== undefined)
            {
                var ship = new Ship(shipPoints);
                ships.push(ship);
                for(var shipPointIndex = 0 ; shipPointIndex < shipPoints.length; shipPointIndex++)
                {
                   var point = shipPoints[shipPointIndex];
                   point.setShip(ship);
                }
            }
        }
        return ships;
    };
    
    /**
     * This method checks to see if the possible number of Points
     * that would be needed for the ships is greater than the Points of the grid
     * 
     * @param {number} rows The height and number of nested Point Arrays
     * @param {number} columns The width and length of the nested Point Arrays
     * @param {number} numOfEntities This number indicates how Ships that are to be created
     * @param {number} maxEntitySize This number indicates how long a Ship can be
     * @return {boolean} This indicates if there is or isn't enough Points in the 2D Array
     */
    function gridAvailabilityValidation(rows,columns,numOfEntites,maxEntitySize)
    {
        var availablePoints = rows * columns;
        var pointsNeeded = numOfEntites * maxEntitySize;
        return availablePoints >= pointsNeeded ? true : false;
    }
    
    /**
     * This method checks to see if the 2D Point Array is jagged.
     * 
     * @param {Point[][]} grid The 2D Point Array
     * @return {boolean} Indicates if the grid is jagged or not
     */
    function isGridJagged(grid)
    {
        var iniitalColumnCount = 0;
        var isJagged = false;
        for(var rowIndex = 0; rowIndex < grid.length; rowIndex++)
        {
            var row = grid[rowIndex];
            if(rowIndex === 0)
            {
                iniitalColumnCount = row.length;
            }
            else if(iniitalColumnCount !== row.length)
            {
                isJagged = true;
                break;
            }
        }
        return isJagged;
    }
    
    /**
     * This method attempts to find a source Point for a Ship
     * 
     * @param {Pointp[][]} pointGrid A 2D Point Array
     * @return {Point} The point that will act as the source for a Ship
     */
    function randomSourcePoint(pointGrid)
    {
        var foundPoint = false;
        var maxRows = pointGrid.length - 1;
        var maxColumns= pointGrid[0].length - 1;
        var randomRow = -1;
        var randomColumn = -1;
        var point = undefined;
        while(foundPoint === false)
        {
            randomRow = Math.round(Math.random() * maxRows);
            randomColumn = Math.round(Math.random() * maxColumns);
            point = pointGrid[randomRow][randomColumn];
            if(point.hasShip() === false)
            {
                foundPoint = true; 
            }
        }
        return point;
            
    }
    
    /**
     * This method determines randomly a viable Points path for a Ship object in
     * either an Up, Left, Down, or Right direction within the bounds of the Point grid.
     * 
     * @param {Point[][]} pointGrid A 2D Point Array
     * @param {Point} sourcePoint The source Point of the Points path for a Ship
     * @param {number} minLength The minimum length of a Ship
     * @param {number} maxLength The maximum length of a Ship
     * @return {Point[]} A Point Array representing the Points path for a Ship
     */
    function pointsPath(pointGrid, sourcePoint, minLength, maxLength)
    {
        var points = [];
        var foundPath = false;
        var directionIndiceSet = directionIndexPermutations[permutationIndex];
        for(var directionIndex = 0; directionIndex < directionIndiceSet.length; directionIndex++)
        {
            var index = directionIndiceSet[directionIndex];
            var directionIncrement = directions[index];
            //1 is Left and 3 is Right
            if(index === 1 || index == 3)
            {
                points = traverseGridRow(pointGrid, sourcePoint, minLength, maxLength, directionIncrement);
            }
            //else it's 0 which is Up or 2 which is Down
            else
            {
                points = traverseGridColumn(pointGrid, sourcePoint, minLength, maxLength, directionIncrement);   
            }
            
            //Check to see if a path of points for the Ship was found
            if(points !== undefined)
            {
                foundPath = true;
                break;
            }
        }
        
        permutationIndex++;
        if(permutationIndex === directionIndexPermutations.length)
        {
            permutationIndex = 0;
        }
        
        if(foundPath === true)
        {
            return points;
        }
        return undefined;
    }
    
    /**
     * This method traverse the elements at specific index/column of the nested Point Arrays
     * to create a path of Points for a Ship if possible in either an up or down direction.
     * 
     * @param {Point[][]} pointGrid A 2D Point Array
     * @param {Point} sourcePoint A source Point for the Points path of a Ship
     * @param {number} minLength The minimum length of a Ship
     * @param {number} maxLength The maximum length of a Ship
     * @return {Point[]} A Point Array representing the Points path for a Ship
     */
    function traverseGridColumn(pointGrid, sourcePoint, minLength, maxLength, directionIncrement)
    {
        var rowIndex = sourcePoint.getRow();
        var columnIndex = sourcePoint.getColumn();
        var point = undefined;
        var reachedMinumThreshold = true;
        var chanceThresholdDecrement = ( ( 100/maxLength ) * 0.01 );
        var chanceThreshold = 1;
        var points = [];
    
        for(; (rowIndex < pointGrid.length && rowIndex > -1) && (points.length <= maxLength); rowIndex += directionIncrement)
        {
            point = pointGrid[rowIndex][columnIndex];
            var chance = Math.random();
            if(points.length >= minLength && (chance > chanceThreshold))
            {
                break;
            }
            else
            {
                chanceThreshold -= chanceThresholdDecrement;
            }
            
            if(!point.hasShip())
            {
                points.push(point);
            }
            else if(points.length < minLength)
            {
                reachedMinumThreshold = false;
                break;
            }
            else
            {
                break;
            }
        }
        if(reachedMinumThreshold === true)
        {
            return points;
        }
        return undefined;
    }
    
    /**
     * This method traverse the elements of specific row(nested Point Array)
     * to create a path of Points for a Ship if possible in either a left or right direction.
     * 
     * @param {Point[][]} pointGrid A 2D Point Array
     * @param {Point} sourcePoint A source Point for the Points path of a Ship
     * @param {number} minLength The minimum length of a Ship
     * @param {number} maxLength The maximum length of a Ship
     * @return {Point[]} A Point Array representing the Points path for a Ship
     */
    function traverseGridRow(pointGrid, sourcePoint, minLength, maxLength, directionIncrement)
    {
        var rowIndex = sourcePoint.getRow();
        var columnIndex = sourcePoint.getColumn();
        var row = pointGrid[rowIndex];
        var point = undefined;
        var reachedMinumThreshold = true;
        var chanceThresholdDecrement = ( ( 100/maxLength ) * 0.01 );
        var chanceThreshold = 1;
        var points = [];
        for(; (columnIndex < row.length && columnIndex > -1) && (points.length <= maxLength); columnIndex += directionIncrement)
        {
            point = row[columnIndex];
            var chance = Math.random();
            if(points.length >= minLength && (chance > chanceThreshold))
            {
                break;
            }
            else
            {
                chanceThreshold -= chanceThresholdDecrement;
            }
            
            if(!point.hasShip())
            {
                points.push(point);
            }
            else if(points.length < minLength)
            {
                reachedMinumThreshold = false;
                break;
            }
            else
            {
                break;
            }
        }
        if(reachedMinumThreshold === true)
        {
            return points;
        }
        return undefined;
    }
    
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
    this.printGrid = function (grid)
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
    };
    
    /**
     * This function prints the Point objects of each Ship object
     * 
     * @param {Ship[]} ships An array of Ship objects
     * @return {undefined}
     */
    this.printShips = function (ships)
    {
        for(var shipIndex = 0; shipIndex < ships.length; shipIndex++)
        {
            var ship = ships[shipIndex];
            ship.printPoints();
        }
    };
}

module.exports = BattleshipUtiity;