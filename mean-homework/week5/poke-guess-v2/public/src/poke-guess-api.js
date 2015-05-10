(function()
{
  var pokeGuessApi = function($http)
  {
      var baseUrl = "http://localhost:4242/";
      var getRandomPokemon = function(guessedPokemon)
      {
        var reqData = {'ids':guessedPokemon};
        return $http.post(baseUrl + "pokemon", reqData)
        .then
        (
            function(response)
            {
              return response.data;
            }
        );
      };
      
      var checkGuess = function(id,name)
      {
        var reqData = {'id':id,'name':name};
        return $http.post(baseUrl + "guess", reqData)
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