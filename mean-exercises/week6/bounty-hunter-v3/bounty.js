var mongoose = require('mongoose');
mongoose.connect('mongodb://dfall:mytestdb@ds034348.mongolab.com:34348/dsf_test');
var Schema = mongoose.Schema;

var bountySchema = new Schema(
	{
	  "FirstName" : String,
	  "LastName" : String,
	  "Living" : Boolean,
	  "BountyPrice" : Number,
	  "Type" : String
	}
);

var Bounty = mongoose.model('bounties',bountySchema);
module.exports = Bounty;