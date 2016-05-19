onmessage = function(e){
	startBattery();
}

function startBattery() {
	
	var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
	document.getElementById("battery").innerHTML = (battery.level * 100) + '%';
	saveBattery(battery.level * 100);
	
	var rate = 30000;
	var store = localStorage.getItem(KEY_RATE_BATTERY);
	if(store){
		rate = parseInt(store)*1000;
	}

	var interval = window.setInterval(function(){
		console.log("update battery info");
		var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
		document.getElementById("battery").innerHTML = (battery.level * 100) + '%';
		saveBattery(battery.level * 100);
	},rate);
	
	sessionStorage.setItem(KEY_INTERVAL_BATTERY, interval);
	
}

function stopBattery(){
	clearInterval(parseInt(sessionStorage.getItem(KEY_INTERVAL_BATTERY)));
	document.getElementById("battery").innerHTML = "OFF";
	
	sessionStorage.removeItem(KEY_INTERVAL_BATTERY);
}