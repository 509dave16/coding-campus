var mongoose = require('mongoose');
mongoose.connect('mongodb://dfall:mytestdb@ds034348.mongolab.com:34348/dsf_test');
var Schema = mongoose.Schema;

var friendSchema = new Schema(
	{
		name: String,
		age: Number,
		interests: [String],
		friends: [String]	
	}
);

var Friend = mongoose.model('Friend',friendSchema);
// var newFriend = new Friend(
// 	{
// 		name: "David",
// 		age: 19, 
// 		interests: ['unicorn riding','bounty hunting']
// 	}
// );
//newFriend.save();

Friend.findOne({name:"David"}, 
	function(error,friend)
	{
		//console.log(friend);
		friend.age += 4;
		friend.save(
			function(error,data)
			{
				console.log(data);
			}
		);
	}
);

