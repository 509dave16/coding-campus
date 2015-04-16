function Ship(points)
{
    var _points = points;
    var _numOfPointsDestroyed = 0;
    observePoints();
    
    this.checkForDestruction = function()
    {
        _numOfPointsDestroyed++;
        return _numOfPointsDestroyed === _points.length ? "Destroyed" : "Hit";
    };
    
    function observePoints()
    {
        for(var pointIndex = 0; pointIndex < _points.length; pointIndex++)
        {
            var point = _points[pointIndex];
            point.setShip(this);
        }
    }
}

module.exports = Ship;