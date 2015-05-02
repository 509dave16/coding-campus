var object = { hasFired : false };
var callback = function(){ object.hasFired = true; };
setTimeout(callback,3000);
while(object.hasFired === false)
{
    //do nothing
}
console.log('The callback has finally fired!');