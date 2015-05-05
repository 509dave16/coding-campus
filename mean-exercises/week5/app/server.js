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

app.post('/uglykittens',
    function(request, response)
    {
        response.send('<img src="' + request.body.catUrl + '"/>');
    }
);

app.listen(process.env.PORT, process.env.IP);
console.log('Server running and listening on port' + process.env.IP + " and IP " + process.env.IP);