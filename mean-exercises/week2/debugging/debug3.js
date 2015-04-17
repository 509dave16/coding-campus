// Goal: add a method to the person class that changes their name
 
// Person class
var Person = function (name, age) {
  this.name = name;
  this.age = age;
};
 
Person.prototype.changeName = function (new_name) {
  this.name = new_name;
};
 
var tom = new Person('tom', 37);
tom.changeName('larry');
 
// do not change this code 
if (tom.name !== 'larry') console.log('fail');
else console.log('succeed');
// do not change this code