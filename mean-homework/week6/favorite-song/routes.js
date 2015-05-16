var express = require('express');
var FavoriteSong = require('./favorite-song.js');

var router = express.Router();
module.exports = exports = router;


router.get('/', function (req, res) {  
  res.render('home', {title: 'Page Title'});
});

router.get('/popular', function (req, res) {  
  
});

router.get('/newest', function (req, res) {  
  
});

router.get('/random', function (req, res) {  
  
});

router.post('/tracks', function (req, res){
	
});
