var inputReader = require("readline-sync");
//Part 1
var enteredString = inputReader.question("Please enter any number of characters you'd like: ");
console.log("Here is what you entered one character at a time:");
for(var stringIndex = 0; stringIndex < enteredString.length; stringIndex++)
{
    console.log(enteredString[stringIndex]);
}

//Part2
enteredString = inputReader.question("I implore you to enter some more characters: ");
var enteredCharacter = inputReader.question("Now I would like you to enter one character: ");
var foundIndex = -1;
if(enteredCharacter.length > 1 || enteredCharacter.length < 1)
{
    console.log("You did not enter one character!");
}
else
{
    for(stringIndex = 0; stringIndex < enteredString.length; stringIndex++)
    {
        if(enteredString[stringIndex] === enteredCharacter)
        {
            foundIndex = stringIndex;
            break;
        }
    }
    if(foundIndex !== -1)
    {
        console.log("The character you entered was found at this position in the previous set of characters you entered:  " + foundIndex);
    }
    else
    {
        console.log("Sorry the character you entered was not found at any position in the previous set of characters you entered");
    }
}

//Part 3
var entered42 = false;
while(entered42 === false)
{
    enteredString = inputReader.question("Please enter a number(hint: I won't stop asking you to enter a number until 42 is entered): ");
    var enteredNumber = parseInt(enteredString);
    if(enteredNumber === 42)
    {
        entered42 = true;
    }
}

//Part 4
console.log("You are about to be asked to enter 10 numbers!");
var countOfNumbersToEnter = 10;
var maxNumber = -1;
for(var count = 1; count <= countOfNumbersToEnter; count++)
{
    enteredString = inputReader.question("Please enter number " + count + ": ");
    enteredNumber = parseInt(enteredString);
    if(count === 1)
    {
        maxNumber = enteredNumber;
    }
    else if(enteredNumber > maxNumber)
    {
        maxNumber = enteredNumber;
    }
}
console.log("This was the largest number you entered: " + maxNumber);



