function startPressure() {
	
	var rate = PRESSURE_RATE;
	var store = localStorage.getItem(KEY_RATE_PRESSURE);
	if(store){
		rate = parseInt(store);
	}

	function onGetSuccessPRCB(sensorData) {
		//console.log("pressure : " + sensorData.pressure);
		document.getElementById("pressure").innerHTML = sensorData.pressure;
		savePressure(sensorData.pressure);
	} 

	function onerrorPRCB(error) {
		console.log("no Pressure data acquired");
		document.getElementById("pressure").innerHTML = "N/A";
	} 

	function onsuccessPRCB() {
		//console.log("start pressure sensor");
		webapis.sensorservice.getDefaultSensor("PRESSURE").getPressureSensorData(onGetSuccessPRCB, onerrorPRCB);
	}
	
	function startPressure2(){
		var pressureSensor = webapis.sensorservice.getDefaultSensor("PRESSURE");
		pressureSensor.start(onsuccessPRCB);
		
		setTimeout(function(){
			//console.log("stop pressure sensor");
			pressureSensor.stop();
		}, COLLECTION_PERIOD_PRESSURE);
	}
	

	var interval = window.setInterval(function(){
		startPressure2();
	}, rate);
	
	sessionStorage.setItem(KEY_INTERVAL_PRESSURE, interval);
	

	
};

function stopPressure(){
	clearInterval(parseInt(sessionStorage.getItem(KEY_INTERVAL_PRESSURE)));
	document.getElementById("pressure").innerHTML = "OFF";
	
	sessionStorage.removeItem(KEY_INTERVAL_PRESSURE);
}