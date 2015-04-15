//Part 1
var array = [1,2,3,4,5];
console.log("Second Number is: " + numberAt(array,1));
console.log("Array elements:");
printArray(array);
console.log("Sum of array elements: " + sumOfArrayValues(array));
removeLargestNumber(array);
console.log("Array with largest number removed: " + array );
addArrayNumberAverage(array);
console.log("Average of numbers in array added to array end: " + array);

function numberAt(array, index)
{
    return array[index];
}

function printArray(array)
{
    for(var index = 0; index < array.length; index++)
    {
        console.log(array[index]);
    }
}

function sumOfArrayValues(array)
{
    var sum = 0;
    for(var index = 0; index < array.length; index++)
    {
        sum += array[index];
    }
    return sum;
}


function removeLargestNumber(array)
{
    var maxNumber = 0;
    var maxNumberIndex = 0;
    for(var index = 0; index < array.length; index++)
    {
        var number =  array[index];
        if(index === 0 || number > maxNumber)
        {
            maxNumber = number;
            maxNumberIndex = index;
        }
    }
    
    array.splice(maxNumberIndex, 1);
}

function addArrayNumberAverage(array)
{
    var sum = sumOfArrayValues(array);
    var average = sum/array.length;
    array.push(average);
}


//Part 2
var string = "I'm learning Javascript at Coding Campus";
var stringArray = string.split(" ");
console.log("String split into array elements: " + stringArray);
var sortedStringArray = stringArray.sort();
console.log("Sorted array elements: " + sortedStringArray);
var rejoinedString = sortedStringArray.join(" ");
console.log("Rejoined sorted word string: " + rejoinedString);


//Part 3
function reverseString(string)
{
    if(string.length > 1)
    {
        var frontIndex = 0;
        var backIndex = string.length -1;
        var frontChar = '';
        var backChar = '';
        var charArray = [];
        
        while(frontIndex < backIndex)
        {
            frontChar = string[frontIndex];
            backChar = string[backIndex];
            charArray[frontIndex] = backChar;
            charArray[backIndex] = frontChar;
            frontIndex++;
            backIndex--;
        }
        
        if(string.length % 2 !== 0)
        {
            charArray[frontIndex] = string[frontIndex];
        }
        
        return charArray.join("");
    }
    {
        return string;
    }
}
console.log("String reversed: " + reverseString("David"));

//Part 4
function createMatrix(rows, columns)
{
   var operand = (rows+columns)/2;
   var matrix = [];
   for ( var rowIndex = 0; rowIndex < rows; rowIndex++ ) 
   {
     var row = [];
     for ( var columnIndex = 0; columnIndex < columns; columnIndex++ ) 
     {
        row.push(Math.round(Math.random() * operand));
     }
     matrix.push(row);
   }
   return matrix;
}

//Part 5
function printMatrix(matrix)
{
    var outputLines = "";
    for(var rowIndex = 0; rowIndex < matrix.length; rowIndex++)
    {
        var row = matrix[rowIndex];
        var outputLine = "";
        for(var columnIndex = 0; columnIndex < row.length; columnIndex++)
        {
            outputLine += row[columnIndex];
            if(columnIndex !== row.length - 1)
            {
                outputLine += " ";
            }
        }
        outputLines += outputLine;
        if(rowIndex !== matrix.length - 1)
        {
            outputLines += "\n";
        }
    }
    console.log(outputLines);
}

//Part 6
function scalarMatrix(matrix, scalar)
{
    for(var rowIndex = 0; rowIndex < matrix.length; rowIndex++)
    {
        var row = matrix[rowIndex];
        for(var columnIndex = 0; columnIndex < row.length; columnIndex++)
        {
            var value = row[columnIndex];
            row[columnIndex] = value * scalar;
        }
    }
}

var matrix = createMatrix(10,10);
console.log("N x N Created Matrix: ");
printMatrix(matrix);
scalarMatrix(matrix,2);
console.log("N x N Scalared Matrix: ");
printMatrix(matrix);

