function Ship(points)
{
    var _points = points;
    var _numOfPointsDestroyed = 0;
    this.checkForDestruction = function()
    {
        _numOfPointsDestroyed++;
        return _numOfPointsDestroyed === _points.length ? "destroyed a Ship." : "hit a Ship.";
    };
    
    /**
     * This method is meant for testing the functionality of the BattleShip program
     * by seeing on which Points Ships were generated
     * 
     * @return {undefined}
     */
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