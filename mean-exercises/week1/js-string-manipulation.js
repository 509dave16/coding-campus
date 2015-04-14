//Questions and stored answers
var inputReader = require('readline-sync');
var name =  inputReader.question('What is your name? ');
var age = inputReader.question('What is your age? ');
var favoriteColor = inputReader.question('What is your favorite color? ');
var description = inputReader.question('Tell me a little bit about your aspirations: ');
//Output statemetns
console.log('\nThis is what your name looks like in upper case: ' + name.toUpperCase());
console.log('The length of your name is ' + name.length + ' characters long.');
console.log(name + ' is ' + age + ' years old!');
var filteredDescription = description.length > 20 ? description.substring(description.length/2) : description;
var message = 'The aspirations you related to me comprise ';
message += description.length;
message += ' characters.\nThis was the last half if it was more than 20 characters:\n';
message += filteredDescription;
console.log(message);
//Additional questiona answer
var descriptionStartingPoint = inputReader.question('\nFrom which character by position would you the message to be printed? ');
//Filtered description variable text output
console.log('\nHere is the message starting from the character at position ' + descriptionStartingPoint + ': ');
console.log(description.substring(descriptionStartingPoint));