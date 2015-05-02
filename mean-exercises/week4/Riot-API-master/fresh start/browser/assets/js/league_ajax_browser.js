////////////////////////////////////////////////////////////////////////
////////														////////
///////////													 ///////////
////////////				 	Listeners   	 			////////////
/////////////											   /////////////
////////////////										////////////////
////////////////////////////////////////////////////////////////////////

$(function(){
	$('#search-summoner').click(
		function()
		{
			validateInput();
			//alert("My button works!");
		}
	);
});

////////////////////////////////////////////////////////////////////////
////////														////////
///////////													 ///////////
////////////				 Page Utilities   	 			////////////
/////////////											   /////////////
////////////////										////////////////
////////////////////////////////////////////////////////////////////////

// This function gets the value of the api key box
function getAPIKey(){
	return	$('#api-key-input').val();
}

// This function makes sure that the API Key and the Search inputs are not empty
// If they are empty the program won't run
function validateInput(){
	var api_key_input = $('#api-key-input');
	var search_input = $('#summoner-name-input');
	if(!isEmpty(api_key_input) && !isEmpty(search_input))
	{
		searchSummonerStatsSummary();
	}
}

// A re-usable function for checking if a textbox is empty or not
function isEmpty(element){
	var is_empty = false;
	if(element.val() === '' || element.val() === undefined)
	{
		is_empty = true;
	}
	return is_empty; 
}

// Gets the value of the selected radio button
function getSelectedOption(){

}

// This function simply chooses a random background image to use on the body top_level_property
function pickRandomBackground(){

}

// Resets content in preparation for a new search
function clearContent(){

}

// A callback that does nothing
function doNothing(){

}

////////////////////////////////////////////////////////////////////////
////////														////////
///////////													 ///////////
////////////				  API Utilities  	 			////////////
/////////////											   /////////////
////////////////										////////////////
////////////////////////////////////////////////////////////////////////

// Shows an error message in place of the table
function triggerFail(){

}

// Fetches value of textbox for summoner name
function getSummonerName(){
	var name = $('#summoner-name-input').val();
	return cleanName(name);
}

// Removes all spaces, makes lower case, and the name is now ready for submission to Riot API
function cleanName(name){
	var lowecaseName = name.toLowerCase();
	var formattedName = lowecaseName.replace(' ','');
	var trimmedName = formattedName.trim();
	return trimmedName;
}

// Sends a request to Riot API to get summoner ID by submitting the summoner name
function getSummonerID(callback){
	var name = getSummonerName();
	var apiKey = getAPIKey();
	var summonerID = 'Not found';
	var apiResponse = $.get(
		'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/'+name+'?api_key='+apiKey,
		function()
		{
			var data = jQuery.parseJSON(apiResponse.resoponseText);
			summonerID = data[name].id;
			callback(summonerID);
		}
	);
	
	
}

// Sets up the visual table to display summoner stats and other data
function buildTable(stats_array){
	console.log(stats_array);
}

////////////////////////////////////////////////////////////////////////
////////														////////
///////////													 ///////////
////////////			Summoner Stats: Summary 			////////////
/////////////											   /////////////
////////////////										////////////////
////////////////////////////////////////////////////////////////////////

// This function fetches the stats of the summoner by submitting that person's summoner name (in-game-name)
function getSummonerStatsSummary(callback,id){
	
	var apiKey = getAPIKey();
	var apiResponse = $.get(
		'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-summoner/'+id+'/summary?api_key='+apiKey,
		function()
		{
			var data = jQuery.parseJSON(apiResponse.resoponseText);
			callback(data);
		}
	);
}

// This function makes 2 separate calls to the Riot API resulting in the game statistics of the player
// The League of Legends term for a player is "summoner"
function searchSummonerStatsSummary()
{
	// This is an example of a callback function where it calls the function getSummonerID and 
	// // uses the function getSummonerStats as parameter.
	alert("We are searching!");
	getSummonerID(
		function(id)
		{	
			getSummonerStatsSummary(
				function(stats)
				{
					var stats_array = stats['playerStatsSummary'];
					if(stats_array)
					{
						buildTable(stats_array);
					}
					else
					{
						triggerFail();
					}
				},
				id
			);
		}
	);
}

////////////////////////////////////////////////////////////////////////
////////														////////
///////////													 ///////////
////////////			 Summoner Stats: Ranked 			////////////
/////////////											   /////////////
////////////////										////////////////
////////////////////////////////////////////////////////////////////////


// This function fetches the stats of the summoner by submitting that person's summoner name (in-game-name)
function getSummonerStatsRanked(){

}

// This function makes 2 separate calls to the Riot API resulting in the game statistics of the player
// The League of Legends term for a player is "summoner"
function searchSummonerStatsRanked(){
	// This is an example of a callback function where it calls the function getSummonerID and 
	// // uses the function getSummonerStats as parameter.
	
}

////////////////////////////////////////////////////////////////////////
/////////////////										 ///////////////
////////////			 Ranked: Champion Functions 		////////////
////////////////										////////////////
////////////////////////////////////////////////////////////////////////

// This function finds the champion ids in the content of the table.
function getChampionIDs(){

}

// This function simply removes the 'id: ' part of the id left over from the search
function cleanChampionID(){

}

// This function edits the html to display the names of the champions, instead of the champion id #
// Also it's important to note that id: 0 doesn't correspond to a specific champion, it means the combined ranked stats for all champions
function insertChampionName(){

}

// This function makes an api call to get static data containing champion names by giving the server a champion ID
function getChampionName(){

}