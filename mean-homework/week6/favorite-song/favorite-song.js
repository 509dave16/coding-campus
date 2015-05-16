var mongoose = require('mongoose');
mongoose.connect('mongodb://dfall:mytestdb@ds034348.mongolab.com:34348/dsf_test');
var Schema = mongoose.Schema;

var favoriteSongSchema = new Schema(
	{
		"trackName" : String,
		"artist" : String,
		"submissionCount" : Number,
		"timeStamp" : Date	
	}
);

var FavoriteSong = mongoose.model('favorite-songs', favoriteSongSchema);
module.exports = FavoriteSong;