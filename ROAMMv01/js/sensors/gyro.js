function startGyro() {
	
	var tempa=0,tempb=0,tempc=0,count=0;
	
	var handleGyroData = function(alpha, beta, gamma){

		count++;
		
		// running averages of gyroscope values
		tempa = ((tempa*(count-1)) + alpha)/count;
		tempb = ((tempb*(count-1)) + beta)/count;
		tempc = ((tempc*(count-1)) + gamma)/count;
		
	};
	
	window.addEventListener('devicemotion', function(e){
		handleGyroData(
				e.rotationRate.alpha,		
				e.rotationRate.beta,
				e.rotationRate.gamma

		);
	});
	
	var rate = 1000;
	var store = localStorage.getItem(KEY_RATE_GYRO);
	if(store){
		rate = parseInt(store);
	}
	
	var interval = window.setInterval(function(){
		document.getElementById("gyro").innerHTML = (tempa+"").substring(0,4) + "," + (tempb+"").substring(0,4) + "," + (tempc+"").substring(0,4);
		
		saveGyro([tempa, tempb, tempc]);
		
		tempa = 0;
		tempb = 0;
		tempc = 0;
		count = 0;
	}, rate);
	
	sessionStorage.setItem(KEY_INTERVAL_GYRO, interval);
}

function stopGyro(){
	clearInterval(parseInt(sessionStorage.getItem(KEY_INTERVAL_GYRO)));
	document.getElementById("gyro").innerHTML = "OFF";
	
	sessionStorage.removeItem(KEY_INTERVAL_GYRO);
}

