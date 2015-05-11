var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jf = require('jsonfile');
var util = require('util');

var init = require('./js/init-poke-guess.js');
var Pokemon = require('./js/pokemon.js');

//(imgSrcPath, imgDestPath, htmlImgSrcPath, jsonFile)
if(process.argv[2] !== '0')
{
	init('./public/assets/img/dev/',
		 './public/assets/img/prod/pokemon-imgs/',
		 'assets\/img\/prod\/pokemon-imgs\/',
		 'pokemon.json');
	console.log('We re-ignited!');
}

var pokemonArray = jf.readFileSync( 'pokemon.json' );

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.post('/pokemon', retrievePokemon);
app.post('/guess', resolveGuess);

function retrievePokemon(req,res)
{
	var guessedPokemonIds = req.body.ids;
	var pokemon = randomPokemon(pokemonArray,guessedPokemonIds);
	var data = { "imgPath": pokemon.imgPath, "id": pokemon.id };
	res.send(data);
}

function randomPokemon(pokemonArray,guessedPokemonIds)
{
	var numOfPokemon = pokemonArray.length;
    var guessedPokemon = true;
    var pokemon = undefined;
    while(guessedPokemon)
    {
        var pokemonIndex = Math.floor(Math.random() * numOfPokemon);
        pokemon = pokemonArray[pokemonIndex];
        var pokemonId = pokemon.id;

        if(guessedPokemonIds.indexOf(pokemonId) === -1)
        {
            guessedPokemon = false;
        }
    }
    return pokemon;
}

function resolveGuess(req,res)
{
	var guessInfo = req.body;
	var pokemon = findPokemon('id',guessInfo.id);
	var isCorrectGuess = false;
	if(pokemon.name.toLowerCase() === guessInfo.name.toLowerCase())
	{
		isCorrectGuess = true;
	}
	res.send({"isCorrectGuess" : isCorrectGuess});
}

function findPokemon(key, value)
{
	var pokemon = undefined;
	for(var pokemonIndex = 0; pokemonIndex < pokemonArray.length; pokemonIndex++)
	{
		pokemon = pokemonArray[pokemonIndex];
		if(pokemon[key] === value)
		{
			break;
		}
	}	
	return pokemon;	
}

app.listen(4242);
console.log('Listening on Port 4242');
