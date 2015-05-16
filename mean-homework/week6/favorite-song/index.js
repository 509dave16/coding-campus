var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var routes = require('./routes.js');
var PORT = PORT || 8080;


app.use(express.static(__dirname + '/www'));  
app.engine('handlebars', handlebars({defaultLayout: 'main'}));  
app.set('view engine', 'handlebars'); 
app.use('/favorite-song/',routes);

app.get('/', function (req, res) {  
  res.render('home', {title: 'Page Title'});
});

app.listen(PORT);
console.log("Listening on Port: " + PORT);