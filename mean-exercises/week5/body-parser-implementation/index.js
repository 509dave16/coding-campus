var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

var	bodyParser =	
{
	fromJson : function(req,res,next)
	{	
		var contentType = 'application/json';
		if(!parseInt(req.headers['content-length']))
		{
			req.body = {errorText : "No body content present in request"};
			next();
		}
		else if(req.headers['content-type'].toLowerCase() === contentType)
		{
			req.on('data', 
				function(data)
				{
					try
					{
						var decryptedData = data.toString();
						req.body = JSON.parse(decryptedData);
					}
					catch(error)
					{
						error.errorText = "Invalid " + contentType + " data";
						req.body = error;
					}
					next();
				}
			);
		}
		else
		{
			next();
		}
	},
	fromXForm : function(req,res,next)
	{		
		var contentType = 'application/x-www-form-urlencoded';
		console.log(req.headers['content-type'].toLowerCase());
		if(!parseInt(req.headers['content-length']))
		{
			req.body = {errorText : "No body content present in request"};
			next();
		}
		else if(req.headers['content-type'].toLowerCase() === contentType)
		{
			req.on('data',
				function(data)
				{
					var decryptedData = data.toString();
					if(decryptedData.indexOf("=") !== -1)
					{
						var object = {};
						var rawKeyValuePairs = decryptedData.split("&");
						for(var pairIndex = 0; pairIndex < rawKeyValuePairs.length; pairIndex++)
						{
							var pair = rawKeyValuePairs[pairIndex];
							if(pair !== "")
							{
								var keyAndValue = pair.split("=");
								var key = keyAndValue[0];
								var value = keyAndValue[1];
								object[key] = value;
							}
						}
						console.log(object);
						req.body = object;
					}
					else
					{
						req.body = {errorText : "Invalid " + contentType + " data"};
					}
					next();
				}
			);
		}
		else
		{
			next();
		}
	},
	notSupported : function(req,res,next)
	{
		if(!req.body)
		{
			req.body = {errorText:"Data does not match any content type that's supported."};
		}
		next();
	}
};

app.use(bodyParser.fromJson);
app.use(bodyParser.fromXForm);
app.use(bodyParser.notSupported);


app.post("/",
	function(req,res,next)
	{
		res.send(req.body);
	}
);

app.use(
	function(req,res,next)
	{
		res.send("Invalid request");
	}
);


app.listen(PORT);
console.log("Listening on port " + PORT);