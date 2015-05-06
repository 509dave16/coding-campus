var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var uuid = require('uuid');

app.use(bodyParser.json());

/*************
Example HTTP protocol routes from 05/04/2015
**************/
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


/*************
Bounty Hunter HTTP protocol routes from 05/05/2015
**************/
var bounties = [];

//Create new Bounty
app.post("/bounty",
    function(request,response)
    {
        var bounty = request.body;
        bounty.id = uuid.v1();
        bounties.push(bounty);
        var responseData =
        [
            makeElement("The following bounty was added: ", "h1"),
            buildResourceResponse(bounty, " : ")
        ].join("");
        response.send(responseData);
    }   
);

//Retrieve all Bounties
app.get("/bounties",
    function(request,response)
    {
        var responseData = makeElement("Below are the following bounties: ","h1");
        responseData += buildResourceResponseList(bounties," : ");
        response.send(responseData);
    }
);

//Update Bounty
app.put("/bounty/:bountyID",
    function(request, response)
    {
        var updatedBountyValues = request.body;
        var bountyID = request.params.bountyID;
        var updatedBounty = undefined;
        for(var bountyIndex = 0; bountyIndex < bounties.length; bountyIndex++)
        {
            var bounty = bounties[bountyIndex];
            if(bounty.id === bountyID)
            {
                for(var property in updatedBountyValues)
                {
                    if(bounty[property] !== undefined)
                    {
                        bounty[property] = updatedBountyValues[property];
                    }
                }
                updatedBounty = bounty;
                break;
            }
        }
        var responseData = "";
        if(updatedBounty !== undefined)
        {
            responseData = 
            [
                makeElement("You updated the following bounty: ", "h1"),
                buildResourceResponse(updatedBounty, " : ")
            ].join("");
        }
        else
        {
            responseData = makeElement("Bounty to update was not found for id: " + bountyID, "h1");
        }

        response.send(responseData);
    }
);

//Delete Bounty
app.delete("/bounty/:bountyID",
    function(request, response)
    {
        var bountyID = request.params.bountyID;
        var deletedBounty = undefined;
        for(var bountyIndex = 0; bountyIndex < bounties.length; bountyIndex++)
        {
            var bounty = bounties[bountyIndex];
            if(bounty.id === bountyID)
            {
                deletedBounty = bounty;
                bounties.splice(bountyIndex,1);
                break;
            }
        }
        var responseData = "";
        if(deletedBounty !== undefined)
        {
            responseData = 
            [
                makeElement("You deleted the following bounty:","h1"),
                buildResourceResponse(deletedBounty, ' : ')
            ].join("");
        }
        else
        {
            responseData = makeElement("Bounty to delete was not found for id: " + bountyID, "h1");
        }
        response.send(responseData);
    }
); 

/**
 * This function will return string that represents an html element based on the
 * innerHTML to be nested in the element and the elementType
 * @param  {string} innerHTML   represents the content to be nested within the element
 * @param  {string} elementType the type of html element(e.g. h1,p,li, etc..)
 * @return {string}             an HTML element as a string
 */
function makeElement(innerHTML, elementType)
{
    return "<" + elementType + ">" + innerHTML + "</" + elementType + ">";
}

/**
 * This function will build a html list of property/value pairs
 * for an object(a.k.a. resource).
 * @param  {object} resource               an object
 * @param  {string} propertyValueSeparator a separator for an objects property/value pairs
 * @return {string}                        a string representation of an html list
 */
function buildResourceResponse(resource, propertyValueSeparator)
{
    var responseData = "<ul>";
    for(var property in resource)
    {
        responseData += makeElement(property + propertyValueSeparator + resource[property], "li");
    }
    responseData += "</ul>";
    return responseData;
}

/**
 * This function will built an html document based off an array of objects
 * @param  {array} resources               an arrary of objects
 * @param  {string} propertyValueSeparator a separator for an objects property/value pairs
 * @return {string}                        a string representation of a set of html lists
 */
function buildResourceResponseList(resources, propertyValueSeparator)
{
    var responseData = "<p>";
    for(var resourceIndex = 0; resourceIndex < resources.length; resourceIndex++)
    {
        var resource = resources[resourceIndex];
        responseData += buildResourceResponse(resource, propertyValueSeparator);
    }
    responseData += "</p>";
    return responseData;
}

app.listen(8000);
console.log('Server running and listening on port 8000');