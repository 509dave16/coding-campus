var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bountySchema = new Schema({
  firstName: String,
  lastName: String,
  living: Boolean,
  bountyAmt: Number,
  type: String // Sith or Jedi
});

var Bounty = mongoose.model('Bounty', bountySchema);

module.exports = Bounty;