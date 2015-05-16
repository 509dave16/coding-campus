var mongoose = require('mongoose');
mongoose.connect('mongodb://dfall:mytestdb@ds034348.mongolab.com:34348/dsf_test');
var Schema = mongoose.Schema;

var favoriteSongSchema = new Schema(
	{
		"name" : String,
		"artist" : String,
		"popularity" : Number,
		"timestamp" : Date	
	}
);

var FavoriteSong = mongoose.model('favorite-songs', favoriteSongSchema);
module.exports = FavoriteSong;