//Part 1
function add(operand1, operand2)
{
    return operand1 + operand2;
}


//Part 2
var maxNumber = function(number1,number2,number3)
{
    var largestNumber = 0;
    var number = 0;
    for(var argumentIndex = 0; argumentIndex < arguments.length; argumentIndex++)
    {
        number = arguments[argumentIndex];
        if(argumentIndex === 0)
        {
            largestNumber = number;
        }
        else
        {
            if(number > largestNumber)
            {
                largestNumber = number;
            }
        }
    }
    return largestNumber;
};


//Part 3
function numberParity(number)
{
    return number % 2 === 0 ? 'even' : 'odd';
}


//Part 4
var parseString = function(string)
{
   var parsedString = "";
   if(string.length > 20)
   {
       parsedString = string.substring(0,string.length/2);
   }
   else
   {
       parsedString = string + string;
   }
   return parsedString;
};


//Part 5
function fibonacciSeries(seriesCount)
{
    var count = 0;
    var sum = 1;
    if(seriesCount < 2)
    {
        sum = 0;
        for(; count <= seriesCount; count++)
        {
            console.log("F("+count+"):" + count);
            sum += count;
        }
    }
    else
    {
        count = 0;
        for(; count < 2; count++)
        {
            console.log("F("+count+"):" + count);
        }
        var lastTwoFN = [0,1];
        for(count = 1; count < seriesCount; count++)
        {
            var nextFN = lastTwoFN[0] + lastTwoFN[1];
            sum += nextFN;
            console.log("F("+(count+1)+"):" + nextFN);
            lastTwoFN.shift();
            lastTwoFN.push(nextFN);
        }
    }
    return sum;
}


//Part 6
var quadraticEquation = function(a,b,c)
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



function mostFrequentLetter(string)
{

    var string = string.toLowerCase();
    var letterCounters = [];
    var letterCounterIndex = 0;
    for(var stringIndex = 0; stringIndex < string.length; stringIndex++)
    {
        var charCode = string.charCodeAt(stringIndex);
        if(charCode >= 97 && charCode <= 122)
        {
            letterCounterIndex = charCode - 97;
            if( typeof letterCounters[letterCounterIndex] === "undefined")
            {
                letterCounters[letterCounterIndex] = 0;
            }
            letterCounters[letterCounterIndex] += 1;
        }
    }
    
    var maxCount = 0;
    var maxCountIndex = 0;
    for(letterCounterIndex = 0; letterCounterIndex < letterCounters.length; letterCounterIndex++)
    {
        if(typeof letterCounters[letterCounterIndex] !== "undefined")
        {
            var count = letterCounters[letterCounterIndex]
            if(letterCounterIndex === 0)
            {
                maxCount = count;
            }
            else
            {
                if(count > maxCount)
                {
                    maxCount = count;
                    maxCountIndex = letterCounterIndex;
                }
            }
        }
    }
    return String.fromCharCode(maxCountIndex + 97);
}


//Debug Logging Statements
/*console.log("Sum of Two Numbers: " + add(2,2));
console.log("Largest Number: " + maxNumber(9,82,56));
console.log("Parsed string when less than 20 characters: " + parseString("David"));
console.log("Parsed string when more than 20 characters: " + parseString("I love learning at Coding Campus!"));
console.log("Even Parity: " + numberParity(2));
console.log("Odd Parity: " + numberParity(1));
console.log("Sum of F(1) series: " + fibonacciSeries(1));
console.log("Sum of F(8) series: " + fibonacciSeries(22));
console.log("Quadratic Equation Values: " + quadraticEquation(2,4,3));
console.log("Most frequent letter: " + mostFrequentLetter("David"));*/