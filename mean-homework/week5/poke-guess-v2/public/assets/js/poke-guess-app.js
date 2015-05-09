angular.module("PokeGuessApp",['PokeGuessAPI'])
.controller('MainController', ['pokeGuessApi',mainController]);

function mainController(pokeGuessApi)
{
	var scope = this;
	scope.pokemonData = undefined;
	scope.guessData = undefined;
	//testApi(scope,pokeGuessApi);
}

function testApi(scope,pokeGuessApi)
{
	pokeGuessApi.getRandomPokemon({"ids":[]})
	.then
	(
		function(data)
		{
			scope.pokemonData = data;
			console.log(data);
		},
		function(error)
		{
			scope.pokemonData = error;
			console.log(error);
		}

	);

	var guessInfo = 
	{
    	"id" : "524de181-f680-11e4-bcce-0b61e143ef6f",
    	"name" : "Metapod" 
    };

    pokeGuessApi.checkGuess(guessInfo)
	.then
	(
		function(data)
		{
			scope.guessData = data;
			console.log(data);
		},
		function(error)
		{
			scope.guessData = error;
			console.log(error);
		}

	);
}