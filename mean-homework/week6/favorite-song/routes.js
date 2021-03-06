var express = require('express');
var FavoriteSong = require('./favorite-song.js');

var router = express.Router();
module.exports = exports = router;

router.get('/', function (req, res) {  
  res.redirect('/home');
});

router.get('/home', function (req, res) {  
  res.render('home', {title: "What's your favorite song?"});
});

router.get('/popular', function (req, res) {  
  FavoriteSong.find({},
  	function(error, favoriteSongs)
  	{
		  var popularSongs = favoriteSongs.sort(
		  		function(a,b)
		  		{
		  			return b.popularity - a.popularity;
		  		}
		  );
		  res.render('list', {tracks:popularSongs,title:"Popular"});
  	}
  );
});

router.get('/newest', function (req, res) {  
  FavoriteSong.find({},
  	function(error, favoriteSongs)
  	{
		  var newestSongs = favoriteSongs.sort(
		  		function(a,b)
		  		{
		  			return b.timestamp - a.timestamp;
		  		}
		  );
		  res.render('list', {tracks:newestSongs,title:"Newest"});
  	}
  );
});

router.get('/random', function (req, res) {  
	FavoriteSong.find({},
  	function(error, favoriteSongs)
  	{
		  var randomIndex = Math.floor(Math.random() * favoriteSongs.length);
		  var randomSong = favoriteSongs[randomIndex];
		  res.render('single', 
		  	{
		  	 track: randomSong.name,
		  	 artist: randomSong.artist,
		  	 popularity: randomSong.popularity,
		  	 title:"Random"
		  	}
		  );
  	}
  );
});

router.post('/tracks', function (req, res){
	var name = req.body.track_name;
	var artist = req.body.artist_name;
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
						res.send(savedFavoriteSong);
					}
				}
			);
		}
	);
});
