var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Longboard = require('./longboards.js');
var PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/longboards", getLongboards);
app.post("/longboard", createLongboard);
app.get("/longboard/:longboardID",getLongboard);
app.put("/longboard/:longboardID", updateLongboard);
app.delete("/longboard/:longboardID", deleteLongboard);

function getLongboards(req,res)
{
    Longboard.find({},
        function(error,data)
        {
            res.send(data);
        }
    );
}

function getLongboard(req,res)
{
     var _id = req.params.longboardID;
    Longboard.findOne({"_id":_id},
        function(error, data)
        {
            res.send(data);
        }
    );
}
function createLongboard(req,res)
{
	var longboard = req.body;
	var newLongboard = new Longboard(longboard);
	newLongboard.save(
		function(error,data)
		{
		    res.send(data);
		}
	);
}

function updateLongboard(req,res)
{
	var _id = req.params.longboardID;
	var updatedLongboard = req.body;
	Longboard.update({'_id':_id},updatedLongboard,
		function(error, data)
        {
        	if(error) throw error;
        	getLongboard(req,res);
        }
	);
}

function deleteLongboard(req,res)
{
	var _id = req.params.longboardID;
	console.log(_id);
    Longboard.findOne({"_id":_id},
        function(error, data)
        {
        	console.log(data);
	        data.remove(
	            function(error)
	            {
	                res.send('Longboard deleted successfully');
	            }
	        );
        }
    );
}


app.listen(PORT);
console.log('Listening on port ' + PORT);


