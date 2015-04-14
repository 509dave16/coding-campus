var inputReader = require('readline-sync');
var choices = ['paper','rock','scissors'];

console.log("Let's play Rock/Paper/Scissors with the computer!");
var answer  = inputReader.question("Please enter your choice of an implement(Rock, Paper, or Scissors): ");
var userChoice = validateUserChoice(answer);
var computerChoice = getComputerChoice();
console.log("Computer chooses to use: " + computerChoice);

var user = 
{ 
    name : "You",
    choice : userChoice
};

var computer = 
{ 
    name : "Computer",
    choice : computerChoice
};

var resolution = resolveRPSChoices(user, computer);

if(resolution === "Tie")
{
    console.log( user.name + " tied with the " + computer.name + "!");
}
else
{
    console.log(resolution + " won!!!");
}

function validateUserChoice(userChoice)
{
    userChoice = userChoice.trim().toLowerCase();
    var foundIndex = -1;
    var choiceIndex = 0;
    var choice = "";
    for(; choiceIndex < choices.length; choiceIndex++)
    {
        choice = choices[choiceIndex];
        foundIndex = choice.search(userChoice);
        if(foundIndex === 0)
        {
            userChoice = choice;
            break;
        }
    } 
    return userChoice;
}

function getComputerChoice()
{
    var computerChoiceIndex = Math.ceil( Math.random() * 3 ) % 3;
    var computerChoice = choices[computerChoiceIndex];
    return computerChoice;
}

function resolveRPSChoices(user1, user2)
{
    var choice1Index = choices.indexOf(user1.choice);
    var choice2Index = choices.indexOf(user2.choice);
    
    if(Math.abs(choice1Index-choice2Index) === choices.length - 1)
    {
        return choice1Index > choice2Index ? user1.name : user2.name;
    }
    else if(choice1Index === choice2Index)
    {
        return "Tie";
    }
    else
    {
        return choice1Index > choice2Index ? user2.name : user1.name;
    }
}