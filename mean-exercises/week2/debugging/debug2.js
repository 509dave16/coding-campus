// Goal: calculate the nth fibonacci number
// 1 + 1 + 2 + 3 + 5 + 8 + 13 + ...
 
var n = 8;
 
var fibonacci_number = 1;
var previous = 0;
 
for (var i = 2; i <= n; i++) {
  var tmp = fibonacci_number;
  fibonacci_number += previous;
  previous = tmp;
}
 
// do not change this code 
if (fibonacci_number !== 21) console.log('fail');
else console.log('succeed');
// do not change this code