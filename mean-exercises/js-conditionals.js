var inputReader = require('readline-sync');
//Part 1
console.log('You will be asked to enter two numbers!');
var firstNumber = inputReader.question('Please enter the first number: ');
var secondNumber = inputReader.question('Please enter the second number: ');
console.log( ( firstNumber > secondNumber ? secondNumber : firstNumber ) + ' is the smaller number!!!' );

//Part 2
var chosenCandidate = inputReader.question("Now let's vote for the president!\nYour candidates are: Me, Myself, and I.\nEnter the name of the candidate you would like to vote for: ");
var candidates = ['Me','Myself','I'];
var candidateVotes = [0,0,0];
var chosenCandidateIndex = candidates.indexOf(chosenCandidate);

var votes = candidateVotes[chosenCandidateIndex];
candidateVotes[chosenCandidateIndex] = votes + 1;
console.log("Here are the voting results: ");
for( var candidateIndex = 0; candidateIndex < candidates.length; candidateIndex++ )
{
    console.log( candidates[candidateIndex] + ' has ' + candidateVotes[candidateIndex] + ' vote(s)!');
}

//Part 3
var date = new Date();
var hour = date.getDate();
if(hour >= 0 && hour <= 10)
{
    console.log("Good morning!");
}
else if(hour >= 11 && hour <= 17)
{
    console.log("Good afternoon!");
}
else if(hour >= 18 && hour <= 20)
{
    console.log("Good evening!");
}
else if(hour >= 21 && hour <= "22")
{
    console.log("Good night!");
}
else
{
    console.log("What time of day is it exactly?");
}
