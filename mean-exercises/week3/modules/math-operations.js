function MathOperations()
{
    this.numberArrayAverage = function(array)
    {
        var sum = 0;
        for(var index = 0; index < array.length; index++)
        {
            sum += array[index];
        }
        return sum/array.length;
    };
    
    this.addMatrices = function(matrix1, matrix2)
    {
        var resultMatrix = [];
        for(var rowIndex = 0; rowIndex < matrix1.length; rowIndex++)
        {
            var row1 = matrix1[rowIndex];
            var row2 = matrix2[rowIndex];
            var resultRow = [];
            for(var columnIndex = 0; columnIndex < row1.length; columnIndex++)
            {
                 var value1 = row1[columnIndex];
                 var value2 = row2[columnIndex];
                 resultRow.push( value1 + value2 );
            }
            resultMatrix.push(resultRow);
        }
        return resultMatrix;
    };
    
    this.quadraticEquation = function(a,b,c)
    {
        b = b * -1;
        c = c * -1;
        var valueToSquareRoot = Math.pow(b,2) + (-4*a*c);
        var commonQuotientPart = Math.sqrt(valueToSquareRoot);
        var quotient1 = -b + commonQuotientPart;
        var quotient2 = -b - commonQuotientPart;
        var divisor = 2*a;
        var xValues = [];
        xValues[0] = quotient1/divisor;
        xValues[1] = quotient2/divisor;
        return xValues;
    };
    
    this.nFactorial = function(n)
    {
        var result = 1;
        for(var number = 1; number <= n; number++)
        {
            result *= number;
        }
        return result;
    };
    
    this.wordNumberToInteger = function(stringNumber)
    {
      if(stringNumber === "one-hundred")
      {
          return 100;
      }
      var placeValues =  
      {"one":1,"two":2,"three":3,"four":4,"five":5,"six":6,"seven":7,"eight":8,"nine":9,"ten":10,"twenty":20,"thirty":30,"forty":40,"fifty":50,"sixty":60,"seventy":70,"eighty":80,"ninety":90};
      var places = stringNumber.split("-");
      var sum = 0;
      for(var placeIndex = 0; placeIndex < places.length; placeIndex++)
      {
          sum += placeValues[places[placeIndex]];
      }
      return sum;
    };
    
}


module.exports = exports = new MathOperations();