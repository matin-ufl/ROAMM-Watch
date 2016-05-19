// ENTRY POINT OF THE APPLICATION
$(document).ready(function(){
	console.log("[MATIN] ROAMM project started.");
	
	// Make it so swiping down from the top closes the app
	document.addEventListener('tizenhwkey', function(e) {
		if(e.keyName == "back"){
			
			tizen.application.getCurrentApplication().exit();
		}
	});

	
	// tap the screen to send local data
	$('.ui-page').on("click", function(){
		console.log("[MATIN] data transmission started.");
		console.log("[M A T I N] ---->>>>> " + thoroughLog);
		dataTransmission_saveLocally();
	});

	// get a reference to the IDB database that holds all permanent local data
	console.log("[MATIN] Local DB is being created.");
	createDBUsingWrapper();

	// retrieves the config file from the server and starts all sensors
	console.log("[MATIN] Requesting sensors to start.");
	if(RECEIVE_CONFIG_FROM_SERVER) {
		thoroughLog += "Config parameters obtained from the Server. ";
		startSensors();
	} else {
		thoroughLog += "Config parameters read from the watch. ";
		startSensors_locally();
	}

	$("button").click(function(){
		
	});

	document.getElementById("watchID").innerHTML = localStorage.getItem(KEY_WATCH_ID);
	
	var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;

	// Check if its night time every hour. If so, automatically begin data export
	window.setInterval(function(){
		var now = new Date();
		if(battery.charging){
			dataTransmission_saveLocally();
		}
		else if(battery.level > 0.50 && (now.getHours() > 22 || now.getHours() < 8)){
			dataTransmission_saveLocally();
		}
	},3600000);
	
	// need this so app runs it the background interrupted
	tizen.power.request("CPU", "CPU_AWAKE");
	
	// sanity check to make sure no javascript crashed in between
	console.log("made it to the end!");

});
