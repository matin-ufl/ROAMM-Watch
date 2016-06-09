/**
 * sensorManager.js
 * 
 * Module responsible for configuring, starting, and stopping
 * physical sensors on the device.
 */

function startSensors(){
	console.log("Getting sensor configuration");

	// Get the config file
	$.getJSON(URL_GET_CONFIG, function(json){
		console.log("Got config");
		storeConfig(json);
		console.log(json);

		// Set each value to its own slot in localstorage to be retrieved later
		// localStorage is nonvolatile, therefore on failure to get latest config, sensors will use last stored value
		localStorage.setItem(KEY_WATCH_ID, json.watchID);
		localStorage.setItem(KEY_SAMPLING_RATE, json.export_rate);
		localStorage.setItem(KEY_RATE_ACCELEROMETER, json.accel_rate);
		localStorage.setItem(KEY_RATE_GYRO, json.gyro_rate);
		localStorage.setItem(KEY_RATE_HEART_RATE, json.heartrate_rate);
		localStorage.setItem(KEY_RATE_GPS, json.location_rate);
		localStorage.setItem(KEY_RATE_BATTERY, json.battery_rate);

		console.log("Starting sensors");

		// For each sensor, check if it is specified to be active and if so, start it.
		// Each start routine is defined in the respective sensor's js file

		// Start accelerometer
		if(json.accel_active === true){
			// UNUSED: previous builds requested config multiple times
			// Needed this check to see if the sensor was already running
			// Currently, if statement will always resolve
			// Same of all other sensors
			if(!sessionStorage.getItem(KEY_INTERVAL_ACCELEROMETER)){
				startAccel();
			}
		}
		else{
			stopAccel();
		}

		// Start gyroscope
		if(json.gyro_active === true){
			if(!sessionStorage.getItem(KEY_INTERVAL_GYRO)){
				startGyro();
			}
		}
		else{
			stopGyro();
		}

		// Start heartrate monitor
		if(json.heartrate_active === true){
			if(!sessionStorage.getItem(KEY_INTERVAL_HEART_RATE)){
				startHeartrate();
			}
		}
		else{
			stopHeartrate();
		}

		// Start GPS
		if(json.location_active === true){
			if(!sessionStorage.getItem(KEY_INTERVAL_GPS)){
				startGPS();
			}
		}
		else{
			stopGPS();
		}
		
		// Start pressure
		if(json.pressure_active === true) {
			if(!sessionStorage.getItem(KEY_INTERVAL_PRESSURE)) {
				startPressure();
			}
		} else {
			stopPressure();
		}

		// Start battery monitoring
		if(json.battery_active === true){
			if(!sessionStorage.getItem(KEY_INTERVAL_BATTERY)){
				startBattery();
			}
		}
		else{
			stopBattery();
		}


		// Calls sensorManager to start storing data items to permanent storage
		if(RAW_MODE){
			startLocalStorageInterval();
		}

	});
}

function startSensors_locally() {
	console.log("[Matin] Using local configuration file.");
	localStorage.setItem(KEY_WATCH_ID, WATCH_ID);
	localStorage.setItem(KEY_SAMPLING_RATE, SAMPLING_RATE);
	localStorage.setItem(KEY_RATE_ACCELEROMETER, ACCELEROMETER_RATE);
	localStorage.setItem(KEY_RATE_GYRO, GYRO_RATE);
	localStorage.setItem(KEY_RATE_HEART_RATE, HEART_RATE_RATE);
	localStorage.setItem(KEY_RATE_GPS, GPS_RATE);
	localStorage.setItem(KEY_RATE_BATTERY, BATTERY_RATE);

	// Start accelerometer
	if(DEFAULT_ACCELEROMETER === true){
		if(!sessionStorage.getItem(KEY_INTERVAL_ACCELEROMETER)){
			startAccel();
		}
	}
	else{
		stopAccel();
	}

	// Start gyroscope
	if(DEFAULT_GYRO === true){
		if(!sessionStorage.getItem(KEY_INTERVAL_GYRO)){
			startGyro();
		}
	}
	else{
		stopGyro();
	}

	// Start heartrate monitor
	if(DEFAULT_HEART_RATE === true){
		if(!sessionStorage.getItem(KEY_INTERVAL_HEART_RATE)){
			startHeartrate();
		}
	}
	else{
		stopHeartrate();
	}

	// Start GPS
	if(DEFAULT_GPS === true){
		if(!sessionStorage.getItem(KEY_INTERVAL_GPS)){
			startGPS();
		}
	}
	else{
		stopGPS();
	}
	
	// Start pressure
	if(DEFAULT_PRESSURE === true) {
		if(!sessionStorage.getItem(KEY_INTERVAL_PRESSURE)) {
			startPressure();
		}
	} else {
		stopPressure();
	}

	// Start battery monitoring
	if(DEFAULT_BATTERY === true){
		if(!sessionStorage.getItem(KEY_INTERVAL_BATTERY)){
			startBattery();
		}
	}
	else{
		stopBattery();
	}

	// Calls sensorManager to start storing data items to permanent storage
	startLocalStorageInterval();
}