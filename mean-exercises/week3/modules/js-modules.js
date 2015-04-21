var Months = require("./months.js");
var StringOperations = require("./string-operations.js");
var MathOperations = require("./math-operations.js");

//Part 2
console.log("Testing Months module.");
for(var monthIndex = 0; monthIndex < 12; monthIndex++)
{
    var monthName = Months.monthIndexToName(monthIndex);
    console.log("Month Index " + monthIndex + " is " + monthName + ".");
}

//Part 3
var myName = "David";
var stringWithDupes = "Hello";
var mySistersName = "hannah";
var myNameReversed = StringOperations.reverse(myName);
var myNameWithoutLowerCase = StringOperations.removeLowercaseLetters(myName);
var stringWithoutDupes = StringOperations.removeConsecutiveDuplicates(stringWithDupes);
console.log("My name " + myName + " reversed: " + myNameReversed );
console.log("My name " + myName + " without lowercase letters: " + myNameWithoutLowerCase);
console.log("String with duplicate letters removed: Before -> " + stringWithDupes + ", After: " + stringWithoutDupes);
console.log("Is " + mySistersName + " a palindrome? " + StringOperations.isPalindrome(mySistersName));

//Part 4
var numbers = [1,2,3,4];
var average = MathOperations.numberArrayAverage(numbers);
var matrix1 =
[
    [2,4,7],
    [9,5,8],
    [13,8,3]
];

var matrix2 =
[
    [6,5,7],
    [10,2,1],
    [19,22,31]
];
var wordNumber = "seventy-seven";
console.log("Average of " + numbers + ": " + average);
console.log("Sum of two matrices: " + MathOperations.addMatrices(matrix1,matrix2));
console.log("Quadratic Equation Result for a=2, b=4, c=3 -> ", MathOperations.quadraticEquation(2,4,3));
console.log("5 Facorial: " + MathOperations.nFactorial(5));
console.log(wordNumber + " is " + MathOperations.wordNumberToInteger(wordNumber) + " as an integer.");