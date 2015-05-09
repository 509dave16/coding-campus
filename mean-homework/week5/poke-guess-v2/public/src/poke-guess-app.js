angular.module("PokeGuessApp",['PokeGuessAPI'])
.controller('MainController', ['pokeGuessApi',mainController]);

function mainController(pokeGuessApi)
{
	var scope = this;
	scope.guessedPokemon = [];
	scope.pokemonData = undefined;
	scope.guessData = undefined;
	scope.testPokemonData = undefined;
	scope.testGuessData = undefined;
	var onGetRandomPokemonSuccess = function(data)
	{
		scope.pokemonData = data;			
	};

	var onError = function(error)
	{
		console.log(error);
	};
	//testApi(scope,pokeGuessApi);
	pokeGuessApi.getRandomPokemon({"ids":[]})
		.then(onGetRandomPokemonSuccess,onError);


}

function testApi(scope,pokeGuessApi)
{
	pokeGuessApi.getRandomPokemon({"ids":[]})
	.then
	(
		function(data)
		{
			scope.testPokemonData = data;
			console.log(data);
		},
		function(error)
		{
			scope.testPokemonData = error;
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
			scope.testGuessData = data;
			console.log(data);
		},
		function(error)
		{
			scope.testGuessData = error;
			console.log(error);
		}

	);
}