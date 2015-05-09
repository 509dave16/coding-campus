var uuid = require('uuid');
var rename = require('gulp-rename');
var gulp = require('gulp');
var file = require('file');
var jf = require('jsonfile');
var rimraf =require('rimraf');

var Pokemon = require('./pokemon.js');

var testData = [];
var destinationPath = '';
var pokemonArray = [];
function initPokeGuess(srcPath,destPath,imgBasePath, jsonFile)
{	
	//assign values to globals
	destinationPath = destPath;
	imageBasePath = imgBasePath;

	//delete previous init files
	rimraf.sync(destinationPath);
	rimraf.sync(jsonFile);

	//create prod imgs and prod json
	file.walkSync(srcPath, preparePokemon);
	jf.writeFileSync(jsonFile, pokemonArray);

	// console.log('walkSync parameters:');
	// console.log(testData);
}

function preparePokemon(dirPath, dirs, fileNames )
{
	testData.push({"dirPath":dirPath,"dirs":dirs,"fileNames":fileNames});
	for(var fileNameIndex = 0; fileNameIndex < fileNames.length; fileNameIndex++)
	{
		//Build new imgPath
		var fileName = fileNames[fileNameIndex];
		var fileNameParts = fileName.split('.');
		var fileExt = fileNameParts[1];
		var newBaseName = uuid.v1();
		var imgPath = imageBasePath + newBaseName + '.' + fileExt;
		//Pokemon name
		var pokemonName = fileNameParts[0];
		//Pokemon id
		var pokemonId = uuid.v1();
		
	    pokemonArray.push(new Pokemon(pokemonId,pokemonName,imgPath));
	    gulp.src(dirPath + fileName)
	    .pipe
	    (
	    	rename
	    	( 
		    	{
		    		basename : newBaseName
		  		}
	  		)
	   	)
	  .pipe(gulp.dest(destinationPath));
	  //console.log(imgPath);
	} 
}
module.exports = initPokeGuess;