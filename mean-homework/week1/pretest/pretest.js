var firstName = "David";
var lastName = "Fall";
console.log("lastName, firstName");

var max = 15
for(var counter = 1; counter <= 15; counter++)
{
    if(counter % 2 === 0)
    {
        console.log(counter + "*");
    }
    else
    {
        console.log(counter);
    }
}

function Person(name, age, height, hometown)
{
    var _name = name;
    var _age = age;
    var _height = height;
    var _hometown = hometown;
    
    this.printPerson = function()
    {
        var output = "";
        output += "name: " + _name + "\n";
        output += "age: " + _age + "\n";
        output += "height: " + _height + "\n";
        output += "hometown: " + _hometown;
        return output;
    }
}

var person = new Person("David Fall", "22", "5' 10''", "Spokane, Washington");
console.log(person.printPerson());