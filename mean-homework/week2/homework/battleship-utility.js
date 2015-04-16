
function BattleshipUtiity()
{
    var Ship = require("./ship.js")
    var Point = require("./point.js");
    
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
    
    this.generateShips = function(pointGrid, numOfShips,minShipLength,maxShipLength)
    {
        var sourcePoint = undefined;
        var shipPoints = undefined;
        var ships = [];
        while(ships.length !== numOfShips)
        {
            sourcePoint = randomSourcePoint(pointGrid);
            shipPoints = pointsPath(pointGrid, sourcePoint, minShipLength, maxShipLength);
            if(shipPoints !== undefined)
            {
                ships.push(new Ship(shipPoints));
            }
        }
    };
    
    //Note may need alternate version
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
    
    function pointsPath(pointGrid, sourcePoint, minLength, maxLength)
    {
        //0 Up, 1 Left, 2 Down, 3 Right
        var directions = [-1,-1,1,1];
        var points = [];
        var foundPath = false;
        for(var directionIndex = 0; directionIndex < directions.length; directionIndex++)
        {
            var directionIncrement = directions[directionIndex];
            if(directionIndex === 1 || directionIndex == 3)
            {
                points = traverseGridRow(pointGrid, sourcePoint, minLength, maxLength, directionIncrement);
            }
            else
            {
                points = traverseGridColumn(pointGrid, sourcePoint, minLength, maxLength, directionIncrement);   
            }
            
            if(points !== undefined)
            {
                foundPath = true;
                break;
            }
        }
        if(foundPath === true)
        {
            return points;
        }
        return undefined;
    }
    
    function traverseGridColumn(pointGrid, sourcePoint, minLength, maxLength, directionIncrement)
    {
        var rowIndex = sourcePoint.getRow();
        var columnIndex = sourcePoint.getColumn();
        var point = undefined;
        var length = 0;
        var reachedMinumThreshold = true;
        var points = [];
    
        for(; (rowIndex < pointGrid.length && rowIndex > -1) && (points.length <= maxLength); rowIndex += directionIncrement)
        {
            point = pointGrid[rowIndex][columnIndex];
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
    
    function traverseGridRow(pointGrid, sourcePoint, minLength, maxLength, directionIncrement)
    {
        var rowIndex = sourcePoint.getRow();
        var columnIndex = sourcePoint.getColumn();
        var row = pointGrid[rowIndex];
        var point = undefined;
        var length = 0;
        var reachedMinumThreshold = true;
        var points = [];
        for(; (columnIndex < row.length && columnIndex > -1) && (points.length <= maxLength); columnIndex += directionIncrement)
        {
            point = row[columnIndex];
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
}

module.exports = BattleshipUtiity;