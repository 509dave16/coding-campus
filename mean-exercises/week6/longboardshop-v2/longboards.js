var mongoose = require('mongoose');
mongoose.connect('mongodb://dfall:mytestdb@ds034348.mongolab.com:34348/dsf_test');
var Schema = mongoose.Schema;

var longboardSchema = new Schema(
	{
	  "brand": String,
	  "name" : String,
	  "length": Number,
	  "style" : String,
	  "price" : Number,
	  "bottom_img_url" : String,
	  "top_img_url" : String
	}
);

var Longboard = mongoose.model('longboards',longboardSchema);
module.exports = Longboard;