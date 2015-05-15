var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 8080;
var routes = require('./routes'); 
var expressHandlebars = require('express-handlebars');
app.engine('handlebars', expressHandlebars());  
app.set('view engine', 'handlebars');  

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bounty-hunter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/bounty', routes);

// error handling
app.use( function (req, res, next) {
  if (req.error) {
    switch(req.error) {
      case 'NOT FOUND':
        res.send('Bounty not found with id: ' + req.params.id);
        break;
      default:
        res.send(500);
    };
  } else {
    res.send('Invalid request');
  }
});

app.listen(PORT);
console.log('Listening on port ' + PORT);