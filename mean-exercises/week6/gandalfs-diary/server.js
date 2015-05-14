var express = require('express');
var app = express();
var Diary = require('./diary.js');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var diary = '';

app.post('/retrieveDiary', retrieveDiary);

app.post('/saveDiary', saveDiary);


function retrieveDiary(req,res)
{
	Diary.findOne({"diaryOwner":req.body.diaryOwner},
		function (err,data)
		{
			res.send(data);
		}
	);
}

function saveDiary(req,res)
{
	var diaryData = req.body;
	var diaryOwner = diaryData.diaryOwner;
	console.log(diaryData);
	Diary.findOne({"diaryOwner":diaryOwner},
		function(err,data)
		{
			if(!err && !data)
			{
				console.log("Gandalf wasn't found");
				createDiary(diaryData,res);
			}
			else
			{
				console.log("Gandalf was found");
				updateDiary(diaryData,res);
			}
			console.log('Save Diary Data: ');
			console.log(data);
			console.log('Save Diary Error');
			console.log(err);
		}
	);
}

function createDiary(newDiaryData,res)
{
	var newDiary = new Diary(newDiaryData);
	newDiary.save(
		function(err,data)
		{
			console.log('Create Diary Data: ');
			console.log(data);
			res.send(data);
		}
	);
}

function updateDiary(updatedDiaryData, res)
{
	Diary.update({"diaryOwner":updatedDiaryData.diaryOwner},updatedDiaryData,
		function(err,raw)
		{
			console.log('Update Diary Data: ');
			console.log(raw);
			res.send(raw);
		}
	);
}

app.listen(PORT);
console.log('Listening on port ' + PORT);