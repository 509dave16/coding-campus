function PokeGuess()
{
    var numOfLives = 3;
    var lifeIndex = 0;
    var numOfPokeBalls = 5;
    var countDown = 10;
    var number = countDown;
    var delay = 1000;
    var pokemonArray = [];
    var timerMessage = "Time Remaining:<br/>0";
    var winAudio = instantiateAudio("assets/audio/win_music.wav");
    var loseAudio = instantiateAudio("assets/audio/game_over.wav");
    var correctAudio = instantiateAudio("assets/audio/correct_guess.wav");
    var incorrectAudio = instantiateAudio("assets/audio/incorrect_guess.wav");
    
    initializePokeGuessGame();
    
    function initializePokeGuessGame()
    {
        $(".lives img").each(resetLives);
        $(".score img").each(resetPokeBalls);
        setTimeout(timer,delay);
    }
    
    function instantiateAudio(src)
    {
        var audio = new Audio();
        audio.src = src;
        return audio;
        
    }
    
    function resetPokeBalls()
    {
        $(this).attr("src","assets/img/pokeball-grey.png");
    }
    
    function resetLives()
    {
        $(this).hide();
    }
    
    function timer()
    {
        number -= 1;
        $(".timer > h1").html(timerMessage + number);
        if(number == 0)
        {
            var isDead = takeAwayLife();
            if(isDead)
            {
                setTimeout(playAudio, delay,loseAudio);
                return;
            }
            number = countDown;
            $(".timer > h1").html(timerMessage + number);
        }
        setTimeout(timer,delay);
    }
    
    function takeAwayLife()
    {
        incorrectAudio.play();
        $(".lives img").eq(lifeIndex).show();
        $("#pokemon-name-input").val('');
        lifeIndex++;
        return numOfLives === lifeIndex ? true : false;//is dead
    }
    
    function playAudio(audio)
    {
        audio.play();
    }
}