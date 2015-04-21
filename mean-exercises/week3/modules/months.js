module.exports = 
{
    monthIndexToName : function (monthIndex)
    {
        if(typeof monthIndex !== "number")
        {
            return new Error( monthIndex + " is not a number. Please pass a number." );
        }
        if(Math.floor(monthIndex) !== monthIndex)
        {
            return new Error( monthIndex + " is not an integer. Please pass a whole number." );
        }
        if(monthIndex < 0 || monthIndex > 11)
        {
            return new Error( monthIndex + " is not in the range of {0,11}. Please pass a number in the range {0,11}." );
        }
        
        var months = ["January",
                      "February",
                      "March",
                      "April",
                      "May",
                      "June",
                      "July",
                      "August",
                      "September",
                      "October",
                      "November",
                      "December"];
        return months[monthIndex];
    }
};