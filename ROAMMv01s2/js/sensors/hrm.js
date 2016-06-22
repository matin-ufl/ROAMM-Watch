function startHeartrate() {
	//console.log(interval);
	function onchangedCB(hrmInfo){
		if(hrmInfo.heartRate > 0){
			console.log("heartrate: " + hrmInfo.heartRate);
			document.getElementById("heartrate").innerHTML = hrmInfo.heartRate + "bpm";
			saveHeartrate(hrmInfo.heartRate);
			//hrmInfo.rRInterval
		}
		else{
			//console.log("no HR data acquired")
			document.getElementById("heartrate").innerHTML = "N/A";
			//saveHeartrate("N/A");
		}
	}
	
	// hrm active for 30 seconds to get a reading
	function startHR(){
		window.webapis.motion.start("HRM", onchangedCB);
		thoroughLog += "Heart Rate monitor is working. "
		$("#hrmActive").css("background","green");
		
		setTimeout(function(){
			console.log("stop HR monitor");
			window.webapis.motion.stop("HRM");
			$("#hrmActive").css("background","yellow");
			clearHeartrate();
		}, COLLECTION_PERIOD_HEART_RATE);
	}
	
	var rate = HEART_RATE_RATE; // One minute - default
	// The rate set on the portal is in seconds
	var store = localStorage.getItem(KEY_RATE_HEART_RATE);
	if(store){
		rate = parseInt(store);
	}

	var interval = window.setInterval(function(){
		startHR();
	}, rate);

	console.log("HRM polling at " + rate + " milliseconds");

	document.getElementById("heartrate").innerHTML = "N/A";
	sessionStorage.setItem(KEY_INTERVAL_HEART_RATE, interval);
	$("#hrmActive").css("background","red");

};

function stopHeartrate(){
	clearInterval(parseInt(sessionStorage.getItem(KEY_INTERVAL_HEART_RATE)));
	document.getElementById("heartrate").innerHTML = "OFF";
	
	sessionStorage.removeItem(KEY_INTERVAL_HEART_RATE);
}
