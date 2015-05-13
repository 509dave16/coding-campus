var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var uuid = require('uuid');
var app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(function(req,res)
{
	console.log(req.cookies);
	var message = "";
	if(!req.cookies.snickerDoodle)
	{
		var snickerDoodle = uuid.v1();
		message = "You don't have a snicker doodle cookie!";
		res.cookie('snickerDoodle',snickerDoodle);
	}
	else
	{
		message = 'Your snicker doodle cookie id is ' + req.cookies.snickerDoodle;
	}
	res.send(message);
});

app.listen(8080);