//Part 1
function Person(name, street, city, state, zip, score)
{
    this.name = name === undefined ? "" : name;
    this.street = street === undefined ? "" : street;
    this.city = city === undefined ? "" : city;
    this.state = state === undefined ? "" : state;
    this.zip = zip === undefined ? "" : zip;
    this.score = score === undefined ? "" : score;
    this.setProperties = function(properties)
    {
        for(var propertyKey in properties)
        {
            if(typeof this[propertyKey] !== "function")
            {
                var propertyValue = properties[propertyKey];
                this[propertyKey] = propertyValue;
            }
        }
    };
    
    //Part 2
    this.copyPerson = function()
    {
        var copiedPerson = new Person();
        for(var key in this)
        {
            if(typeof this[key] !== "function")
            {
                copiedPerson[key] = this[key];
            }
        }
        return copiedPerson;
    };
    
    
}

Person.prototype.toString = function ()
{
    var output = "[ ";
    var firstElement = true;
    for(var key in this)
    {
        if(typeof this[key] !== "function")
        {
            if(firstElement === false)
            {
                output +=  ", ";
            }
            else
            {
                firstElement = false;
            }
            output += key + " : " + this[key].toString();
        }
    }
    output += " ]";
    return output;
};

Person.prototype.whoAmI = function()
{
    console.log("My name is " + this.name + "!");
};

Person.prototype.whereAmIFrom = function()
{
    console.log("I am from " + this.city + ", " + this.state + "!");  
};

var inputReader = require('readline-sync');
var personProperties = ["name","street","city","state","zip","score"];
var person = new Person();
for(var personPropertyIndex = 0; personPropertyIndex < personProperties.length; personPropertyIndex++)
{
    var personProperty = personProperties[personPropertyIndex];
    var value = inputReader.question("What's your " + personProperty + "? ");
    person[personProperty] = value;
}

console.log("Original Person:\n" + person);
var copiedPerson = person.copyPerson();
copiedPerson.name = "Isaac";
console.log("Cloned Person with new name:\n" + copiedPerson);
console.log("Original Person Unchanged:\n" + person);

//Part 3
function convertObjectKeysToStrIndexes(object)
{
    var index = 0;
    for(var key in object)
    {
        if(typeof this[key] !== "function")
        {
            var value = object[key];
            delete object[key];
            object[index + ""] = value;
            index++;
        }
    }
}

convertObjectKeysToStrIndexes(copiedPerson);
console.log("Cloned person's properties converted from named to index strings:\n"+copiedPerson);

//Part 4
var names = ["David","Ervin","Tami","Sarah"];
var contestants = [];
var maximumScore = 10;
for(var nameIndex = 0; nameIndex < names.length; nameIndex++)
{
    var name = names[nameIndex];
    var contestant = new Person(name);
    contestant.score = Math.round(Math.random() * maximumScore);
    contestants.push(contestant);
}

function findNthPlacer(contestants, place)
{
    //Array indexing starts 0, so subtract 1
    place -= 1;
    var sortedAscContestants = contestants.sort(
        function(thisContestant, thatContestant)
        {
            return thisContestant.score - thatContestant.score;
        }
    );
    return sortedAscContestants[place];
}
//Find first, second, third place, etc.. contestants.
console.log("Contestants:\n" + contestants);
console.log("Second place: " + findNthPlacer(contestants,2)); 

//Part 5
var people = [
  {
    name: 'Chewy',
    city: 'Provo'
  },
  {
    name: 'Obiwan',
    city: 'Tucson'
  },
  {
    name: 'Luke',
    city: 'Tatooine'
  },
  {
    name: 'Vader',
    city: 'Provo'
  },
  {
    name: 'Leia',
    city: 'Provo'
  }
];

function peopleFromCity(people, city)
{
    var namesOfPeople = [];
    for(var personIndex = 0; personIndex < people.length; personIndex++)
    {
        var person = people[personIndex];
        if(person.city === city)
        {
            namesOfPeople.push(person.name);
        }
    }
    return namesOfPeople;
}
console.log("People from Provo: " + peopleFromCity(people,"Provo"));

//Part 6
var persons = [];
persons[0] = new Person("David Fall","Coders Way","Spokane","WA","99208","3");
persons[1] = new Person("Robert Mosley","Reef Way","Brisbane","Queensland","2736545","5");
persons[2] = new Person("Jermaine Lindsay","Bronco Way","Denver","Colorado","4747","7");
persons[3] = new Person("Kenny Chamberline","Pike Way","Seattle","Washington","23479","6");
persons[4] = new Person("Evin Sayre","Hick Way","Lewiston","Idaho","27635","9");

for(var personIndex = 0; personIndex < persons.length; personIndex++)
{
    var person = persons[personIndex];
    person.whoAmI();
    person.whereAmIFrom();
}