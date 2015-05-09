(function()
{
  var pokeGuessApi = function($http)
  {
      var baseUrl = "http://localhost:4242/";
      var getRandomPokemon = function(guessedPokemonIds)
      {
        return $http.post(baseUrl + "pokemon", guessedPokemonIds)
        .then
        (
            function(response)
            {
              return response.data;
            }
        );
      };
      
      var checkGuess = function(guessInfo)
      {
        return $http.post(baseUrl + "guess", guessInfo)
        .then
        (
            function(response)
            {
              return response.data;
            }
        );
      };
      
      return { 
        getRandomPokemon : getRandomPokemon,
        checkGuess : checkGuess
      };
  };
  angular.module("PokeGuessAPI",[]).factory("pokeGuessApi",pokeGuessApi);
}());