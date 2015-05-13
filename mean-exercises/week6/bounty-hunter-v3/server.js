var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Bounty = require("./bounty.js");
//console.log(Bounty);
//var connectionString = 'mongodb://127.0.0.1:27017/test';

app.use(bodyParser.json());

/*************
Bounty Hunter HTTP protocol routes from 05/05/2015
**************/
var bounties = [];

//Create new Bounty
app.post("/bounty",
    function(request,response)
    {   
       var bounty = request.body;
       var newBounty = new Bounty(bounty);
        newBounty.save(
            function(error,data)
            {
                response.send(data);
            }
        );
    }   
);

//Retrieve all Bounties
app.get("/bounties",
    function(request,response)
    {
        Bounty.find({},
            function(error,data)
            {
                response.send(data);
            }
        );
    }
);

//Update Bounty
app.put("/bounty/:bountyID",
    function(request, response)
    {
        var _id = request.params.bountyID;
        Bounty.update({"_id":_id},request.body,
            function(error, raw)
            {
                response.send(raw);
            }
        );
    }
);

//Delete Bounty
app.delete("/bounty/:bountyID",
    function(request, response)
    {
        var _id = request.params.bountyID;
        Bounty.findOne({"_id":_id},
            function(error,data)
            {
                data.remove(
                    function(error)
                    {
                        response.send('Bounty has been retired.');
                    }
                );
            }
        );
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