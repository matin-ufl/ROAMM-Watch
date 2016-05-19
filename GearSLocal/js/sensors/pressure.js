function startPressure() {
	
	var rate = 60000;
	var store = localStorage.getItem(KEY_RATE_PRESSURE);
	if(store){
		rate = parseInt(store)*1000;
	}

	function onGetSuccessPRCB(sensorData) {
		console.log("pressure : " + sensorData.pressure);
		document.getElementById("pressure").innerHTML = sensorData.pressure;
		savePressure(sensorData.pressure);
	} 

	function onerrorPRCB(error) {
		console.log("no Pressure data acquired");
		document.getElementById("pressure").innerHTML = "N/A";
	} 

	function onsuccessPRCB() {
		console.log("start pressure sensor");
		webapis.sensorservice.getDefaultSensor("PRESSURE").getPressureSensorData(onGetSuccessPRCB, onerrorPRCB);
	}
	
	function startPressure2(){
		var pressureSensor = webapis.sensorservice.getDefaultSensor("PRESSURE");
		pressureSensor.start(onsuccessPRCB);
		
		setTimeout(function(){
			console.log("stop pressure sensor");
			pressureSensor.stop();
		}, 30000);
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