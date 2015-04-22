var inputReader = require('readline-sync');
var intervalID = undefined;
var timeoutID = undefined;
var lastTime = undefined;
function Monster(name,type,health)
{
    var responses  = ['Feed','Pet','Kick'];
    var status = ['is hungry','feels neglected','soiled the furniture'];
    var statusIndex = -1;
    this.name = name;
    this.type = type;
    this.health = health === undefined ? 100 : health;
   
    
    this.getStatus = function()
    {
        statusIndex = Math.floor(Math.random() * responses.length);
        return status[statusIndex];
    };
    
    this.decreaseHealth = function(decrement)
    {
        this.health -= decrement === undefined ? 10 : decrement;
    };
    
    this.reactToResponse = function(responseIndex)
    {
        if((responseIndex-1) === statusIndex)
        {
            this.health = 100;
        }
        else
        {
            console.log("Waaaaaaahhh");
        }
    };
    
    this.availableReponses = function()
    {
        var output = "";
        for(var index = 0; index < responses.length; index++)
        {
            var value = responses[index];
            output += (index+1) + ". " + value + " " + this.name;
            if(index !== responses.length - 1)
            {
                output += "\n";
            }
        }
        return output;
    };
}



function driver()
{

    var monsterType = getRandomMonsterType();
    console.log("Your monster is a " + monsterType + "!");
    var monsterName = inputReader.question("What would you like to call it? ");
    var monster = new Monster(monsterName,monsterType);
    //timeoutID = setTimeout(respondToMonsterStatus,5000,monster);
    lastTime = new Date();
    intervalID = setInterval(respondToMonsterStatus,5000,monster);
}

function getRandomMonsterType()
{
    var monsterTypes = ['Furry Monster','Slimey Monster','Stinky Monster','Spiky Monster','Bouncy Monster'];
    var monsterType = monsterTypes[Math.round(Math.random() * 5)];
    return monsterType;
}

function respondToMonsterStatus(monster)
{
    monster.decreaseHealth();
    if(monster.health <= 0)
    {
        clearInterval(intervalID);
        //clearTimeout(timeoutID);
        console.log("You monster " + monster.name + " DIEEEEEEEEEEEED!!!");
    }
     else
    {
        var tmp = new Date();
        console.log(tmp.getTime() - lastTime.getTime());
        lastTime = tmp;
        console.log("Your monster " + monster.name + " has " + monster.health + " health!");
        console.log(monster.name + " " + monster.getStatus());
        console.log(monster.availableReponses());
        var chosenResponseIndex = parseInt(inputReader.question("Please enter a number corresponding to the response you want -> "));
        monster.reactToResponse(chosenResponseIndex);
        //timeoutID = setTimeout(respondToMonsterStatus,5000,monster);
    }

}
driver();