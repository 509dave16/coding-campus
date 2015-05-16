var express = require('express');
var FavoriteSong = require('./favorite-song.js');

var router = express.Router();
module.exports = exports = router;


router.get('/home', function (req, res) {  
  res.render('home', {title: 'Page Title'});
});
