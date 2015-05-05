var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', 
    function(request, response)
    {
        response.send("You just responded to your own GET request!!!");
    }
);

app.get('/avengers',
    function(request, response)
    {
        response.send(
        "<h1 style='color:red'>The AVENGERS!!!</h1>" + 
        "<ul>" + 
            "<li style='color:green'>Hulk</li>" +
            "<li style='color:gray'>Iron Man</li>" + 
            "<li style='color:blue'>Captain America</li>" + 
            "<li style='color:black'>Black Widow</li>" + 
            "<li style='color:purple'>Hawkeye</li>" + 
        "</ul>");
    }
);

app.post('/uglykittens', function(request, response){
    response.send('<img src="' + request.body.catUrl + '"/>');
});

var bounties = [];

app.post("/bounty",
    function(request,response)
    {
        var bounty = request.body;
        bounties.push(bounty);
        response.send("Bounty Added!");
    }   
);

app.get("/bounties",
    function(request,response)
    {
        response.send(bounties);
    }
);

app.delete("/bounty",
    function(request, response)
    {
        var bountyToDelete = request.body;
        var firstName = bountyToDelete.FirstName;
        var lastName = bountyToDelete.LastName;
        var orginalLength = bounties.length;
        bounties = bounties.filter
        (
            function (bounty)
            {
                if(bounty.FirstName !== firstName || bounty.LastName !== lastName)
                {
                    return true;
                }
                return false;
            }
        );
        response.send(bounties.length !== orginalLength ? "You deleted a bounty" : "Bounty did not exist");
    }
);

app.put("/bounty",
    function(request, response)
    {
        var bountyToUpdate = request.body;
        var firstName = bountyToUpdate.FirstName;
        var lastName = bountyToUpdate.LastName;
        var bountiesUpdated = 0;
        bounties = bounties.map
        (
            function (bounty)
            {
                if(bounty.FirstName == firstName && bounty.LastName == lastName)
                {
                    for(var property in bountyToUpdate)
                    {
                        bounty[property] = bountyToUpdate[property];
                    }
                    bountiesUpdated++;
                }
                return bounty;
            }
        );
        response.send(bountiesUpdated + " bounties were updated!");
    }
);


{

}

app.listen(8000);
console.log('Server running and listening on port 8000');