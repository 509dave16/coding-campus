// Goal: replace the second letter of any string with a 'z'
 
var string = 'abc';
string = replace_letter(string);
 
function replace_letter(word) {
  var charArray = word.split('');
  charArray[1] = 'z';
  word = charArray.join('');
  //word[1] = 'z';
  return word;
}
 
// do not change this code 
if (string[1] != 'z') console.log('fail');
else console.log('succeed');
// do not change this code