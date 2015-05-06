var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var uuid = require('uuid');

app.use(bodyParser.json());

var people = [{FirstName: "Juan", LastName: 'Gonzales', age: 23}];

app.get("/cincodemayo", 
	function(request,response)
	{
		response.send(people);
	}
);

app.get('/cincodemayo/:personId', 
	function(request, response)
	{
		var personId = request.params.personId;
		var foundPerson = undefined;
		for(var personIndex = 0; personIndex < people.length; personIndex++)
		{
			var person = people[personIndex];
			if(person.id === personId)
			{
				foundPerson = person;
				break;
			}
		}
		if(foundPerson !== undefined)
		{
			response.send(foundPerson);
		}
		else
		{
			response.send('Person could not be found!');
		}
	}
);


app.post("/cincodemayo",
	function(request, response)
	{	var newPerson = request.body;
		newPerson.id = uuid.v1(); 
		people.push(newPerson);
		response.send("Success fully added " + newPerson.FirstName + "!");
	}
);

app.put("/cincodemayo",
	function(request, response)
	{
		var newPersonValues = request.body;
		var updatedPerson = false;
		for(var personIndex = 0; personIndex < people.length; personIndex++)
		{
			var person = people[personIndex];
			if(person.FirstName === newPersonValues.FirstName)
			{
				person.LastName = newPersonValues.LastName;
				updatedPerson = true;
				break;
			}
		}
		if(updatedPerson)
		{
			response.send("Updated Person: " + newPersonValues.FirstName);
		}
		else
		{
			response.send("Could not find person to update!");
		}
	}
);
app.listen(8000);