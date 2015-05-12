var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var uuid = require('uuid');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var connectionString = 'mongodb://dfall:mytestdb@ds034348.mongolab.com:34348/dsf_test'; 
var util = require('util');
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
         MongoClient.connect(connectionString,function(err,db)
        {
            if(err) throw err;
            console.log("Creating");
            db.collection('bounties').insert(request.body,
                function(err,docs)
                {
                    console.log(docs.ops);
                    db.close();
                    if(err) throw err;
                    console.log("Successful Creation");
                    var responseData =
                    [
                        makeElement("The following bounty was added: ", "h1"),
                        buildResourceResponseList(docs.ops, " : ")
                    ].join("");
                    response.send(responseData);
                    
                }
            );
        });
    }   
);

//Retrieve all Bounties
app.get("/bounties",
    function(request,response)
    {
         MongoClient.connect(connectionString,function(err,db)
        {
            if(err) throw err;
            console.log("Getting");
            db.collection('bounties').find()
            .toArray
            (
                function(err,docs)
                {
                    console.log(docs);
                    db.close();
                    if(err) throw err;
                    console.log("Successful Getting");
                    var responseData =
                    [
                        makeElement("Below are the following bounties: ", "h1"),
                        buildResourceResponseList(docs, " : ")
                    ].join("");
                    response.send(responseData);
                }

            );
        });
    }
);

//Update Bounty
app.put("/bounty/:bountyID",
    function(request, response)
    {
        var updatedBountyValues = request.body;
        var id = request.params.bountyID;
        var bountyID = new ObjectId(id);
        console.log('before creation: ' + id);
        console.log('after creation: ');
        console.log(bountyID);
        MongoClient.connect(connectionString,function(err,db)
        {
            if(err) throw err;
            console.log("Updating");
            db.collection('bounties').updateOne({_id: bountyID}, updatedBountyValues,
                function(err,docs)
                {
                    console.log(docs);
                    if(err) throw err;
                    db.close();
                    console.log("Successful Updating");
                    response.send("Bounty was successfully updated!");
                }
            );
        });
    }
);

//Delete Bounty
app.delete("/bounty/:bountyID",
    function(request, response)
    {
        var id = request.params.bountyID;
        var bountyID = new ObjectId(id);
        console.log('before creation: ' + id);
        console.log('after creation: ');
        console.log(bountyID);
        MongoClient.connect(connectionString,function(err,db)
        {
            if(err) throw err;
            console.log("Deleting");
            db.collection('bounties').deleteOne({_id: bountyID},
                function(err,docs)
                {
                    console.log(docs);
                    if(err) throw err;
                    db.close();
                    console.log("Successful Deletion");
                    response.send("Bounty was successfully deleted!");
                }
            );
        });
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