function Point(row, column)
{
    var _row = row;
    var _column = column;
    var _marker = "U";
    var _ship = undefined;
    
    this.markPoint = function()
    {
        var result = "Point Already Hit";
        if(_marker === "U")
        {
            result = "Miss";
            _marker = _ship !== undefined ? "X" : "O";
            if(_marker === "X")
            {
                result = _ship.checkForDestruction();
            }
        }
        return result;
    };
    
    this.setShip = function(ship)
    {
        _ship =  ship;
    };
    
    this.hasShip = function()
    {
        return _ship === undefined ? false : true;
    };
    
    this.getRow = function()
    {
        return _row;
    };
    
    this.getColumn = function()
    {
        return _column;
    }
}

function Ship()
{
    var _points = [];
    var _numOfPointsDestroyed = 0;
    this.checkForDestruction = function()
    {
        _numOfPointsDestroyed++;
        return _numOfPointsDestroyed === _points.length ? "Destroyed" : "Hit";
    };
    this.addPoint = function(point)
    {
        point.setShip(this);
        _points.push(point);
    };
}

function generatePointGrid(rows, columns)
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
}

function generateShips(pointGrid, numOfShips,minShipLength,maxShipLength)
{
    var numOfShipsGenerated = 0;
    var sourcePoint = undefined;
    var destinationPoint = undefined;
    
    while(numOfShipsGenerated !== numOfShips)
    {
        sourcePoint = randomSourcePoint(pointGrid);
        destinationPoint = pointsPath(pointGrid, sourcePoint, minShipLength, maxShipLength);
    }
}

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
        if(directionIndex === 1 || directionIndex == 3)
        {
            var directionIncrement = directions[directionIndex];
            points = traverseGridRow(pointGrid, sourcePoint, minLength, maxLength, directionIncrement);
            if(points !== undefined)
            {
                foundPath = true;
                break;
            }
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
    var row = pointGrid[rowIndex];
    var point = undefined;
    var length = 0;
    var reachedMinumThreshold = true;
    var points = [];

    for(var rowIndex = 0; rowIndex < queryBoard.length; rowIndex++)
    {
        queryBoard[rowIndex][columnIndex] = value;
    }
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
/*function nextShipPoint(pointGrid, sourcePoint, minimumPoints)
{
    if(minimumPoints === undefined)
    {
        minimumPoints = 0;
    }
    var rowIndex = sourcePoint.getRow();
    var columnIndex = sourcePoint.getColumn();
    for(; rowIndex < pointGrid.length; rowIndex++)
    {
    
    }
    
    
}
*/
/*function randomExtension(pointGrid, sourcePoint, destinationDirection)
{
    
}*/
//Generate Point Grid
var pointGrid = generatePointGrid(10,10);
console.log(pointGrid);
//Generate Ships
generateShips(pointGrid,3,1,5);

