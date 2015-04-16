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
    };
}

module.exports = Point;