var finalPairs = new Array;
var everyButton = new Array;
var flippedCards = new Array;
var gameStarted = false;
var controlEnabled = false;
var gridSize = 0;

var maxScore = 0;
var curScore = 0;
var tries = 0;
var timeSpent = 0;

function populateTable(tableid,gamesize) {
	var gm_width = gamesize;
	var gm_height = gamesize;

	gridSize = gamesize;

	maxScore = (gamesize*gamesize)/2;
	document.getElementById("p-score").innerHTML = curScore+'/'+maxScore;
	document.getElementById("p-moves").innerHTML = tries;
	//document.getElementById("p-timer").innerHTML = "";

	var rows = "";

	for (var x = 0; x < gm_height; x++) {
		rows += "<tr>\n";
		for (var y = 0; y < gm_width; y++) {
			rows += "<td id='btn"+x+y+"' onmousedown='flipImage(btn"+x+y+")' class='imgBTN'><img class='front flipped' src='images/ques.png'><img class='back flipped' src='images/ques.png'></td>\n";
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
		finalPairs[i][0].innerHTML = "<img class='front flipped' src='images/"+i+".png'><img class='back flipped' src='images/ques.png'>"
		finalPairs[i][0].imageid = i;
		finalPairs[i][1].innerHTML = "<img class='front flipped' src='images/"+i+".png'><img class='back flipped' src='images/ques.png'>"
		finalPairs[i][1].imageid = i;
	}

	var allButtonsHTML = document.getElementsByClassName("imgBTN");
	var allButtons = HTMLtoArray(allButtonsHTML);

	if (gridSize == "4") {
		for (var i = 0; i < allButtons.length; i++) {
			allButtons[i].firstChild.classList.add('big');
			allButtons[i].lastChild.classList.add('big');
		}
	}else if(gridSize == "6"){
		for (var i = 0; i < allButtons.length; i++) {
			allButtons[i].firstChild.classList.add('medium');
			allButtons[i].lastChild.classList.add('medium');
		}
	}else if(gridSize == "8"){
		for (var i = 0; i < allButtons.length; i++) {
			allButtons[i].firstChild.classList.add('small');
			allButtons[i].lastChild.classList.add('small');
		}
	}

	hideImages();
}

var glbTimer;
function hideImages() {

	/*
	var allButtonsHTML = document.getElementsByClassName("imgBTN");

	var allButtons = HTMLtoArray(allButtonsHTML);

	for (var i = 0; i < allButtons.length; i++) {
		allButtons[i].firstChild.classList.toggle('flipped');
		allButtons[i].lastChild.classList.toggle('flipped');
	}
	*/

	gameStarted = true;
	controlEnabled = true;

	glbTimer = setInterval(myTimer, 1000);
}

function myTimer(){
	timeSpent++
	var ndate = new Date(null);
	ndate.setSeconds(timeSpent);
	var result = ndate.toISOString().substr(11, 8);
	document.getElementById("p-timer").innerHTML = result;
}

function flipImage(arg){

	if (gameStarted && controlEnabled) {
		if (arg.firstChild.classList.contains('flipped')) {

			arg.firstChild.classList.toggle('flipped');
			arg.lastChild.classList.toggle('flipped');
			flippedCards.push(arg);

		}
	}
	
	if (flippedCards.length == 2 && controlEnabled) {
		controlEnabled = false;

		tries++;
		document.getElementById("p-moves").innerHTML = tries;

		setTimeout(function () {

			if(checkPairs(flippedCards[0],flippedCards[1])){

				for (var i = 0; i < flippedCards.length; i++) {
					flippedCards[i].firstChild.classList.toggle('match');
					//flippedCards[i].lastChild.classList.toggle('match');
				}

				curScore++
				document.getElementById("p-score").innerHTML = curScore+'/'+maxScore;

				if (curScore==maxScore) {endGame();}

			}else{
				for (var i = 0; i < flippedCards.length; i++) {
					flippedCards[i].firstChild.classList.toggle('flipped');
					flippedCards[i].lastChild.classList.toggle('flipped');
				}
			}

			flippedCards = new Array(0);
			controlEnabled = true;

		}, 1000);
	}

}

function checkPairs(arg1, arg2){
	if (arg1.firstChild.src == arg2.firstChild.src) {
		return true;
	}else{
		return false;
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
			document.getElementById('info-div').style.opacity = 1;
		}, 1000);
		populateTable('gametable',difficulty);
	}
}

function endGame(){

	document.getElementById("pf-score").innerHTML = 'Pontos: '+curScore+'/'+maxScore;
	document.getElementById("pf-moves").innerHTML = 'Tentativas: '+tries;
	var ndate = new Date(null);
	ndate.setSeconds(timeSpent);
	document.getElementById("pf-timer").innerHTML = 'Tempo: '+ndate.toISOString().substr(11, 8);

	document.getElementById('dark-overlay').style.display = "inline";
	document.getElementById('dark-overlay').style.opacity = 0;
	setTimeout(function () {
		document.getElementById('dark-overlay').style.opacity = 1;
	}, 100);
	

	document.getElementById('menu-overlay').style.display = "none";
	document.getElementById('end-overlay').style.display = "inline";

	clearInterval(glbTimer);
}

function restartGame(){
	document.getElementById('menu-overlay').style.display = "inline";
	document.getElementById('end-overlay').style.display = "none";

	document.getElementById('game-table').style.opacity = 0;
	document.getElementById('info-div').style.opacity = 0;
	maxScore = 0;
	curScore = 0;
	tries = 0;
	timeSpent = 0;

	var radios = document.getElementsByName('difficulty');
	for (var i = 0; i < radios.length; i++) {
		radios[i].checked = false;
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