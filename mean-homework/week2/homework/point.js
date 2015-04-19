function Point(row, column)
{
    var _row = row;
    var _column = column;
    var _marker = "U";
    var _ship = undefined;
    
    /**
     * This method is for marking Point as
     * X - Ship Hit
     * O - Miss
     * 
     * @return {String} This indicates what the result of targeting this Point was
     */
    this.mark = function()
    {
        var action = "hit an already targeted point.";
        if(_marker === "U")
        {
            action = "missed.";
            _marker = _ship !== undefined ? "X" : "O";
            if(_marker === "X")
            {
                action = _ship.checkForDestruction();
            }
        }
        return action;
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
    };
    
    this.getMarker = function()
    {
       return _marker;  
    };
}

module.exports = Point;