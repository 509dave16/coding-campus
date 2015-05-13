var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var fs = require('fs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', function(req,res)
{
	if(!req.cookies.submittedEmail)
	{
		homePage(req,res);
	}
	else
	{
		emailPage(res, req.cookies.submittedEmail);
	}
});

app.post('/mailinglist', function(req,res)
{
	var email = req.body.email;
	res.cookie('submittedEmail', email);
	emailPage(res,email);
});


function homePage(req,res)
{
	fs.readFile('./index.html', function(err,data)
	{
		data = data.toString();
		res.header('content-type','text/html');
		res.send(data);
	});
}

function emailPage(res,email)
{
	fs.readFile('./thankyou.html', function(err,data)
	{
		data = data.toString();
		res.header('content-type','text/html');
		res.send(data.replace('*email*', email));
	});
}

app.listen(8080);
