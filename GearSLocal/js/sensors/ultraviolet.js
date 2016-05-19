function startUV() {
	
	var ultravioletSensor = webapis.sensorservice.getDefaultSensor("ULTRAVIOLET");
	
	var rate = 60000;
	var store = localStorage.getItem(KEY_RATE_UV);
	if(store){
		rate = parseInt(store)*1000;
	}
	
	function onGetSuccessUVCB(sensorData) {
		console.log("ultraviolet level : " + sensorData.ultravioletLevel);
		document.getElementById("uv").innerHTML = sensorData.ultravioletLevel;
		saveUV(sensorData.ultravioletLevel);
	} 

	function onerrorUVCB(error) {
		console.log("no UV data acquired");
		document.getElementById("uv").innerHTML = "N/A";
	} 

	function onsuccessUVCB() {
		console.log("start UV sensor");
		ultravioletSensor.getUltravioletSensorData(onGetSuccessUVCB, onerrorUVCB);
	}
	
	function startUV(){
		ultravioletSensor.start(onsuccessUVCB);
		
		setTimeout(function(){
			console.log("stop UV sensor");
			ultravioletSensor.stop();
		}, 30000);
	}
	
	var interval = window.setInterval(function(){
		startUV();
	}, rate);
	
	sessionStorage.setItem(KEY_INTERVAL_UV, interval);
	
};

function stopUV(){
	clearInterval(parseInt(sessionStorage.getItem(KEY_INTERVAL_UV)));
	document.getElementById("uv").innerHTML = "OFF";
	
	sessionStorage.removeItem(KEY_INTERVAL_UV);
}