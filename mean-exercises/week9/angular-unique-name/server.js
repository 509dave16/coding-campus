/**
 * Created by rise4031 on 6/3/15.
 */
var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.static(__dirname + "/public"));
app.listen(PORT);
console.log('Listening on port ' + PORT);