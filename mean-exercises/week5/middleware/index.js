var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

var signature = 'Da Vinci';

var paintings = [
  {
    name: 'Mona Lisa',
    image: 'http://uploads6.wikiart.org/images/leonardo-da-vinci/mona-lisa.jpg'
  },
  {
    name: 'The Last Supper',
    image: 'http://www.italian-renaissance-art.com/images/Leonardoafter-last-supper.jpg'
  }
];

var inventions = [
  {
    name: 'Aerial Screw',
    image: 'http://www.leonardo-da-vinci-biography.com/images/leonardo-da-vinci-inventions.2.jpg'
  }
];

app.use( function (req, res, next) {
  res.signature = function (html) {
    html += '</br>' + signature;
    res.send(html);
  };
  next();
})

app.get('/painting/:id', function (req, res) {
  if (!paintings[req.params.id])
  {
  	return next();
  }
  else
  {
	  var html = '<h1>' + paintings[req.params.id].name + '</h1>';
	  html += '<br/><img height="300" src="' + paintings[req.params.id].image + '">';
	  html += '<br/>';
	  res.signature(html);
  }
});

app.get('/invention/:id', function (req, res) 
{
  if(!inventions[reg.params.id])
  {
  	 next();
  }
  else
  {	
	  var html = '<h1>' + inventions[req.params.id].name + '</h1>';
	  html += '<br/><img height="300" src="' + inventions[req.params.id].image + '">';
	  html += '<br/>' + signature;
	  res.send(html);
  }
});

// near the end of the file
app.use( function (req, res, next) {
  res.send('Invalid request');
});


app.listen(PORT);
console.log('Listening on port ' + PORT);