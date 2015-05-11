angular.module("PokeGuessApp",['PokeGuessAPI','ngAudio','ngMaterial'])
.controller('MainController', ['pokeGuessApi','ngAudio','$interval',mainController]);

function mainController(pokeGuessApi,ngAudio,$interval)
{
	var scope = this;
	var countdownInterval = null;
	var winAudio = ngAudio.load("assets/audio/win_music.wav");
    var loseAudio = ngAudio.load("assets/audio/game_over.wav");
    var correctAudio = ngAudio.load("assets/audio/correct_guess.wav");
    var incorrectAudio = ngAudio.load("assets/audio/incorrect_guess.wav");
	var maxStrikes = 3;
	var maxScores = 5;
	var scores = 0;
	var noScoreImgPath = "assets/img/prod/pokeball-grey.png";
	var scoreImgPath = "assets/img/prod/pokeball.png";
	var strikeImgPath = "assets/img/prod/sad.png";
	var guessedPokemon = [];
	scope.scoreImgArray = 
	[
		noScoreImgPath,
		noScoreImgPath,
		noScoreImgPath,
		noScoreImgPath,
		noScoreImgPath,
	];
	scope.strikesImgArray = [];
	scope.pokemonData = undefined;
	scope.guess = "";
	scope.countdown = 10;

	scope.testPokemonData = undefined;
	scope.testGuessData = undefined;

	//Iniital stub logic
	var onGetRandomPokemonSuccess = function(data)
	{
		scope.pokemonData = data;			
		startCountdown(10);
	};

	var onCheckGuessSuccess = function(data)
	{
		resetCountdown(data.isCorrectGuess);
	}

	var onError = function(error)
	{
		console.log(error);
	};

	function decrementCountdown()
    {
      scope.countdown -= 1;
      if(scope.countdown < 1)
      {
      	 resetCountdown(false);
      }
    };
    
    function startCountdown(iterations)
    {
      scope.countdown = iterations;
      countdownInterval = $interval(decrementCountdown, 1000, iterations);
    };

    function resetCountdown(isCorrectGuess)
    {
  		var continueTiming = true;
    	if(!isCorrectGuess)
    	{
    		continueTiming = strike();
    	}
    	else
    	{
    		continueTiming = score();
    	}

    	if(continueTiming)
    	{
    		scope.guess = "";
    		pokeGuessApi.getRandomPokemon(guessedPokemon)
			.then(onGetRandomPokemonSuccess,onError);
    	}
    };

    function strike()
    {
    	incorrectAudio.play();
        scope.strikesImgArray.push(strikeImgPath);
        var isOut = scope.strikesImgArray.length < maxStrikes ? false : true;
        if(isOut)
        {
            loseAudio.play();
        }
        return isOut ? false : true;
    }

    scope.checkGuess = function()
    {
    	 $interval.cancel(countdownInterval);
    	 var id = scope.pokemonData.id;
    	 pokeGuessApi.checkGuess(id,scope.guess)
    	 .then(onCheckGuessSuccess,onError);
    }

    function score()
    {
    	guessedPokemon.push(scope.pokemonData.id);
    	correctAudio.play();
    	scope.scoreImgArray[scores] = scoreImgPath;
        scores++;
        var isWin = scores < maxScores  ? false : true;
        if(isWin)
        {
            winAudio.play();
        }
        return isWin ? false : true;
    }
    //testApi(scope,pokeGuessApi);
	pokeGuessApi.getRandomPokemon(guessedPokemon)
		.then(onGetRandomPokemonSuccess,onError);

	function testApi(scope,pokeGuessApi)
	{
		pokeGuessApi.getRandomPokemon([])
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

	    pokeGuessApi.checkGuess('524de181-f680-11e4-bcce-0b61e143ef6f','Metapod')
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
}

