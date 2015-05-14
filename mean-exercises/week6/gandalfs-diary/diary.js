var mongoose = require('mongoose');
mongoose.connect('mongodb://dfall:mytestdb@ds034348.mongolab.com:34348/dsf_test');
var Schema = mongoose.Schema;

var diarySchema = new Schema(
	{
	  "diaryOwner": String,
	  "text" : String
	}
);

var Diary = mongoose.model('diaries',diarySchema);
module.exports = Diary;