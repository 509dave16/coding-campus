function Ship(points)
{
    var _points = points;
    var _numOfPointsDestroyed = 0;
    this.checkForDestruction = function()
    {
        _numOfPointsDestroyed++;
        return _numOfPointsDestroyed === _points.length ? "destroyed a Ship." : "hit a Ship.";
    };
    //observePoints();

    function observePoints()
    {
        for(var pointIndex = 0; pointIndex < _points.length; pointIndex++)
        {
            var point = _points[pointIndex];
            point.setShip(this);
        }
    }
    
    this.printPoints = function ()
    {
        var output = "[ ";
        for(var pointIndex = 0; pointIndex < _points.length; pointIndex++)
        {
            var point = _points[pointIndex];
            var pointStr = "(" + point.getColumn() + "," + point.getRow() + ")";  
            if(pointIndex !== _points.length - 1)
            {
                pointStr += ", ";
            }
            output += pointStr;
        }
        output += " ]";
        console.log(output);
    };
}

module.exports = Ship;