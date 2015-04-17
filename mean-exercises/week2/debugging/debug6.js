// Goal: multiply all numbers in an array together
 
var array = [1, 2, 3, 4, 5];
 
var product = 1;
for (var i = array.length - 1; i > -1; i--) {
  product *= array[i];
}
 
// do not change this code 
if (product != 120) console.log('fail');
else console.log('succeed');
// do not change this code