var finalPairs = {};
var everyButton = {};

function populateTable(tableid,gamesize) {
	var gm_width = gamesize;
	var gm_height = gamesize;

	var rows = "";

	for (var x = 0; x < gm_height; x++) {
		rows += "<tr>\n";
		for (var y = 0; y < gm_width; y++) {
			rows += "<td id='btn"+x+y+"' class='imgBTN'><img class='image-button' src='images/ques.jpg'></td>\n";
		}
		rows += "</tr>\n";
	}

	document.getElementById(tableid).innerHTML = rows;

	pairButtons();
}

function pairButtons() {
	var allButtonsHTML = document.getElementsByClassName("imgBTN");

	var allButtons = HTMLtoArray(allButtonsHTML);
	var cells = allButtons.length/2;
	var buttonPairs = new Array();
	//buttonPairs[0] = new Array();

	for (var i = 0; i < cells; i++) {
		buttonPairs[i] = new Array(2);
		var ran = getRandomInt(0,allButtons.length-1);
		buttonPairs[i][0] = allButtons[ran];
		allButtons.splice(ran, 1);

		ran = getRandomInt(0,allButtons.length-1);
		buttonPairs[i][1] = allButtons[ran];
		allButtons.splice(ran, 1);
	}

	finalPairs = buttonPairs;

	givePairsImages();
}

function givePairsImages() {
	for (var i = 0; i < finalPairs.length; i++){
		finalPairs[i][0].innerHTML = "<img class='image-button' src='images/"+i+".png'>"
		finalPairs[i][0].imageid = i;
		finalPairs[i][1].innerHTML = "<img class='image-button' src='images/"+i+".png'>"
		finalPairs[i][1].imageid = i;
	}

	hideImages();
}

function hideImages() {
	var allButtonsHTML = document.getElementsByClassName("imgBTN");

	var allButtons = HTMLtoArray(allButtonsHTML);

	for (var i = 0; i < allButtons.length; i++) {

	}
}

function startGame(){

	var radios = document.getElementsByName('difficulty');
	var difficulty = 0;

	for (var i = 0, length = radios.length; i < length; i++){
		if (radios[i].checked){
			difficulty = radios[i].value;
		}
	}

	if(difficulty == 0){
		document.getElementById('menu-warning').style.opacity = 1;
	}else{
		document.getElementById('dark-overlay').style.opacity = 0;
		setTimeout(function () {
			document.getElementById('dark-overlay').style.display = "none";
			document.getElementById('game-table').style.opacity = 1;
		}, 1000);
		populateTable('gametable',difficulty);
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}


function HTMLtoArray(htmlcollection){
	var returnArray = new Array;
	for (var i = 0; i < htmlcollection.length; i++) {
		returnArray.push(htmlcollection[i]);
	}

	return returnArray;
}

/*
no comment

document.getElementById(btnPairs[i][0]).innerHTML = "<img class='image-button' src='images/"+i+".png'>"
		document.getElementById(btnPairs[i][1]).innerHTML = "<img class='image-button' src='images/"+i+".png'>"
*/