angular.module('gandalfs-diary',[])
.controller("MainController",['$http', mainController]);


function mainController($http)
{
	var baseUrl = "http://localhost:8080/";
	var scope = this;
	scope.diaryData = {diaryOwner:"Gandalf",text:""};
	var onError = function(error)
	{
		console.log(error);
	};

	var onRetrievedDiary = function(response)
	{
		scope.diaryData = response.data;
	};

	var onSaveDiary = function(response)
	{
		console.log(response.data);
	}

	$http.post(baseUrl+"retrieveDiary",scope.diaryData).then(onRetrievedDiary,onError);

	scope.saveDiary = function()
	{
		$http.post(baseUrl+"saveDiary",scope.diaryData).then(onSaveDiary,onError);
	};
}