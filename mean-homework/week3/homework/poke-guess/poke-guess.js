function PokeGuess()
{
    var numOfLives = 3;
    var lifeIndex = 0;
    var numOfPokeBalls = 5;
    var scoreIndex = 0;
    
    var countDown = 10;
    var number = countDown;
    var delay = 1000;
    var timerID = undefined;
    var timerMessage = "Time Remaining:<br/>0:";
    var continueTiming = true;

    var winAudio = instantiateAudio("assets/audio/win_music.wav");
    var loseAudio = instantiateAudio("assets/audio/game_over.wav");
    var correctAudio = instantiateAudio("assets/audio/correct_guess.wav");
    var incorrectAudio = instantiateAudio("assets/audio/incorrect_guess.wav");
    
    var pokedex = [];
    var currentPokemon = undefined;

    $.getJSON( "pokedex.json", function( data ) 
    {
        data.forEach(
            function(item)
            {
                pokedex.push(new Pokemon(item.name,item.imgPath));
            }
        );
        initializePokeGuessGame();
    });
    
    //Audio Creation and Play functions
    function instantiateAudio(src)
    {
        var audio = new Audio();
        audio.src = src;
        return audio;
    }
    
    function playAudio(audio)
    {
        audio.play();
    }
    
    
    //Initialization of Game
    function initializePokeGuessGame()
    {
        changePokemon();
        $(".lives img").each(resetLives);
        $(".score img").each(resetPokeBalls);
        timerID = setTimeout(timer,delay);
    }
    
    function resetPokeBalls()
    {
        $(this).attr("src","assets/img/pokeball-grey.png");
    }
    
    function resetLives()
    {
        $(this).hide();
    }
    
    //Timer related functions that determine and alter the Game Loop
    function timer()
    {
        number -= 1;
        $(".timer > h1").html(timerMessage + number);
        if(number <= 0)
        {
            resetTimer(false);
        }
        if(continueTiming)
        {
            timerID = setTimeout(timer,delay);
        }
    }
    
    function resetTimer(isScore)
    {
        if(!isScore)
        {
            continueTiming = takeAwayLife();
        }
        else
        {
            continueTiming = score();
        }
        
        if(!continueTiming)
        {
            return;
        }
        number = countDown;
        $(".timer > h1").html(timerMessage + number);
    }
    
    function takeAwayLife()
    {
        incorrectAudio.play();
        $(".lives img").eq(lifeIndex).show();
        $("#pokemon-name-input").val('');
        lifeIndex++;
        var isDead = numOfLives <= lifeIndex ? true : false;//is dead
        if(isDead)
        {
            alert("You LOST!!!");
            //setTimeout(playAudio, delay, loseAudio);
            loseAudio.play();
        }
        else
        {
            changePokemon();
        }
        return isDead ? false : true;
    }
    

    function score()
    {
        correctAudio.play();
        currentPokemon.hasBeenGuessed = true;
        $("#pokemon-name-input").val('');
        $(".score img").eq(scoreIndex).attr("src","assets/img/pokeball.png");
        scoreIndex++;
        var isWin = numOfPokeBalls <= scoreIndex ? true : false;
        if(!isWin)
        {
            changePokemon();
        }
        else
        {
            alert("You WON!!!");
            // setTimeout(playAudio, delay, winAudio);
            winAudio.play();
        }
        return isWin ? false : true;
    }
    
    function changePokemon()
    {
        currentPokemon = randomPokemon();
        $("#pokemon-image").attr("src", currentPokemon.imgPath);
    }
    
    function randomPokemon()
    {
        var numOfPokemon = pokedex.length;
        var guessedPokemon = true;
        var pokemon = undefined;
        while(guessedPokemon)
        {
            var pokemonIndex = Math.floor(Math.random() * numOfPokemon);
            pokemon = pokedex[pokemonIndex];
            if(pokemon.hasBeenGuessed === false )
            {
                guessedPokemon = false;
            }
        }
        return pokemon;
    }
    
    $("#submit-button").click(
        function(event)
        {
            event.preventDefault();
            var enteredPokemonName = $("#pokemon-name-input").val().toLowerCase().trim();
            var currentPokemeonName = currentPokemon.name.toLowerCase();
            var isScore = false;
            if(enteredPokemonName === currentPokemeonName)
            {
                clearTimeout(timerID);
                isScore = true;
            }
            resetTimer(isScore);
            if(continueTiming)
            {
                timerID = setTimeout(timer,delay);
            }
        }
    );
    
    $("#pokemon-image").click(
        function(event)
        {
            console.log("We made it!");
        }
    );
}