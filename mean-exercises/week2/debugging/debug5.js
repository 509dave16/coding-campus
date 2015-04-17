// Goal: write a function that adds all the arguments it receives
 
var total = add(13, 47, 53, 'car'); // do not change this line
//console.log(total); 
function add() {
  var result = 0;
  while (arguments.length > 0) {
    var value =  Array.prototype.pop.call(arguments);
    //console.log(value);
    if(typeof value === "number")
    {
        result += value;
    }
  }
  return result;
}
 
// do not change this code 
if (total != 113) console.log('fail');
else console.log('succeed');
// do not change this code