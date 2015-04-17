// Goal: write a function that adds all the arguments it receives
 
var total = add(13, 47, 53);
 
function add() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}
 
// do not change this code 
if (total != 113) console.log('fail');
else console.log('succeed');
// do not change this code