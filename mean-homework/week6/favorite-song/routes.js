var express = require('express');
var FavoriteSong = require('./favorite-song.js');

var router = express.Router();
module.exports = exports = router;


router.get('/home', function (req, res) {  
  res.render('home', {title: "What's your favorite song?"});
});

router.get('/popular', function (req, res) {  
  
});

router.get('/newest', function (req, res) {  
  res.send('Newest Routes');
});

router.get('/random', function (req, res) {  
  
});

router.post('/tracks', function (req, res){
	console.log(req.body);
	var name = req.body.track_name;
	var artist = req.body.artist_name;
	console.log(name);
	console.log(artist);
	var where = {};
	where.name = name;
	where.artist = artist;

	FavoriteSong.findOne(where,
		function(error, favoriteSong)
		{
			if(!favoriteSong)
			{
				favoriteSong = new FavoriteSong();
				favoriteSong.popularity = 0;
			}
			favoriteSong.name = name;
			favoriteSong.artist = artist;
			favoriteSong.popularity++;
			favoriteSong.timestamp = new Date();
			favoriteSong.save(
				function(error,savedFavoriteSong)
				{
					if(savedFavoriteSong)
					{
						console.log(savedFavoriteSong);
						// res.render('',{});
						res.send(savedFavoriteSong);
					}
				}
			);
		}
	);
});
