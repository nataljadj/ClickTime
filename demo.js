var t;
var secParam;

function addRowsToTable(){

	var text = document.getElementById('text1').value;
	var time = document.getElementById('time1').value;
	var goal = parseInt(time[0]*36000 + time[1]*3600 + time[3]*600 +time[4]*60 + time[6]*10 + time[7]*1);

		if((time == 0 && text == 0) || time == 0){
		document.getElementById('one').innerHTML = "Please input datas";
	}
	else{
	
	document.getElementById('one').innerHTML = "You can start your timer";
	var table = document.getElementById('table1');
	var row = table.insertRow(0);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	var cell6 = row.insertCell(5);

	cell1.innerHTML = text;
	cell2.innerHTML = time;
	cell3.innerHTML = '<div id="timer">00:00:00</div>';
	cell4.innerHTML = '<input type="button"/ value="Pause" id="butt2" onclick="pauseTimer()" >' + ""
	 + '<input type="button"/ value="Play" id="butt3" onclick="resumeTimer()">';
	cell5.innerHTML = '<progress id="progress-bar" value=20 max="100"></progress>';
	cell6.innerHTML = '<input type="button"/ value="X" id="butt4" onclick="deleteTimer()">'
	 
	 startTimer(0);
	  	progressBar(0, goal);


	 document.getElementById('butt').disabled = true;
	 	saveItems(text, time);

}

};

function addRowsWhenLoad(){

	var text = document.getElementById('text1').value;
	var time = document.getElementById('time1').value;
	document.getElementById('butt').disabled = true;

	document.getElementById('one').innerHTML = "You can start your timer";
	var table = document.getElementById('table1');
	var row = table.insertRow(0);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);

	cell1.innerHTML = localStorage.getItem("name");
	cell2.innerHTML = localStorage.getItem("goal");
	cell3.innerHTML = '<div id="timer">localStorage.getItem("lastValueTimer")</div>';
	cell4.innerHTML = '<input type="button"/ value="Pause" id="butt2" onclick="pauseTimer()" >' + ""
	 + '<input type="button"/ value="Play" id="butt3" onclick="resumeTimer()">';
	cell5.innerHTML = '<progress id="progress-bar" value=20 max="100"></progress>';
	startTimer(localStorage.getItem("lastValueTimer"));

	 
	 saveItems(text, time);


};

function funcForStartTimer (sec, block) {

	var time = sec;
	var hour = parseInt(time/3600);
	

		if(hour < 1) hour = 0;
			time = parseInt(time - hour*3600);
				if(hour < 10) hour = '0' + hour;

		var minutes = parseInt(time/60);
		if(minutes < 1) minutes = 0;
			time = parseInt(time - minutes*60);
				if(minutes < 10) minutes = '0' + minutes;

		var seconds = time;
		if (seconds < 10) seconds = '0' + seconds;

		block.innerHTML = hour + ':' + minutes + ':' + seconds;
		localStorage.setItem('lastValueTimer', sec)
		sec ++;
		
		secParam = hour/3600 + minutes/60 + seconds;

	t  = setTimeout(function(){ funcForStartTimer (sec, block);}, 1000);		
}

function startTimer(sec){
	var block = document.getElementById('timer');
	clearTimeout(t);
	funcForStartTimer(sec, block);	
}

function pauseTimer(){
	var block = document.getElementById('timer');
	clearTimeout(t);
	clearTimeout(sim);

}

function resumeTimer(){
	var block = document.getElementById('timer');
	funcForStartTimer(secParam, block);
}

function saveItems(text, time, block){
	
	if (typeof(Storage) != "undefined") {
    localStorage.setItem("name", text);
    localStorage.setItem("goal", time);
	}
}

function progressBar (al, goal) {
	var bar = document.getElementById("progress-bar");
	var timeFinish = goal*10;
	bar.value = al;
	al++;

	 var sim = setTimeout("progressBar("+al+", "+goal+")", timeFinish);
	 if (goal == 0) { clearTimeout(sim);};
}

function deleteTimer (){
	document.getElementById("table1").deleteRow(0);
    document.getElementById('butt').disabled = false;


}