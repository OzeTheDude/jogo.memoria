function populateTable(tableid) {
	var gm_width = 4;
	var gm_height = 4;

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
	var allButtons = document.getElementsByClassName("imgBTN");
	var buttonPairs = new Array();
	//buttonPairs[0] = new Array();

	console.log(buttonPairs);

	for (var i = 0; i < allButtons.length/2; i++) {
		buttonPairs[i] = new Array(2);
		var ran = randomIntFromInterval(0,allButtons.length);
		buttonPairs[i][0] = allButtons[ran];
		allButtons.splice(ran, 1);

		ran = randomIntFromInterval(0,allButtons.length);
		buttonPairs[i][1] = allButtons[ran];
		allButtons.splice(ran, 1);
	}

	console.log(buttonPairs);
	console.log(allButtons);
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

/*
no comment
*/